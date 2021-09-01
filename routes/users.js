const router = require("express").Router()


const updateUserController = require("../controllers/userController")
const deleteUserController = require("../controllers/userController")
const getUserController = require("../controllers/userController")
const getAllFriends = require("../controllers/userController")
const followUserController = require("../controllers/userController")
const unfollowUserController = require("../controllers/userController")

// update user
router.put("/:id", updateUserController.updateUser)


// delete user
router.delete("/:id", deleteUserController.deleteUser)


// get a user
router.get("/", getUserController.getUser)


// get all frds
router.get("/friends/:userId", getAllFriends.getAllFrds)


// follow a user
router.put("/:id/follow", followUserController.followUser)


// unfollow a user
router.put("/:id/unfollow", unfollowUserController.unFollowUser)


module.exports = router;