const mongoose = require('mongoose');

const commentaireSchema = mongoose.Schema(
    {
        annonceId: {
            type: String,
            required: true,
        },
        utilisateurId: {
            type: String,
            required: true,
        },
        texte: {
            type: String,
            required: true,
        },
        pseudo: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('commentaireSchema', commentaireSchema)