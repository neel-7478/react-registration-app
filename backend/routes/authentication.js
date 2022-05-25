
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require("../models/registration");
const { body, validationResult } = require('express-validator');

const jwt_secret = "f!!!u@@@c####k$$$$y%%%o^^^^u";

router.post("/create", [
    body("name", "Enter your name").isLength({ min: 4 }),
    body("email", "Enter your email").isEmail(),
    body("password", "Enter your password").isLength({ min: 6 }),
    body("confirmpassword", "Reenter your password"),
], async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json("User exits with this email");
        }
        const salt = await bcrypt.genSalt(10);
        const sec_pass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: sec_pass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, jwt_secret);
        success = true;
        res.json({authtoken,success});
    } catch (error) {
        res.status(500).json("Internal server error");
    }
})


router.post("/login", async(req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json("please enter valid login credentials");
        }

        const passwordCompare  = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json("please provide valid login credentials");
        }

        const data = {
            user:{
                id:user.id
            }
        }

        const authtoken = jwt.sign(data,jwt_secret);
        success = true;
        res.status(200).json({authtoken,success});
    } catch (error) {
        
    }
})
module.exports = router;