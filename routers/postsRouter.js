const {getAllPostsController, createPostController, likeAndUnlikePost, updatePostController, deletePostController} = require("../controllers/postsController");
const requireUser=require("../middlewares/requireUser")
const router=require("express").Router();



router.post("/",requireUser,createPostController);
router.post("/likes",requireUser,likeAndUnlikePost);
router.put("/",requireUser,updatePostController);
router.delete("/",requireUser,deletePostController);

module.exports=router;