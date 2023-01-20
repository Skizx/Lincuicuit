// Importation d'express + routeur
const express = require('express');
const router = express.Router();

// Importation des middlewares controller post
const postController = require('../controllers/post-controller');

// Création des routes affichages/modification/suppréssion post
router.get('/', postController.getPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Exportation des differentes routes
module.exports = router