const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description:{
        type: String,
        required : true,
        unique : true
    },
    image:{
        type: String
    },
    user :{
        type : mongoose.Schema.type.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports  = mongoose.model("blog", blogSchema)