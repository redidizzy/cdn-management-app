const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null)
    return req.xhr ? res.sendStatus(401) : res.redirect("/login")

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return req.xhr ? res.sendStatus(403) : res.redirect("/login")

    req.user = user

    next()
  })
}
module.exports = {
  authenticateToken,
}
