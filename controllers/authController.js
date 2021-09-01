const User = require("../models/User")
const bcrypt = require("bcrypt")


exports.registerNewUser = async (req, res) => {
          // encrypt password
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(req.body.password, salt)

          // cr8 new user
          const newUser = await new User(
                    {
                              // info supplied 4rm postman
                              username: req.body.username,
                              email: req.body.email,
                              // password: req.body.password
                              password: hashedPassword
                    }
          )

          try {
                    const user = await newUser.save()

                    res.status(200).json(user)
          } catch (err) {
                    res.status(500).json(err)
          }

}


exports.loginUser = async(req, res) => {

          try {
                    // find user
                    const user = await User.findOne(
                              {
                                        email: req.body.email
                              }
                    )
                    !user && res.status(404).json("User Not Found")
                    
                    // find password
                    const validPassword = await bcrypt.compare(req.body.password, user.password)
                    !validPassword && res.status(400).json("Wrong Password")

                    // correct email & password
                    res.status(200).json(user)
          } catch (err) {
                    res.status(500).json(err)
          }
}