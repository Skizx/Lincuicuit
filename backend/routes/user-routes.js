// Importation d'Express
const express = require('express');
const authController = require('../controllers/auth-controller');
const user = require('../controllers/user')

// Création du router
const router = express.Router();

// Création des routes authentification
router.post("/register", authController.signUp);

// Création des routes affichages utilisateurs
router.get("/", user.getAllUsers)
router.get("/:id" , user.getOneUser)

module.exports = router;