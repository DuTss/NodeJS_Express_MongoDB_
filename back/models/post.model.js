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
        flag: {
            type: boolean,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('postSchema', postSchema)