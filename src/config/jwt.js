require('dotenv').config()
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (userId, userEmail) => {
    return jwt.sign(
        {
          id: userId, 
          email: userEmail
        },
        JWT_SECRET,
        {
          expiresIn: '8h'
        }
      );
} 

module.exports = {
    generateToken,
}