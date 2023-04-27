const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        lieu: {
            type: String,
            required: true,
        },
        prix: {
            type: Number,
            required: true,
        },
        // image: {
        //     type: String, // champ pour stocker l'URL de l'image
        // },
        flag: {
            type: Boolean,
        },
        ajouter_par:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('postSchema', postSchema)