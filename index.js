import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import recipeRoutes from './routes/recipes.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
dotenv.config();
const app= express();

app.use(express.json()); 
app.use(express.urlencoded({extented:true}));
app.use(cors());
app.use('/posts',recipeRoutes)
app.use('/user',userRoutes)


const port= process.env.PORT || 3200;


mongoose.connect(process.env.url,{useNewUrlParser: true,useUnifiedTopology: true})
const con=mongoose.connection;

con.on('open',function(){
    console.log('Mongo DB connected')
})

app.listen(port,()=> console.log("started"));