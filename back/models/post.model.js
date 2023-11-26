const mongoose = require('mongoose');

// Définir le schéma pour une annonce
const postSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: true, // Le titre de l'annonce est requis
        },
        description: {
            type: String,
            required: true, // La description de l'annonce est requise
        },
        lieu: {
            type: String,
            required: true, // Le lieu de l'annonce est requis
        },
        prix: {
            type: Number,
            required: true, // Le prix de l'annonce est requis
        },
        images: [{ type: String }],
        flag: {
            type: Boolean, // Si l'annonce est signalée ou non
        },
        ajouter_par:{
            type: String, // Le nom d'utilisateur de l'utilisateur qui a ajouté l'annonce
        }
    },
    {
        timestamps: true // Ajoute automatiquement les champs createdAt et updatedAt
    }
)

// Exporter le schéma de l'annonce en tant que modèle mongoose
module.exports = mongoose.model('postSchema', postSchema)
