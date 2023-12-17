const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const privateKey = 'private.key';
const bcrypt = require('bcryptjs');
const { login } = require('./auth.controller');
const auth = require('../middleware/auth');

// Méthode GET OK
module.exports.getUsers = async (req, res) => {
    const users = await UserModel.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(users);
}

// Méthode GET OK
module.exports.getUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(user);
}

// Méthode POST REGISTER - Cette fonction est utilisée pour enregistrer un utilisateur
// @param {Object} req - L'objet requête HTTP
// @param {Object} res - L'objet réponse HTTP
// @returns {Object} L'objet utilisateur et le jeton d'authentification au format JSON
module.exports.postUser = async (req, res) => {
  if (!req.body.pseudo & !req.body.lieu & !req.body.mdp) {
      res.status(400).json({message: "Remplir tous les champs obligatoire"})
  }
  const { pseudo, lieu, mdp } = req.body
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(mdp, salt);
  const user = await UserModel.create({
      pseudo,
      lieu,
      mdp: hashedPassword,
  })
  res.status(200).json({user, authToken});
}

/**
 * Méthode PUT - Met à jour un utilisateur par ID en utilisant une requête PUT
 * @return {Object} - L'objet utilisateur mis à jour et un jeton JWT
 */
module.exports.putUser = async (req, res) => {
  try {
    // Recherche de l'utilisateur par ID
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      // Renvoie une erreur 404 si l'utilisateur n'est pas trouvé
      return res.status(404).json({ message: "Ce utilisateur n'existe pas !" });
    }

    // Authentification de l'utilisateur en utilisant un middleware
    auth(req, res, async () => {
      // Met à jour l'utilisateur
      const updatedUser = await UserModel.findByIdAndUpdate(user, req.body, { new: true });

      return res.json({ user: updatedUser });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};


// Méthode DELETE - Supprime un utilisateur par son id
module.exports.deleteUser = async (req, res) => {
  // Trouve l'utilisateur par son id
  const user = await UserModel.findById(req.params.id);

  // Si l'utilisateur n'est pas trouvé, retourne une erreur 404 avec un message d'erreur
  if (!user) {
      res.status(404).json({message: "Cet utilisateur n'existe pas !"})
  }

  // Supprime l'utilisateur
  await user.deleteOne();

  // Retourne un message de succès
  res.status(200).json("Le message " + req.params.id + " a bien été supprimé")
}


/**
 * Ajoute un favori à un utilisateur
 * @returns {Object} L'objet utilisateur mis à jour
 */
module.exports.addFavoris = async (req, res) => {
  try {
    // Récupération de l'utilisateur correspondant à l'ID passé en paramètre de la requête
    const utilisateur = await UserModel.findById(req.params.id);

    // Récupération de l'ID de l'annonce à ajouter en favoris
    const annonceId = req.body.annonceId;
    console.log(annonceId); // identifiant de l'annonce à ajouter en favoris

    // Vérification si l'annonce est déjà en favoris pour l'utilisateur
    const isAlreadyFavorited = await UserModel.findOne({ _id: utilisateur._id, favoris: annonceId }).exec();

    // Si l'annonce est déjà en favoris, renvoyer une réponse avec code d'erreur 409
    if (isAlreadyFavorited) {
      res.status(409).json({ message: "Annonce déjà en favoris" });
    } else {
      // Ajout de l'annonce en favoris pour l'utilisateur
      utilisateur.favoris.push(annonceId);
      await utilisateur.save(); // Sauvegarde de l'objet utilisateur avec le nouveau tableau de favoris
      res.status(200).json(utilisateur); // Renvoyer une réponse avec code de succès 200 et l'objet utilisateur mis à jour
    }
  } catch (err) {
    res.status(500).json({ message: err.message }); // Renvoyer une réponse avec code d'erreur 500 et le message d'erreur
  }
}


// A FAIRE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// A FAIRE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// A FAIRE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
module.exports.removeFavoris = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const annonceId = req.body.annonceId;
    const id = req.body.id;

    const utilisateur = await UserModel.findByIdAndUpdate(
      id,
      { $pull: { favoris: annonceId } },
      { new: true }
    );

    console.log("USER => ", utilisateur);

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};