const mongoose  =  require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("MongoDB connect successfuly")
    })
}

module.exports = connectDB