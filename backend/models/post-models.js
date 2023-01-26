// Importation de mongoose
const mongoose = require('mongoose');


// Création d'un schéma d'un modèle de Post utilisateur
const postSchema = new mongoose.Schema(
    {
        postUserId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            trim: true,
            maxlength: 300
        },
        picture: {
            type: String
        },
        video: {
            type: String
        },
        usersLiked: {
            type: [String]
        },
        comments: {
            type: [
                {
                    commentUserId: String,
                    commentPseudo: String,
                    text: String,
                    timestamp: Number
                }
            ],
        },

    },
    {
        timestamps: true
    }
)

// Exportation du schéma post 
const postModels = mongoose.model("post", postSchema);
module.exports = postModels;