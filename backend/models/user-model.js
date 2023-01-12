// Importation Mongoose, Unique validator
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt'); 


// Création d'un schéma d'un modèle de base de données pour les informations utilisateurs
const userSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 33,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        max: 900,
        minLength: 5,
    },
    bio: {
        type: String,
        max: 900,
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    likes: {
        type: [String]
    }
},
{
    timestamps: true,
}
)

// Application du validator au schéma
userSchema.plugin(uniqueValidator);

// Application du cryptage du mot de passe avant inscription
userSchema.pre("save", async function(next) {
    // Utilisation de genSalt permettant de generer une serie de caractère par bcrypt pour le salage de mot de passe
    const salt = await bcrypt.genSalt();
    // Utilisation de la méthode hash de bcrypt qui crée un hash crypté des mots de passe
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Exportation du schéma User
const userModels = mongoose.model('user', userSchema);
module.exports = userModels;

