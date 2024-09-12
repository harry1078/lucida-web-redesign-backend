import { Router } from "express";
import {fetchUserDetails, registerUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {applyUserController} from "../controllers/applyUser.controller.js"

const router = Router()

router.route("/register").post(registerUser)

router.route("/getuser/:email").get(fetchUserDetails)

router.route("/apply").post(
    upload.single('resume'),
    applyUserController
)

export default router