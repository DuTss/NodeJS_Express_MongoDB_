const express = require('express');
const { getCommentaires, getCommentaire, setCommentaire, putCommentaire, deleteCommentaire } = require('../controllers/commentaire.controller')
const router = express.Router();

// GET, Commentaire, PUT, DELETE // CRUD
router.get("/", getCommentaires);
router.get("/:id", getCommentaire);
router.post("/", setCommentaire);
router.put("/:id",putCommentaire);
router.delete("/:id",deleteCommentaire);

module.exports = router;