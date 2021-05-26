const express = require('express')
const app = express()
const port = 3000

// Our routes


app.listen(port, () => {
  console.log(`CDN Management System app listening at http://localhost:${port}`)
})