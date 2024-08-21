import { Router } from "express";
import {fetchUserDetails, registerUser} from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/getuser/:email").get(fetchUserDetails)

export default router