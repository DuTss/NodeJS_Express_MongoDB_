const PostModel = require('../models/post.model');

// Méthode GET
module.exports.getPosts = async (req, res) => {
    const post = await PostModel.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(post);
}

// Méthode GET
module.exports.getPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(post);
}

// Méthode POST
module.exports.setPosts = async (req, res) => {
    if (!req.body.titre & !req.body.description & req.body.lieu & req.body.prix) {
        res.status(400).json({message: "Remplir tous les champs obligatoire"})
    }

    const post = await PostModel.create({
        titre: req.body.titre,
        description: req.body.description,
        lieu: req.body.lieu,
        prix: req.body.prix,
    })

    res.status(200).json({post})
}

// Méthode PUT
module.exports.putPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
        res.status(404).json({message: "Ce poste n'existe pas !"})
    }

    const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
        new : true
    })
    res.status(200).json({updatePost})
}

// Méthode DELETE
module.exports.deletePost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
        res.status(404).json({message: "Ce poste n'existe pas !"})
    }

    await post.deleteOne();
    res.status(200).json("Le message " + req.params.id + " a bien été supprimé")
}