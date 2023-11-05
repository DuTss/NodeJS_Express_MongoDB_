const PostModel = require('../models/post.model');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const { log } = require('console');
const path = require('path');
//const Upload = require('../middleware/upload');

/**
 * Méthode GET pour récupérer tous les posts
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 */
module.exports.getPosts = async (req, res) => {
    try {
        // Rechercher tous les posts
        const post = await PostModel.find();
        // Définir l'en-tête Access-Control-Allow-Origin pour autoriser le partage de ressources entre origines
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Envoyer les posts en tant que réponse JSON avec un code d'état 200
        res.status(200).json(post);
    } catch (error) {
        // Journaliser l'erreur dans la console
        console.error(error);
        // Envoyer un message d'erreur en tant que réponse JSON avec un code d'état 500
        res.status(500).json({message: "Une erreur est survenue lors de la récupération des annonces"})
    }
}

// Méthode GET pour récupérer un post par ID
module.exports.getPost = async (req, res) => {
    // Trouver le post par ID à partir des paramètres de la requête
    const post = await PostModel.findById(req.params.id);

    // Définir l'en-tête pour permettre le partage de ressources entre domaines
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Envoyer le post en tant que réponse JSON avec un code d'état 200
    res.status(200).json(post);
}

/**
 * Définit un nouveau post dans la base de données.
 * @param {Object} req - L'objet de la requête.
 * @param {Object} res - L'objet de la réponse.
 */
module.exports.setPosts = async (req, res) => {
  try {

    const form = new formidable.IncomingForm({
      uploadDir: `./back/public/uploads`,
      keepExtensions: true,
      hashAlgorithm: false,
      filename: (name, ext, path, form) => {
        const title = form.fields.titre.toString();
        return `${title}${ext}`;
      }
    });
    // Analyser la requête
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Une erreur s'est produite lors de la création de l'annonce"
        });
      }



      // Récupérer les trois derniers caractères du nom de l'image pour obtenir l'extension
      const imageExtension = files.image[0].newFilename.slice(-3);

      // Créer un nouvel objet post
      const post = new PostModel({
        titre: fields.titre.toString(),
        description: fields.description.toString(),
        lieu: fields.lieu.toString(),
        prix: Number(fields.prix),
        flag: fields.flag,
        ajouter_par: fields.ajouter_par.toString(),
        image: `${fields.titre.toString()}.${imageExtension}`
      });

      // Enregistrer le post dans la base de données
      post.save((err, postSaved) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Une erreur s'est produite lors de la création de l'annonce"
          });
        }
        return res.status(200).json({ post: postSaved });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Une erreur s'est produite lors de la création de l'annonce"
    });
  }
};

// Méthode PUT
module.exports.putPost = async (req, res) => {
    try {
      // Trouver le post par son ID
      const post = await PostModel.findById(req.params.id);

      // Vérifier si le post existe
      if (!post) {
        return res.status(404).json({ message: "Ce poste n'existe pas !" });
      }

      // Mettre à jour le post et renvoyer le post mis à jour
      const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
        new: true,
      });
      return res.status(200).json({ updatePost });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur");
    }
  };

// Méthode DELETE
module.exports.deletePost = async (req, res) => {
    // Trouver le post à supprimer.
    const post = await PostModel.findById(req.params.id);

    // Vérifier si le post existe.
    if (!post) {
      return res.status(404).json({ message: "Ce poste n'existe pas !" });
    }

    // Supprimer le post.
    await post.deleteOne();

    // Renvoyer une réponse HTTP de réussite.
    return res.status(200).json(`Le message ${req.params.id} a bien été supprimé`);
  };