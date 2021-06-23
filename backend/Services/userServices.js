const user = require("../Models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async (userName, password) => {
  try {
    const userFound = await user.findOne({ userName })
    if (userFound) {
      throw new Error("User already exists")
    }
    const newUser = new user({
      userName,
      password: await bcrypt.hash(password, 10),
    })
    const saveUser = newUser.save()
    return generateToken(saveUser)
  } catch (error) {
    throw new Error(error)
  }
}

const login = async (userName, password) => {
  try {
    const userFound = await user.findOne({ userName })
    if (!userFound) {
      throw new Error("No user with that username found")
    } else {
      const comparePasswords = new Promise((resolve, reject) => {
        bcrypt.compare(password, userFound.password, (error, match) => {
          if (match) {
            resolve(generateToken(userFound))
          } else {
            reject("Username or password is invalide")
          }
        })
      })
      return comparePasswords
    }
  } catch (error) {
    throw new Error(error)
  }
}

const generateToken = (user) => {
  return jwt.sign({ data: user }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  })
}
module.exports = {
  register,
  login,
}
