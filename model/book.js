import mongoose from "mongoose";

const book = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
    },
    genre:{
        type:String
    },
    publicationYear:{
        type:Number,
    },
    isbn:{
        type:String,
        required:true,
        unique: true,
    }
})

const Books = mongoose.model("Books",book);

export default Books;