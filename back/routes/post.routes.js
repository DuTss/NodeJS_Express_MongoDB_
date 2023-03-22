const express = require('express');
const { setPosts } = require('../controllers/post.controller')
const router = express.Router();

router.get("/",(req,res) => {
    res.json({message : "Voici les données :"});
});

router.post("/",(req,res) => {
    res.json({message: req.body.message});
});

router.put("/:id",(req,res) => {
    res.json({message: req.params.id});
});

router.delete("/:id",(req,res) => {
    res.json({message: "Post"+ req.params.id + "bien supprimé !"});
})

router.post("/", setPosts)

module.exports = router;