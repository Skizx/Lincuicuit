// Importation d'express + routeur
const express = require('express');
const router = express.Router();

// Importation des middlewares controller post
const postController = require('../controllers/post-controller');

// Création des routes Likes/Dislikes
router.patch('/like/:id', postController.userLiked);
router.patch('/dislike/:id', postController.userDisliked);

// Création des routes commentaires/modification/suppréssion
router.patch('/comment/:id', postController.userComment);
router.patch('/edit-comment/:id', postController.userEditComment);
router.patch('/delete-comment/:id', postController.deleteComment);

// Création des routes affichages/modification/suppréssion post
router.get('/', postController.getPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Exportation des differentes routes
module.exports = router