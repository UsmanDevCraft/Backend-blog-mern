import mongoose, { Schema } from "mongoose";

const Comment = new Schema({
    name:{
        type: String,
    },
    username: {
        type: String,
        unique: false,
    },
    comments: [
        {
            type: String
        }
    ]
})

export default mongoose.model("Comment", Comment)