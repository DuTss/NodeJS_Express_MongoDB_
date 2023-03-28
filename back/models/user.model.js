const mongoose = require('mongoose');

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
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('UserSchema', UserSchema)