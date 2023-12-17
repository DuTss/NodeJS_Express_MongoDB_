const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
        },
        lieu: {
            type: String,
            required: true,
        },
        mdp: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
        },
        image: {
            type: String, // L'URL de l'image associée à l'utilisateur
        },
        paiement: [{
            type: String,
        }],
        AuthTokens: [{
            AuthToken: {
                type: String,
                required: true,
            },
            _id: false  // Ne pas inclure l'_id dans le schéma
        }],
        favoris: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Annonce'
        }],
    },
    {
        timestamps: true
    }
)

/**
 * Génère un jeton d'authentification pour l'utilisateur, le sauvegarde dans la base de données et le renvoie.
 * @returns {string} Le jeton d'authentification généré.
 */
UserSchema.methods.generateAuthTokenAndSaveUser = async function () {
    // Génère un jeton d'authentification en utilisant l'id de l'utilisateur et une clé secrète.
    const authToken = await jwt.sign({_id:this.id.toString()}, 'foo')

    // Ajoute le jeton d'authentification généré à la liste des jetons d'authentification de l'utilisateur.
    this.AuthTokens.push({authToken})

    // Enregistre l'utilisateur avec le nouveau jeton d'authentification dans la base de données.
    await this.save()

    // Retourne le jeton d'authentification généré.
    return authToken
}

const User = mongoose.model('UserSchema', UserSchema)

module.exports = User;