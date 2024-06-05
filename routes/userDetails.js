const express = require("express")
const controller = require("../controllers/userDetails")
const router = express.Router()

router.post("/users", controller.createUser)

module.exports = router
