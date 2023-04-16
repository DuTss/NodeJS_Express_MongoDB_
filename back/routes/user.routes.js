const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

// Routes pour l'authentification
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// GET, POST, PUT, DELETE // CRUD
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.postUser);
router.put("/:id", auth, UserController.putUser);
router.delete("/:id", auth, UserController.deleteUser);
router.post('/:id/favoris', UserController.addFavoris);

module.exports = router;