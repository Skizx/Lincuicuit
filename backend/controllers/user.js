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
    // Utilisation de la méthode findById pour recupérer l'id de l'objet en la comparant à l'id du parametre de requête
    if(!ObjetID.isValid(req.params.id))
    return res.status(400).send('ID Inconnu : ' + req.params.id)

    userModels.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID inconnu: ' + err)
    }).select('-password')
}