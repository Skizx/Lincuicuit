const express = require('express');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user-routes');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config({path: './config/.env'})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Je connecte mon API à ma base de données
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

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

//+++++++++++++ MIDDLEWARE ++++++++++++++

// routes
app.use('/api/user', userRoutes)

module.exports = app;