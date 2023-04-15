const CommentaireModel = require('../models/commentaire.model');

// Méthode GET
module.exports.getCommentaires = async (req, res) => {
    const commentaire = await CommentaireModel.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(commentaire);
}

// Méthode GET
module.exports.getCommentaire = async (req, res) => {
    const commentaire = await CommentaireModel.findById(req.params.id);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(commentaire);
}

// Méthode commentaire
module.exports.setCommentaire = async (req, res) => {
    if (!req.body.annonceId & !req.body.utilisateurId & req.body.texte & req.body.pseudo) {
        res.status(400).json({message: "Remplir tous les champs obligatoire"})
    }

    const commentaire = await CommentaireModel.create({
        annonceId: req.body.annonceId,
        utilisateurId: req.body.utilisateurId,
        texte: req.body.texte,
        pseudo: req.body.pseudo,
    })

    res.status(200).json({commentaire})
}

// Méthode PUT
module.exports.putCommentaire = async (req, res) => {
    const commentaire = await CommentaireModel.findById(req.params.id);

    if (!commentaire) {
        res.status(404).json({message: "Ce commentairee n'existe pas !"})
    }

    const updateCommentaire = await CommentaireModel.findByIdAndUpdate(commentaire, req.body, {
        new : true
    })
    res.status(200).json({updateCommentaire})
}

// Méthode DELETE
module.exports.deleteCommentaire = async (req, res) => {
    const commentaire = await CommentaireModel.findById(req.params.id);

    if (!commentaire) {
        res.status(404).json({message: "Ce commentairee n'existe pas !"})
    }

    await commentaire.deleteOne();
    res.status(200).json("Le message " + req.params.id + " a bien été supprimé")
}