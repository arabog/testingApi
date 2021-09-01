const Post = require("../models/Post")
const User = require("../models/User")


// cr8 post
exports.createNewPost = async (req, res) => {

          const newPost = new Post(req.body)

          try {
                    const savedPost = await newPost.save()

                    res.status(200).json(savedPost)
          } catch (err) {
                    res.status(500).json(err)
          }
}


// update post
exports.updatePost = async (req, res) => {
          
          const post = await Post.findById(req.params.id)
          
          try {

                    if (post.userId === req.body.userId) {
                              await post.updateOne( 
                                        {
                                                  $set: req.body
                                        }
                              )

                              res.status(200).json("The Post Has Been Updated")
                    } else {
                              res.status(403).json("You Can Only Update Your Post")
                    }
          } catch (err) {
                    res.status(500).json(err)
          }
}


// del a post
exports.delPost = async (req, res) => {
          
          const post = await Post.findById(req.params.id)
          
          try {

                    if (post.userId === req.body.userId) {
                              await post.deleteOne()

                              res.status(200).json("The Post Has Been Deleted")
                    } else {
                              res.status(403).json("You Can Only Delete Your Post")
                    }
          } catch (err) {
                    res.status(500).json(err)
          }
}


// un/like a post
exports.likeUnlikePost = async (req, res) => {
          try {
                    const post = await Post.findById(req.params.id)

                    if(!post.likes.includes(req.body.userId)) {
                              await post.updateOne(
                                        {
                                                  $push: {
                                                            likes: req.body.userId
                                                  }
                                        }
                              )

                              res.status(200).json("The Post Has Been Liked")
                    }else {
                              await post.updateOne(
                                        {
                                                  $pull: {
                                                            likes: req.body.userId
                                                  }
                                        }
                              )

                              res.status(200).json("The Post Has Been Disliked")
                    }
          } catch (err) {
                    res.status(500).json(err)
          }
}


// get a post
exports.getApost = async (req, res) => {
          try {
                    const post = await Post.findById(req.params.id)

                    res.status(200).json(post)
          } catch (err) {
                    res.status(500).json(err)
          }
}


// get all post
exports.getAllPosts = async (req, res) => {
          try {
                    const allPosts = await Post.find()

                    res.status(200).json(allPosts)
          } catch (err) {
                    res.status(500).json(err)
          }
}


// get timeline (of pple u followed) posts
exports.getYourPostAndYourFrdPosts = async (req, res) => {

          try {
                    const currentUser = await User.findById(req.body.userId)               
                    const userPosts = await Post.find({userId: currentUser._id})

                    const friendPosts = await Promise.all(
                              currentUser.followings.map((friendId) => {
                                        return Post.find({userId: friendId})
                              })
                    )

                    // show both user and frds posts
                    res.status(200).json(userPosts.concat(...friendPosts))
          } catch (err) {
                    res.status(500).json(err)
          }
}


// get user's all posts
exports.getUserOnlyPosts = async (req, res) => {
          try {
                    const user = await User.findOne({username: req.params.username})
                    const posts =await Post.find({userId: user._id})

                    res.status(200).json(posts)
          } catch (err) {
                    res.status(500).json(err)
          }
}