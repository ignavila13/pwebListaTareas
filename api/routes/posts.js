const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

//get back all the posts
router.get('/', async (req, res) => {
   try{
        const posts = await Post.find();
        res.json(posts);
   }catch(err){
        res.json({message:err});
   }
});

//submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    const savedPost = await post.save();
    res.json(savedPost);    
});

//specific post
//we can find a specific post by id
router.get('/:postId', async (req, res) => {
    try{
        console.log(req.params.postId);
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }

});

//delete a specific post
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost =  await Post.remove({_id: req.params.postId}); //this match with the postId
        res.json(removedPost);
    }
    catch(err){
        res.json({message:err});
    }

})

//update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.postId}, 
            {$set: {title: req.body.title}}); 
            res.json(updatedPost);
    } catch (err) {
        res.json({message:err});
    }


    
})


module.exports = router;