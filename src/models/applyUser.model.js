import mongoose from "mongoose";

const applyUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  resume: {
    type: String,   //cloudinary url
    required: true
  }  
},
{timestamps: true})

export const ApplyUser = mongoose.model("ApplyUser",applyUserSchema)