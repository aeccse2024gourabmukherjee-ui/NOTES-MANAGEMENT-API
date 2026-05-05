
const express = require("express")
require("dotenv").config()

const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(express.json())

connectDB()

app.use("/api", userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT)