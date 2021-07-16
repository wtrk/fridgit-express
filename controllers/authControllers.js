const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signin = async (req,res) => {
    const {email,password} = req.body
    await User.findOne({email}).exec((err,user)=>{
        if(err|| !user){
            return res.status(400).json({
                error:"not authenticated"
            })
        }
        if(password!==user.password){
            return res.status(400).json({
                error:"Wrong email or password!"
            })
        }
        const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})
        const {_id,name,email,usertype_id}=user
        return res.json({
            token, user:{_id,name,email,usertype_id}
        })
    })
return console.log("REQ BODY ON SIGNIN", email)
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})