// Importation d'Express
const express = require('express');
const authController = require('../controllers/auth-controller');

// Création du router
const router = express.Router();

// Création des routes
router.post("/register", authController.signUp)

module.exports = router;