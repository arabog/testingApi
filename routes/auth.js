const router = require("express").Router()


const authController = require("../controllers/authController")
const loginController = require("../controllers/authController")


// register
router.post("/register", authController.registerNewUser )


// login 
router.post("/login", loginController.loginUser)


module.exports = router;

