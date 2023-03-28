const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const privateKey = 'private.key';

// Méthode GET
module.exports.getUsers = async (req, res) => {
    const users = await UserModel.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(users);
}

// Méthode GET
module.exports.getUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(user);
}

// Méthode user
module.exports.setUser = async (req, res) => {
    if (!req.body.pseudo & !req.body.lieu & req.body.mdp) {
        res.status(400).json({message: "Remplir tous les champs obligatoire"})
    }

    const user = await UserModel.create({
        pseudo: req.body.pseudo,
        lieu: req.body.lieu,
        mdp: req.body.mdp,
    })

    const token = jwt.sign({ user }, privateKey,{ expiresIn : '20s' });
    res.status(200).json({user, token});
}

// Méthode PUT
module.exports.putUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
        res.status(404).json({message: "Ce utilisateur n'existe pas !"})
    }

    const updateuser = await UserModel.findByIdAndUpdate(user, req.body, {
        new : true
    })

    jwt.sign({ updatedUser }, privateKey, { expiresIn: '20s' }, (err, token) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message: "Erreur lors de la création du token"});
        }
        console.log(token);
        return res.json({ token });
    });
    res.status(200).json({updateuser})
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