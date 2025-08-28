const express = require("express")
const {registerUser,loginUser,getUserProfile} = require("../controllers/authController")
const protect = require("../middlewares/authMiddlewares")
const upload = require("../middlewares/uploadMiddleware")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/profile",protect,getUserProfile)


router.post("/upload-image",upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"})
    }
    const imageUrl =`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//                  "http"or"https".localhost:8000" or "mywebsite.com"       ^ This is the actual name Multer gave your uploaded file.
                        // /uploads/ ..This is the folder where Multer stored your file.
   
    // That line is basically constructing a full web link (URL) to the uploaded image so you can access it later.
    res.status(200).json({imageUrl});

})

module.exports = router;
