const mongoose = require("mongoose")
const connectionStr =process.env.MONGO_URL

module.exports = function () {
          mongoose.connect(connectionStr, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
          }, 
          
          (err) => {
                              if(err) {
                                        console.log(err);
                              }else {
                                        console.log('Connected to MongoDB');
                              }
                    }
          )

}