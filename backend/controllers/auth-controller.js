// Importation du model User
const userModels = require('../models/user-model')

// Création du middleware signUp pour l'enregistrement de l'utilisateur
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;

    try {
        const user = await userModels.create({pseudo, email, password});
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        res.status(200).send({ err })
    }

}