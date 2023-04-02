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
        AuthTokens: [{
            AuthToken: {
                type: String,
                required: true,
            }
        }]
    },
    {
        timestamps: true
    }
)

UserSchema.methods.generateAuthTokenAndSaveUser = async function () {
    const authToken = await jwt.sign({_id:this.id.toString()}, 'foo')
    this.AuthTokens.push({authToken})
    await this.save()
    return authToken
}

const User = mongoose.model('UserSchema', UserSchema)

module.exports = User;