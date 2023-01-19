// Importation du model User
const userModels = require('../models/user-model')
const jwt = require('jsonwebtoken')

const timerToken = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: timerToken
  })
};

// Création du middleware signUp pour l'enregistrement de l'utilisateur
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;

    try {
        const user = await userModels.create({pseudo, email, password});
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        res.status(401).send({ err })
    }

}

// Création middleware Login permettant a un utilisateur déjà enregistré dans la base de données de se connecter
module.exports.login = async (req, res) => {    
    const { email, password } = req.body

  try {
    const user = await userModels.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, timerToken});
    res.status(200).json({ user: user._id})
  } catch (err){
    res.status(401).json({ err });
  }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { timerToken: 1 });
    res.redirect('/');
}