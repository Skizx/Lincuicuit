const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const {checkAuth, firstAuth} = require('./middleware/auth')
require('dotenv').config({path: './config/.env'})


app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Je connecte mon API à ma base de données
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//+++++++++++++ CORS +++++++++++++++++++
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
  });

//+++++++++++++ MIDDLEWARE ++++++++++++++
// Sécurisation Routes jwt
app.get('*', checkAuth);
app.get('/jwtid', firstAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

/** création d'un middleware pour indiquer à Express qu'il faut gérer la ressource images de manière statique 
(un sous-répertoire de notre répertoire de base, __dirname:nom du dossier ) à chaque fois qu'elle reçoit une requête vers la route /images ***/
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;