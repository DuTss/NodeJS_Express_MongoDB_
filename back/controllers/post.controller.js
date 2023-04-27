const PostModel = require('../models/post.model');
// const multer = require('multer');

// // Configuration de Multer pour stocker les fichiers dans le dossier "uploads"
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//       cb(null, Date.now() + '-' + file.originalname)
//     }
//   })
//   const upload = multer({ storage: storage })

// Méthode GET
module.exports.getPosts = async (req, res) => {
    try {
        const post = await PostModel.find();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Une erreur est survenue lors de la récupération des annonces"})
    }
}

// Méthode GET
module.exports.getPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(post);
}

// Méthode POST
module.exports.setPosts = async (req, res) => {
    try {
        if (!req.body.titre && !req.body.description && !req.body.lieu && !req.body.prix) {
            return res.status(400).json({message: "Remplir tous les champs obligatoires"})
        }
        const post = await PostModel.create({
            titre: req.body.titre,
            description: req.body.description,
            lieu: req.body.lieu,
            prix: req.body.prix,
            flag: req.body.flag,
            ajouter_par: req.body.ajouter_par
        })

        return res.status(200).json({post})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Une erreur est survenue lors de la création de l'annonce"})
    }
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