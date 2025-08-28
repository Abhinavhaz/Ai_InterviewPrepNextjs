const express = require("express")
const {createSession,getSessionById,getMySessions,deleteSession} = require("../controllers/sessionController")
const protect = require("../middlewares/authMiddlewares")


const router = express.Router()


router.post("/create",protect,createSession)
router.get("/get/:id",protect,getSessionById)
router.get("/my-sessions",protect,getMySessions)
router.delete("/delete/:id",protect,deleteSession)

module.exports = router;






