const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const checkRole = roles => {
  return (req, res, next) => {
    const token = req.get('jwt')

    if(token){
      jwt.verify(token, process.env.SECRET_STRING, (err, decodedToken) => {
        if(err){
          res.json({ status: "Failed", message: "Token invalid/expired" })
        }else{
          // roles.find(role => { console.log(role === decodedToken.role) })
          if(roles.find(role => { return role == decodedToken.role })) next()
          else res.json({ status: "Failed", message: "Unauthorized" })
        }
      })
    }else{
      res.json({ status: "Failed", message: "No token provided" })
    }
  }
}

module.exports = { checkRole }