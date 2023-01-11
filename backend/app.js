const express = require('express');
const app = express()

//+++++++++++++ CORS +++++++++++++++++++
app.use((req, res, next) => {
    // L'origine pouvant acceder à l'API sera "*" Tout le monde
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Je donne l'autorisation d'utiliser certain en-tête
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Ainsi que sur certaine méthode "Verbe de requête"
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

module.exports = app;