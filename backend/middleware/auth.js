// ++++++++++++++ MIDDLEWARE DE PROTECTION, VERIFICATION, D'AUTH +++++++++++++++++

// Importation de jsonwebtoken
const jwt = require('jsonwebtoken')
const userModels = require('../models/user-model')

// Middleware de vérification d'authentification
module.exports.checkAuth = (req, res, next) => {
    // Récupération du token dans cookies jwt
    const token = req.cookies.jwt;
    // Vérification du token avec la méthode verify prenant en compte le token recupérer dans cookie + clé secrete
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async( err, decodedToken ) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { timerToken : 1}, { sameSite : 'none', secure: true})
                next()
                // SI OK 
            } else {
                let user = await userModels.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next()
    }
}

// Middleware de contrôle authentification premiere fois
module.exports.firstAuth = (req, res, next) => {
    // Récupération du token dans cookies jwt
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async( err, decodedToken ) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id)
                next();
            }
        })
    } else {
        console.log('Aucun Token')
    }
}