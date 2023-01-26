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
    .sort({ createdAt: -1 })
};

// Création d'un post
module.exports.createPost = async (req, res) => {

    let fileName = req.body.postUserId + Date.now() + 'jpg';
    // Récupération du corps de la requête selon le critère dans la base de données
    const newPost = new postModels({
        postUserId: req.body.postUserId,
        message: req.body.message,
        picture: req.file !== null ? "../images" + fileName: "",
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
};

// Mise à jour d'un post
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
};

// Suppréssion d'un post
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
};

// Likes
module.exports.userLiked = (req, res) => {
    // Utilisation d'ObjectID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        // Ajout a la liste des Likers
        postModels.findByIdAndUpdate(
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
        // Ajout a la liste messageLike
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

module.exports.userDisliked = (req, res) => {
    // Utilisation d'ObjectID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        // Ajout a la liste des Likers
     postModels.findByIdAndUpdate(
            req.params.id,
            // Retrait a la liste des users aillant aimer avec pull en récupérant l'id de l'utilisateur
            {$pull: { usersLiked: req.body.id }},
            {new: true, upsert: true},
            // Callback err ou data
            (err,docs) => {
                if(!err) return res.status(201).json(docs);
                else return res.status(400).jsos(err)
            }
        );
        // Ajout a la liste messageLike
        userModels.findByIdAndUpdate(
            req.body.id,
            // Retrait à la liste des likes avec pull en récupérant l'id du message liké
            {$pull: { likes: req.params.id }},
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
};

module.exports.userComment =  (req,res) => {
    // Utilisation d'ObjectID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        // Récupération de l'id en paramètre + utilisation de push pour ajouter un commentaire à la suite dans le tableau
        return postModels.findByIdAndUpdate(
            req.params.id,
            {$push: {
                comments: {
                    commentUserId: req.body.commentUserId,
                    commentPseudo: req.body.commentPseudo,
                    text: req.body.text,
                    timestamp: new Date().getTime(),
                },
            },
        },
        { new: true},
        // Callback err/docs
        (err,docs) => {
            if (!err) {
                return res.send(docs)
            } else {
                return res.status(400).send(err)
            }
        }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
};

module.exports.userEditComment =  (req,res) => {
    // Utilisation d'ObjectID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        // Récupération de l'id en paramètre + récupération de l'id du commentaire 
        return postModels.findById(
            req.params.id,
            (err, docs) => {
                const modifyComment = docs.comments.find((comment) => 
                    comment._id.equals(req.body.commentId)
                )
                if (!modifyComment) 
                    return res.status(404).send('Commentaire introuvable')
                    // Récupération du text envoyé pour être modifier
                    modifyComment.text = req.body.text;

                    // Sauvegarde du nouveau commentaire après modification
                    return docs.save((err) => {
                        if(!err) 
                        return res.status(200).send(docs);
                        return res.status(500).send(err);
                    }
                )
                
            }
        )
    } catch (err) {
       return res.status(400).send(err)
    }
}

module.exports.deleteComment =  (req,res) => {
    // Utilisation d'ObjectID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        // Récupération de l'id en paramètre + utilisation de pull pour supprimer un commentaire selon l'ID 
        return postModels.findByIdAndUpdate(
            req.params.id,
            {$pull: {
             comments: {
                _id: req.body.commentId
            }
        }
        },
        { new: true },
        // Callback err/docs
        (err, docs) => {
            if (!err) {
                return res.send(docs)
            } else {
                return res.status(400).send(err)
            }
        }
        )
    } catch (err) {
        return res.status(400).send(err)
    }
}
