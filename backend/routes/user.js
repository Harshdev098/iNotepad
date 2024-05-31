const express = require('express');
const bcrypt=require('bcrypt')
const app = express()
const { validationResult, body } = require('express-validator')
const User = require('../models/User');
const {generateAccessToken}=require('../token')

app.use(express.json())
const router = express.Router();

const validators = [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 })
]
// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/create', validators, async (req, res) => {
    console.log(req.body)
    const result = await validationResult(req)
    if (!result.isEmpty()) {
        console.log("result", result)
        res.status(400).send({ errors: result.array() })
    }
    else {
        const { name, email, password } = req.body
        const bcryptpassword=await bcrypt.hash(password,10)
        // console.log(bcryptpassword)
        let user = await User.findOne({ email: email })
        if (user) {
            console.log("User already exists")
            res,status(401).send('User already exists')
        }
        else {
            user = User({name,email,password:bcryptpassword});
            try {
                await user.save()
                res.status(200).send("User Created")
            }
            catch (err) {
                res.status(500).send("error occured")
            }
        }
    }
})
const loginValidator = [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter the correct Password").notEmpty().isLength({ min: 5 })
]
router.post('/login', loginValidator, async (req, res) => {
    const result = await validationResult(req)
    if (!result.isEmpty()) {
        console.log("result", result)
        res.status(400).send({ errors: result.array() })
    }
    else {
        const { email, password } = req.body
        let user = await User.findOne({ email: email })
        if (user) {
            if(await bcrypt.compare(password,user.password)){
                console.log("User logged in")
                console.log(user.id)
                const token=await generateAccessToken({user:user.id})
                console.log(token)
                res.status(200).send({token:token})
            }
        }
        else {
            console.log("User not found")
            res.status(400).send('User not found')
        }
    }
})

module.exports = router