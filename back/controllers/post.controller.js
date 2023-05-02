const PostModel = require('../models/post.model');
const Upload = require('../middleware/upload');

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

// Méthode POST
module.exports.setPosts = async (req, res) => {
    try {
            const post = new PostModel({
                titre: req.body.titre,
                description: req.body.description,
                lieu: req.body.lieu,
                prix: req.body.prix,
                flag: req.body.flag,
                ajouter_par: req.body.ajouter_par,
                image: req.file.path // Chemin du fichier uploadé
            });
        post.save((err, postSaved) => { // Enregistre la nouvelle annonce dans la base de données
            if (err) { // Si une erreur survient
                console.error(err); // Affiche l'erreur dans la console
                return res.status(500).json({ message: "Une erreur est survenue lors de la création de l'annonce" }); // Retourne une réponse avec un message d'erreur
            }
            return res.status(200).json({ post: postSaved }); // Retourne une réponse avec les données de la nouvelle annonce
        });
    } catch (error) { // Si une erreur survient
        console.error(error) // Affiche l'erreur dans la console
        return res.status(500).json({ message: "Une erreur est survenue lors de la création de l'annonce" }) // Retourne une réponse avec un message d'erreur
    }
}

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