const postModels = require('../models/post-models');
const userModels = require('../models/user-model');
const ObjectID = require('mongoose').Types.ObjectId;

// Affichage du post
module.exports.getPost = (req, res) => {
    // Utilisation de la méthode find permettant de chercher le post dans notre base de données
    // Si Aucune erreur retourne les datas
    postModels.find((err, docs) => {
        if (!err) {
         res.send(docs); 
        }  else {
            console.log(" Error " + err)
        }
        
    })
}

// Création d'un post
module.exports.createPost = async (req, res) => {
    // Récupération du corps de la requête selon le critère dans la base de données
    const newPost = new postModels({
        postUserId: req.body.postUserId,
        message: req.body.message,
        video: req.body.video,
        usersLiked: [],
        comments: [],
    })
    try {
        const post = await newPost.save();
        return res.status(201).json(post)
    } catch (err) {
        return res.status(401).send(err)
    }
}

module.exports.updatePost = (req, res) => {
    // Utilisation d'ObjetID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id);

    // Récupération du corps de la requête message
    const modificationPost = {
        message: req.body.message
    }

    // Utilisation de la méthode findByIdAndUpdate permettant de recupérer l'id et mettre à jour le message
    postModels.findByIdAndUpdate(
        req.params.id,
        { $set: modificationPost },
        { new: true },
        (err, docs) => {
            if (!err) {
                return res.send(docs)
            } else {
                console.log("Modification impossible :" + err)
            }
        }
    )
}

module.exports.deletePost = (req, res) => {
    // Utilisation d'ObjetID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id);

    postModels.findByIdAndDelete(
        req.params.id,
        (err,docs) => {
            if (!err) {
                return res.send(docs);
            } else {
                console.log("Suppréssion impossible:" + err)
            }
        }
    )
}

module.exports.userLiked = (req, res) => {
    // Utilisation d'ObjectID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        // Ajout a la liste des followers
     userModels.findByIdAndUpdate(
            req.params.id,
            // Ajout a la liste des users aillant aimer avec addToSet en récupérant l'id de l'utilisateur
            {$addToSet: { usersLiked: req.body.id }},
            {new: true, upsert: true},
            // Callback err ou data
            (err,docs) => {
                if(!err) return res.status(201).json(docs);
                else return res.status(400).jsos(err)
            }
        );
        // Ajout a la liste following
        userModels.findByIdAndUpdate(
            req.body.id,
            // Ajout à la liste des likes avec addToSet en récupérant l'id du message liké
            {$addToSet: { likes: req.params.id }},
            {new: true, upsert: true},
            // Callback err ou data
            (err,docs) => {
                //if(!err) return res.status(201).json(docs);
                if (err) res.status(400).json(err)
            }
        ); 
    } catch(err) {
        return res.status(500).json({ message: err})
    }
}

module.exports.userDisliked = async (req, res) => {
    
}