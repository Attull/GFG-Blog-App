const Express = require("express")
const dotenv =  require("dotenv")
const userRoute = require("./routes/userRoutes")
const blogRoute = require("./routes/blogRoutes")
const connectDB = require("./config/db")

dotenv.config()

const app = Express()

app.use(Express.json())

app.use("/user",userRoute)
app.use("/blog",blogRoute)

connectDB()

app.listen(3000, ()=>{
    console.log("Listening to PORT 3000")
})