const express=require("express");
const dotenv=require("dotenv");

const cookieParser=require("cookie-parser");
const cors=require("cors")

const dbConnect=require("./dbConnect");
const authRouter=require("./routers/authRouter");
const postsRouter=require("./routers/postsRouter");
const userRouter=require("./routers/userRouter")
const cloudinary=require("cloudinary")
dotenv.config("./.env");
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
});
    
   

const app=express();

// middlewares
app.use(express.json({limit:"10mb"}))

app.use(cookieParser())
app.use(cors({
    secure:true,
    origin:"https://social-media-client-a3xa.onrender.com"
}));

app.use("/auth",authRouter);
app.use("/posts",postsRouter);
app.use("/user",userRouter)
app.get("/",(req,res)=>{
    res.status(200).send("OK form server");
})


const PORT=process.env.PORT||5000;

dbConnect()
app.listen(PORT,()=>{
    console.log(`listening on port: ${PORT}`)
})
