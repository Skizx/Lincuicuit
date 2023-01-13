// Importation d'Express
const express = require('express');
const authController = require('../controllers/auth-controller');
const user = require('../controllers/user')

// Création du router
const router = express.Router();

// Création des routes authentification
// Inscription d'un nouvel utilisateur
router.post("/register", authController.signUp);
// Connexion d'un utilisateur déjà existant
router.post('/login', authController.login)



// Création des routes affichages/modification/suppréssion utilisateurs
router.get("/", user.getAllUsers)
router.get('/:id', user.getOneUser)
router.put('/:id', user.updateUser)
router.delete('/:id', user.deleteUser)

// Création des routes followers/following
router.patch('/follow/:id', user.followUser)
router.patch('/unfollow/:id', user.unfollowUser)

module.exports = router;