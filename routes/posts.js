const router = require("express").Router()

const newPostController = require("../controllers/postController")
const newUpdate = require("../controllers/postController")
const deletePost = require("../controllers/postController")
const likeOrUnlikePost = require("../controllers/postController")
const getAsinglePost = require("../controllers/postController")
const allPosts = require("../controllers/postController")
const getYourPostAndFollowings = require("../controllers/postController")
const getUserOnlyPosts = require("../controllers/postController")

// cr8 post
router.post("/", newPostController.createNewPost)


// update post
router.put("/:id", newUpdate.updatePost)


// del a post
router.delete("/:id", deletePost.delPost)


// like/unlike a post
router.put("/:id/like", likeOrUnlikePost.likeUnlikePost)


// get all posts
router.get("/", allPosts.getAllPosts)


// get a post from user posts
router.get("/:id", getAsinglePost.getApost)


// get ur post & timeline/posts (of pple u followed) 
// to get only ur posts: use ur userId
router.get("/timeline/:userId", getYourPostAndFollowings.getYourPostAndYourFrdPosts)


router.get("/profile/:username", getUserOnlyPosts.getUserOnlyPosts)


module.exports = router