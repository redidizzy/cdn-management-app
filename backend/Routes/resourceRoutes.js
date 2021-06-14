const express = require("express")
const router = express.Router()
const resource = require("../Models/resource")
const fileUpload = require("express-fileupload")
const { authenticateToken } = require("../middlewares.js")

// geting all resources
router.get("/", async (req, res) => {
  try {
    const resources = await resource.find()
    res.status(201).json(resources)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
//getting one resource
router.get("/:id", async (req, res) => {
  try {
    const resource = await resource.findOne({ _id: req.params.id })
    if (resource) {
      res.status(201).json(resource)
    } else {
      res.status(400).json({ error: "resource not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
//creating a resource

router.post("/upload", authenticateToken, async (req, res) => {
  try {
    //saving the File
    if (!req.files) {
      res.status(400).send({ error: "File not uploaded " })
    } else {
      console.log(req.files)
      const uploadedResource = req.files.resource
      const name = req.filename
      const relativePath = "/../../uploads/"
      await uploadedResource.mv(
        __dirname + relativePath + name,
        async (error) => {
          if (!error) {
            //saving resource in db
            const url = __dirname + relativePath + name
            const newResource = new resource({
              name: req.name,
              type: uploadedResource.mimetype,
              url: url,
              admindRef: req.user.id,
            })
            try {
              const savedResource = await newResource.save()
              res.status(201).json(savedResource)
            } catch (error) {
              res.status(400).json({ message: error.message })
            }
          } else {
            res.status(500).send(error)
          }
        }
      )
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
//update
//delete
module.exports = router
