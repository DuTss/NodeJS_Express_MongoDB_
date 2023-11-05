const express = require('express');
const { getPosts, getPost, setPosts, putPost, deletePost } = require('../controllers/post.controller')
const router = express.Router();

// GET, POST, PUT, DELETE // CRUD
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", setPosts);
router.put("/:id",putPost);
router.delete("/:id",deletePost);

module.exports = router;