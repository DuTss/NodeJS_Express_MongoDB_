const PostModel = require('../models/post.model');

module.exports.setPosts = async (req, res) => {
    res.json({message : "Base de données connecté !"})
}