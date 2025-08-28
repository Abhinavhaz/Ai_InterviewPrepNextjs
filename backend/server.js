require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const {generateInterviewQuestions,generateConceptExplanation} = require("./controllers/aiControllers")
const protect = require("./middlewares/authMiddlewares")
const CONNECTDB = require("./config/db")




const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/SessionRoutes")
const questionRoutes = require("./routes/QuestionRoutes")

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


CONNECTDB()

//Middleware
app.use(express.json())


//Routes

app.use("/api/auth",authRoutes)
app.use("/api/sessions",sessionRoutes)
app.use("/api/questions",questionRoutes)

app.use("/api/ai/generate-questions",protect ,generateInterviewQuestions)
app.use("/api/ai/generate-explanation",protect ,generateConceptExplanation)

app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})