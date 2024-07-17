import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req,res) => {
   const {name, phone, email, message} = req.body

   //check if any of the field is empty
   if([name,phone,email].some((field) => field?.toString().trim() === "")){
    throw new ApiError(400, "All fields are required")
   }

   //check if user already exists
   const existedUser = await User.findOne({
    $or : [{phone},{email}]
   })

   if(existedUser) {
    throw new ApiError(400, "User with same email or phone number already exists")
   }

   //add user data to db
   const user = await User.create({
    name, phone, email, message
   })

   //check if user data is added
   const createdUser = await User.findById(user._id)
   if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
   }

   return res.status(200).json(createdUser)
})

const fetchUserDetails = asyncHandler( async (req,res) => {
   const {email} = req.body
   if(!email) {
      throw new ApiError(400, "Email is required")
   }

   const user = await User.findOne({email})
   if(!user) {
      throw new ApiError(404, "User not found")
   }
   return res.status(200).json(user)
})

export {
   registerUser,
   fetchUserDetails
}