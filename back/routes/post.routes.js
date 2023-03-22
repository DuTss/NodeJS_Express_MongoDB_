const express = require('express');
const { getPosts, setPosts, putPost, deletePost } = require('../controllers/post.controller')
const router = express.Router();

// GET, POST, PUT, DELETE
router.get("/", getPosts);
router.post("/", setPosts);
router.put("/:id",putPost);
router.delete("/:id",deletePost);

module.exports = router;