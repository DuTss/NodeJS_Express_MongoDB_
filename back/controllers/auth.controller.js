const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const privateKey = 'private.key';

async function register(req, res) {
  try {
    const { pseudo,lieu, mdp } = req.body;

    // Vérifie si l'utilisateur existe déjà dans la base de données
    const userExists = await UserModel.findOne({ pseudo });
    if (userExists) {
      return res.status(400).json({ message: 'Ce pseudo est déjà utilisé !' });
    }

    // Crée un nouveau modèle d'utilisateur avec les informations envoyées par l'utilisateur
    const user = new UserModel({ pseudo,lieu,  mdp });

    // Crypte le mot de passe avant de l'enregistrer
    const salt = await bcrypt.genSalt(10);
    user.mdp = await bcrypt.hash(mdp, salt);

    // Enregistre le nouvel utilisateur dans la base de données
    const savedUser = await user.save();

    // Crée un jeton JWT qui expire dans 1 heure
    const token = jwt.sign({ id: savedUser._id }, privateKey, { expiresIn: '3600s' });

    // Renvoie le jeton d'authentification et l'utilisateur nouvellement créé
    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du compte !' });
  }
}

async function login(req, res) {
  try {
    const { pseudo,mdp } = req.body;

    // Vérifie si l'utilisateur existe dans la base de données
    const user = await UserModel.findOne({ pseudo });
    if (!user) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect !' });
    }

    // Vérifie si le mot de passe est correct
    const validmdp = await bcrypt.compare(mdp, user.mdp);
    if (!validmdp) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect !' });
    }

    // Crée un jeton JWT qui expire dans 1 heure
    const token = jwt.sign({ id: user._id }, privateKey, { expiresIn: '1h' });

// Renvoie le jeton d'authentification et le message de confirmation
res.status(200).json({ token, user, message: 'Vous êtes bien connecté !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion !' });
  }
}

module.exports = { register, login };
