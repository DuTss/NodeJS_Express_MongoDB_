const CommentaireModel = require('../models/commentaire.model');

// Méthode GET
module.exports.getCommentaires = async (req, res) => {
    // Récupère tous les commentaires
    const commentaire = await CommentaireModel.find();
    // Définit l'en-tête Access-Control-Allow-Origin pour autoriser les requêtes cross-origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Retourne le tableau de commentaires sous forme de réponse JSON avec un code de statut 200
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
    // Vérifie si tous les champs requis sont présents dans le corps de la requête
    if (!req.body.annonceId || !req.body.utilisateurId || !req.body.texte || !req.body.pseudo) {
        res.status(400).json({message: "Remplir tous les champs obligatoire"})
    }

    // Crée un nouveau commentaire avec les données fournies
    const commentaire = await CommentaireModel.create({
        annonceId: req.body.annonceId,
        utilisateurId: req.body.utilisateurId,
        texte: req.body.texte,
        pseudo: req.body.pseudo,
    })

    // Retourne le commentaire nouvellement créé
    res.status(200).json({commentaire})
}

// Méthode PUT
module.exports.putCommentaire = async (req, res) => {
    // Trouve le commentaire par son identifiant
    const commentaire = await CommentaireModel.findById(req.params.id);

    // Si le commentaire n'existe pas, renvoie une erreur
    if (!commentaire) {
        res.status(404).json({message: "Ce commentaire n'existe pas !"})
    }

    // Met à jour le commentaire et le renvoie
    const updateCommentaire = await CommentaireModel.findByIdAndUpdate(commentaire, req.body, {
        new : true
    })
    res.status(200).json({updateCommentaire})
}

// Méthode DELETE
module.exports.deleteCommentaire = async (req, res) => {
    // Trouver le commentaire par ID
    const commentaire = await CommentaireModel.findById(req.params.id);

    // Si le commentaire n'est pas trouvé, retourner une erreur 404
    if (!commentaire) {
        res.status(404).json({message: "Ce commentaire n'existe pas !"})
    }

    // Supprimer le commentaire
    await commentaire.deleteOne();

    // Retourner un message de succès
    res.status(200).json("Le message " + req.params.id + " a bien été supprimé")
}