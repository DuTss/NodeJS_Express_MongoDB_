const express = require('express');
const { getPosts, getPost, setPosts, putPost, deletePost } = require('../controllers/post.controller')
const router = express.Router();
const upload = require('../middleware/upload')

// GET, POST, PUT, DELETE // CRUD
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/",upload.single('image'), setPosts);
router.put("/:id",putPost);
router.delete("/:id",deletePost);

module.exports = router;