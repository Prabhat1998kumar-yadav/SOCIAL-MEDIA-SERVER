const { followOrUnfollowUserController, getPostsOfFollowing,getMyPostsController, getUserPostsController, deleteMyProfile, getMyInfo, updateUserProfile, getUserProfile } = require("../controllers/userController");
const requireUser = require("../middlewares/requireUser");

const router=require("express").Router();


router.post("/follow",requireUser,followOrUnfollowUserController)
router.get("/getFeedData",requireUser,getPostsOfFollowing)
router.get("/getMyPosts",requireUser,getMyPostsController)
router.get("/getUserPosts",requireUser,getUserPostsController)
router.delete("/",requireUser,deleteMyProfile);
router.get("/getMyInfo",requireUser,getMyInfo);
router.put("/",requireUser,updateUserProfile)
router.post("/getUserProfile",requireUser,getUserProfile)
module.exports=router