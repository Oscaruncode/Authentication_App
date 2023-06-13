require("dotenv").config()
const express = require ("express")
const cors = require ("cors")
const mongoose = require("mongoose")
const app = express()

const port = process.env.PORT || 5000;

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use("/api/signup", require("./routes/signup"))
app.use("/api/login", require("./routes/login"))
app.use("/api/signout", require("./routes/signout"))
app.use("/api/refreshToken", require("./routes/refreshToken"))
app.use("/api/user", require("./routes/user"))
app.use("/api/todos", require("./routes/todos"))

app.get("/", (req,res) => {
    res.send("ok")
})

app.listen(port, () => {
    console.log("Runing on ",port)
})