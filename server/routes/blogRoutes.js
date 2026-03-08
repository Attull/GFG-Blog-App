const Express =  require("express")
const { getAllBlogs, getBlogById, addBlog, updateBlog, deleteBlog, getBlogByUserId } = require("../controllers/blogController")

const blogRoute = Express.Router()

blogRoute.get("/", getAllBlogs)
blogRoute.get("/:id", getBlogById)
blogRoute.post("/", addBlog )
blogRoute.put("/:id", updateBlog)
blogRoute.delete("/:id", deleteBlog)
blogRoute.get("/user/:userid", getBlogByUserId)

module.exports = blogRoute