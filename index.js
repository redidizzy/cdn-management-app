const express = require("express")
const mongoose = require("mongoose")
mongoose.set("useCreateIndex", true)
const app = express()
const port = 3000
const fileUpload = require("express-fileupload")
app.use(fileUpload())
const staticFolder = "./frontend/assets"
var expressLayouts = require("express-ejs-layouts")
const path = require("path")
const fetch = require("node-fetch")
const jwt = require("jsonwebtoken")
//using local storage for jwt
const { LocalStorage } = require("node-localstorage")

const { login } = require("./backend/Services/userServices")

const { authenticateToken } = require("./backend/middlewares")

require("dotenv").config()

var localStorage = new LocalStorage("./scratch")

// Our routes

app.use(expressLayouts)

app.set("view engine", "ejs")
app.set("views", "./frontend/views")
app.set("layout", "layout")

//db connection
mongoose.connect("mongodb://localhost:27017/CDN", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, staticFolder)))

app.get("/", async (req, res) => {
  res.render("pages/dashboard")
})
//login routes
app.get("/login", (req, res) => {
  res.render("pages/login")
})
app.post("/authenticate", async (req, res) => {
  const { userName, password } = req.body
  try {
    let token = await login(userName, password)
    jwt.verify(token, process.env.TOKEN_SECRET, (error) => {
      if (!error) {
        localStorage.setItem("jwt", token)
        res.send({ token })
      } else {
        res.status(400).send({ error: error.message })
      }
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})
//logout
app.get("/logout", (req, res) => {
  res.render("pages/login")
})

// Resource upload page
app.get("/resources_upload", (req, res) => {
  res.render("pages/resources_upload")
})

//
app.listen(port, () => {
  console.log(`CDN Management System app listening at http://localhost:${port}`)
})

// handling authentification queries
const user = require("./backend/Routes/userRoutes")
app.use("/auth", user)

//handling resources requests
const resource = require("./backend/Routes/resourceRoutes")
app.use("/resource", resource)
