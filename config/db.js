const mongoose = require("mongoose")

const connection = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log(err))
}

module.exports = connection
