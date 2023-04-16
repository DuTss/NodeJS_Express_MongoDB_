const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const privateKey = 'private.key';
const bcrypt = require('bcryptjs');

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

// Méthode POST REGISTER
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

// Méthode PUT
module.exports.putUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      res.status(404).json({message: "Ce utilisateur n'existe pas !"})
    }

    // Utilisation du middleware d'authentification
    auth(req, res, async () => {
      const updateuser = await UserModel.findByIdAndUpdate(user, req.body, {
        new : true
      });

      jwt.sign({ updatedUser }, privateKey, { expiresIn: '300s' }, (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({message: "Erreur lors de la création du token"});
        }
        console.log("TOKEN MODIFICATION",token);
        return res.json({ token });
      });
      res.status(200).json({updateuser})
    });
}

// Méthode DELETE
module.exports.deleteUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
        res.status(404).json({message: "Ce usere n'existe pas !"})
    }

    await user.deleteOne();
    res.status(200).json("Le message " + req.params.id + " a bien été supprimé")
}

module.exports.addFavoris = async (req, res) => {
  try {
    const utilisateur = await UserModel.findById(req.params.id);
    const annonceId = req.body.annonceId;
    console.log(annonceId); // identifiant de l'annonce à ajouter en favoris
    const isAlreadyFavorited = await UserModel.findOne({ _id: utilisateur._id, favoris: annonceId }).exec();

    if (isAlreadyFavorited) {
      res.status(409).json({ message: "Annonce déjà en favoris" });
    } else {
      utilisateur.favoris.push(annonceId);
      await utilisateur.save();
      res.status(200).json(utilisateur);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.removeFavoris = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
console.log("UPDATE => ",user);
    const annonceId = req.body.annonceId;
    console.log("ANONCE ID ==> ",annonceId);
    const id = req.body.id;
    console.log("ID ==> ",id);

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