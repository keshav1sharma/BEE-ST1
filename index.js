import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; //for accessing .env files
import User from "./model/user.js";
import Student from "./model/student.js";
import Books from "./model/book.js";

dotenv.config(); 


const app = express();
const port = 8000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database connected")})
.catch(()=>{console.log("Database error")})



app.use(express.urlencoded());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send(`Hello world`);
})


app.post("/api/books", async(req,res)=>{
    const data = req.body;
    const book = Books(data);
    console.log(book);
    await book.save();
    res.status(200).send("Data Successfully added");
})


app.get('/api/books',async(req,res)=>{
    const users = await Books.find({});
    console.log(users);
    res.status(200).json(users);
})

app.delete('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    
    
    const result = await Books.deleteOne({ isbn: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
    
});


app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;

    
    const book = await Books.findOne({ isbn: id });

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
    
});


app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const updatedBookData = req.body; 

    const result = await Books.updateOne({ isbn: id }, { $set: updatedBookData });

    if (result.n === 0) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book updated successfully' });
    
});





app.listen(port,()=>{
    console.log(`Running on port Number ${port}`)
})