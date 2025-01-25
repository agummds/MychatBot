import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId:{
    type: String,
    required:true
    }
})