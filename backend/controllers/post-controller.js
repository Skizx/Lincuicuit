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

module.exports.createPost = (req, res) => {

}

module.exports.updatePost = (req, res) => {

}

module.exports.deletePost = (req, res) => {

}