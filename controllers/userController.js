const User = require("../models/User")
const bcrypt = require("bcrypt")


// update user
exports.updateUser = async (req, res)=> {
          /*{
                    "desc": "My first update",
                    "userId": "611d7c719ce3481769f7d5c6"
                    "_id": "611d7c719ce3481769f7d5c6"
          }*/ 
          
          // check if d supplied id is d same with _id(req.params.id) 4rm db
          if(req.body.userId === req.params.id || req.body.isAdmin) {
                    if(req.body.password) {
                              try {
                                        const salt = await bcrypt.genSalt(10)
                                        req.body.password = await bcrypt.hash(req.body.password, salt)

                              } catch (err) {
                                        res.status(500).json(err)
                              }

                    }

                    try {

                              // await User.updateOne({_id: req.params.id}, {
                              //           $set: req.body
                              // })

                              await User.findByIdAndUpdate(req.params.id, {
                                        $set: req.body
                              })

                              res.status(200).json("Account has been updated")
                    } catch (err) {
                              res.status(500).json(err)
                    }

          }else {
                    res.status(403).json("You can only update your account")
          }
}


// delete user
exports.deleteUser = async (req, res)=> {
          
          if(req.body.userId === req.params.id || req.body.isAdmin) {

                    try {
                              // await User.deleteOne({_id: req.params.id})
                              await User.findByIdAndDelete(req.params.id)

                              res.status(200).json("Account has been deleted")
                    } catch (err) {
                              res.status(500).json(err)
                    }

          }else {
                    res.status(403).json("You can only delete your account")
          }
}


// get a user
exports.getUser = async (req, res) => {
          const userId = req.query.userId
          const username = req.query.username

          try {
                    const user = userId 
                                        ? await User.findById(userId)
                                        : await User.findOne({username: username})

                    // hide vital info
                    const { password, updateAt, ...other} = user._doc

                    res.status(200).json(other)
          } catch (err) {
                    res.status(500).json("User Not Found")
          }
}


// get frds
exports.getAllFrds = async (req, res) => {
          try {
                    const user = await User.findById(req.params.userId)
                    const friends = await Promise.all(
                              user.followings.map(friendId => {
                                        return User.findById(friendId)
                              })
                    )

                    let friendList = []
                    friends.map(friend => {
                              const { _id, username, profilePicture } = friend
                              friendList.push({  _id, username, profilePicture })
                    })

                    res.status(200).json(friendList)
          } catch (err) {
                    res.status(500).json(err)
          }
}


// follow a user
exports.followUser =  async (req, res) => {
          if(req.body.userId !== req.params.id) {
                    try {
                              // user (person) to be followed
                              const user = await User.findById(req.params.id)

                              // (person) following
                              const currentUser = await User.findById(req.body.userId)

                              if (!user.followers.includes(req.body.userId)) {
                                        await user.updateOne(
                                                  {
                                                            $push: {
                                                                      followers: req.body.userId
                                                            }
                                                  }
                                        )


                                        await currentUser.updateOne(
                                                  {
                                                            $push: {
                                                                      followings: req.params.id
                                                            }
                                                  }
                                        )

                                        res.status(200).json("User Has Been Followed")

                              } else {
                                        
                              }
                    } catch (err) {
                              res.status(500).json(err)
                    }
          }else {
                    res.status(403).json("You Can't Follow Yourself")
          }
}


// unfollow a user
exports.unFollowUser = async (req, res) => {
          if(req.body.userId !== req.params.id) {
                    try {
                              // user (person) to be followed
                              const user = await User.findById(req.params.id)

                              // (person) following
                              const currentUser = await User.findById(req.body.userId)

                              if (user.followers.includes(req.body.userId)) {
                                        await user.updateOne(
                                                  {
                                                            $pull: {
                                                                      followers: req.body.userId
                                                            }
                                                  }
                                        )


                                        await currentUser.updateOne(
                                                  {
                                                            $pull: {
                                                                      followings: req.params.id
                                                            }
                                                  }
                                        )

                                        res.status(200).json("User Has Been Unfollowed")

                              } else {
                                        
                              }
                    } catch (err) {
                              res.status(500).json(err)
                    }
          }
          else {
                    res.status(403).json("You Can't Unfollow Yourself")
          }
}
