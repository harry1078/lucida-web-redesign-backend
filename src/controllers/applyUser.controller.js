import { ApplyUser } from "../models/applyUser.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const applyUserController = asyncHandler( async (req,res) => {
    const {name,phone,email} = req.body

    if([name,phone,email].some((field) => field?.toString().trim() === "")) {
        res.status(400).json({error: "All fields are required"})
    }

    const existedApplyUser = await ApplyUser.findOne({
        $or : [{phone},{email}]
    })

    if(existedApplyUser) {
        res.status(400).json({error: "User with same email or phone number already exists" })
     }

    const resumePath = req.file?.path

    if(!resumePath) {
        res.status(400).json({error: "Resume is required"})
    }

    const resume = await uploadOnCloudinary(resumePath)

    if(!resume) {
        res.status(400).json({error: "Resume file is required"})
    }

     const applyUser = await ApplyUser.create({
        name, 
        phone, 
        email, 
        resume: resume.url
       })

       const createdUser = await ApplyUser.findById(applyUser._id)

       if(!createdUser) {
        res.status(500).json({error: "Something went wrong while applying"})
       }

       res.status(200).json(createdUser)
})

export {applyUserController}