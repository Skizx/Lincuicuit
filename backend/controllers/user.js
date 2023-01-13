const userModels = require('../models/user-model');
const ObjetID = require('mongoose').Types.ObjectId;

// Affichage de tout les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    // Récupération de tout les utilisateurs dans la base de données mongoDB (userModels) avec la méthode find et select sauf le password
    const users = await userModels.find().select('-password');
    res.status(200).json(users)
};

// Affichage d'un seul utilisateur
module.exports.getOneUser = async (req,res) => {
    // Utilisation d'ObjetID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjetID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    // Utilisation de la méthode findById pour recupérer l'id de l'objet en la comparant à l'id du parametre de requête
    // Callback err ou data
    userModels.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID inconnu: ' + err)
    }).select('-password')
};

module.exports.updateUser = async (req, res) => {
    // Utilisation d'ObjetID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjetID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    // Utilisation de la méthode findByIdAndUpdate permettant de recupérer l'id et mettre à jour la bio
    try {
        userModels.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true},
            // Callback err ou data
            (err, docs) => {
                if(!err) return res.send(docs);
                if(err) return res.status(500).json({ message: err})
            }
        )
    } catch(err) {
        return res.status(500).json({ message: err})
    }
};

module.exports.deleteUser = async (req, res) => {
    // Utilisation d'ObjetID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjetID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        await userModels.deleteOne( {_id: req.params.id}).exec();
        res.status(200).json({ message: "Utilisateur supprimer."})
    } catch(err) {
        return res.status(500).json({ message: err})
    }
}

module.exports.followUser = async (req, res) => {
    // Utilisation d'ObjetID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    // +
    // Vérification que l'idToFollow est existante dans la base de données
    if(!ObjetID.isValid(req.params.id) || !ObjetID.isValid(req.body.idToFollow) )
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        // Ajout a la liste des followers
         userModels.findByIdAndUpdate(
            req.params.id,
            // Ajout a la liste des followers avec addToSet en récupérant l'id de la personne à suivre
            {$addToSet: { following: req.body.idToFollow }},
            {new: true, upsert: true},
            // Callback err ou data
            (err,docs) => {
                if(!err) return res.status(201).json(docs);
                else return res.status(400).jsos(err)
            }
        );
        // Ajout a la liste following
        userModels.findByIdAndUpdate(
            req.body.idToFollow,
            // Ajout à la liste des following avec addToSet en récupérant l'id de la personne suivie
            {$addToSet: { followers: req.params.id }},
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

module.exports.unfollowUser = async (req, res) => {
    // Utilisation d'ObjetID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    // +
    // Vérification que l'idToFollow est existante dans la base de données
    if(!ObjetID.isValid(req.params.id) || !ObjetID.isValid(req.body.idToUnfollow) )
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    try {
        // Ajout a la liste des followers
         userModels.findByIdAndUpdate(
            req.params.id,
            // Retrait de la liste des followers avec Pull en récupérant l'id de la personne à suivre
            {$pull: { following: req.body.idToUnfollow }},
            {new: true, upsert: true},
            // Callback err ou data
            (err,docs) => {
                if(!err) return res.status(201).json(docs);
                else return res.status(400).jsos(err)
            }
        );
        // Ajout a la liste following
        userModels.findByIdAndUpdate(
            req.body.idToUnfollow,
            // Retrait de la liste des following avec Pull en récupérant l'id de la personne suivie
            {$pull: { followers: req.params.id }},
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