import mongoose from 'mongoose'

const recipeSchema = mongoose.Schema({
    title: String,
    ingrediants: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    name: String,
    creator: String,
    createdAt:{
        type:Date,
        default:new Date()
    },

});

const RecipeMessage= mongoose.model('RecipeMessage',recipeSchema);

export default RecipeMessage;