const userModels = require('../models/user-model');
const ObjetID = require('mongoose').Types.ObjectId;

// Affichage de tout les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    // Récupération de tout les utilisateurs dans la base de données mongoDB (userModels) avec la méthode find et select sauf le password
    const users = await userModels.find().select('-password');
    res.status(200).json(users)
}

// Affichage d'un seul utilisateur
module.exports.getOneUser = async (req,res) => {
    // Utilisation d'ObjetID pour servant a vérifier si l'id utilisateur est existant dans  la base de données
    if(!ObjetID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    // Utilisation de la méthode findById pour recupérer l'id de l'objet en la comparant à l'id du parametre de requête
    userModels.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID inconnu: ' + err)
    }).select('-password')
}

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
            (err, docs) => {
                if(!err) return res.send(docs);
                if(err) return res.status(500).json({ message: err})
            }
        )
    } catch(err) {
        return res.status(500).json({ message: err})
    }
}