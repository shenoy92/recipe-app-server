import express from 'express';
import mongoose from 'mongoose';
import RecipeMessage from '../models/recipeMessage.js'

const router = express.Router();

export const getPosts= async (req,res)=>{
    try{
        const recipeMessages=await RecipeMessage.find();
       
        res.status(200).json(recipeMessages);
    } catch(error) {
        res.status(404).json(error);
    }
}



export const createPost= async(req,res)=>{
    const post = req.body;

    const newPost = new RecipeMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try{
        await newPost.save();

        res.status(201).json(newPost);
    } catch(error) {
        res.status(409).json({message:error.message})
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, ingrediants, creator, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, ingrediants, selectedFile, _id: id };

    await RecipeMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await RecipeMessage.findByIdAndRemove(id)

    res.json({message:'Post deleted sucessfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await RecipeMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await RecipeMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}


export default router;