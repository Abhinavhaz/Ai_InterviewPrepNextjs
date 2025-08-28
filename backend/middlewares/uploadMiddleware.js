const multer = require("multer")

// Configure Store
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
// multer.diskStorage() → Tells Multer to store files on your server’s disk.

// destination: Where to store the file.

// "uploads/" means inside a folder called uploads in your project.

// filename: What to name the file when saving.

// ${Date.now()} → Adds the current timestamp to make file names unique.

// file.originalname → Keeps the original uploaded file name.

// Example: 1692647328142-myphoto.png

//File Filter


const fileFilter = (req,file,cb)=>{
    const allowedTypes = ["image/jpeg","image/png","image/jpg"]
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("Only jpeg,png and jpg files are allowed"),false)
    }
}


const upload = multer({
    storage,
    fileFilter
})


module.exports = upload;