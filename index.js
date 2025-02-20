import express from "express"
import mongoConnection from "./db.js";
import Comment from "./Models/Comments.js";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors())
mongoConnection();

app.get("/api/articles/:name", async (req, res) => {
    try {

        const specificComments = await Comment.find({name: req.params.name});
        res.send(specificComments)

    } catch (error) {
        res.status(400).send(error)
    }
})

app.get("", (req, res)=>{
    res.send("Page works fine!😋")
})


app.post("/api/articles/:name/add-comments", async (req, res) => {
    try {
        const { username, text } = req.body;
        const articleName = req.params.name;
        const Comments = new Comment({
            name: articleName,
            username: username,
            comments: text,
        });
        const savedComment = await Comments.save();
        res.send(Comments);
    } catch (error) {
        res.status(400).send({error: error});
    }
});

app.delete("/api/articles/deletecomment/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let comment = await Comment.findById(id);
        if(!comment){
            return res.status(404).json({"error": "Comment doesnot existor already deleted!"})
        }
        comment = await Comment.findByIdAndDelete(id);
        res.send({comment, error: "Comment deleted successfully"});

    } catch (error) {
        res.status(400).send({error: error.message});
    }
})


app.listen(port, ()=>{
    console.log(`Backend is running fine 🥰 on port localhost:${port}`)
});