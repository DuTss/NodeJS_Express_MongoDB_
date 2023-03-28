const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

// GET, POST, PUT, DELETE // CRUD
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.setUser);
router.put("/:id", auth, UserController.putUser);
router.delete("/:id", auth, UserController.deleteUser);

module.exports = router;