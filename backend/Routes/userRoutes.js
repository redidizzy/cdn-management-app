const express = require("express")

const router = express.Router()

const { register } = require("../Services/userServices")

//registration
router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body
    const token = await register(userName, password)
    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
