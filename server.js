const express = require("express");
const dotenv = require("dotenv")
const PORT = process.env.PORT || 5000
dotenv.config()
const cors = require("cors")
const connection = require("./config/db")
const userRouter = require("./routes/userRoute");
const notesRouter = require("./routes/notesRoute")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path")


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/users", userRouter)
app.use("/api/notes", notesRouter)

// serving the frontend
app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", function(_,res) {
    res.sendFile(
        path.join(__dirname, "../frontend/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.get("/", (req, res) => {
    res.send("Hello from the server side!")
})

app.use(notFound)
app.use(errorHandler)



app.listen(PORT, () => {
    connection()
    console.log(`Server is running on port: ${PORT}`)
})