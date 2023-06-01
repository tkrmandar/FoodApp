const express = require('express');
const router = express.Router()
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//digital signature
const jwtsecret = "thisismyfullstackdevelopementproject"


router.post("/createuser",
    //vallidation
    body('email').isEmail(),
    body('password', 'Incorrect passsword').isLength({ min: 5 })
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password,salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (err) {
            console.log(err);
            res.json({ success: false })
        }
    })

router.post("/loginuser",
    body('email').isEmail(),
    body('password', 'Incorrect passsword').isLength({ min: 5 }), async (req, res) => {

        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let userdata = await User.findOne({ email });

            if (!userdata) {
                return res.status(400).json({ errors: "login with correct credentials" })
            }

            const cmpPass = await bcrypt.compare(req.body.password,userdata.password)
            if (!cmpPass) {
                return res.status(400).json({ success: false });
            }

            //this 'data' has to be object
            const data = {
                user:{
                    id:userdata.id
                }
            }

            const authToken = jwt.sign(data,jwtsecret)
            return res.json({ success: true, authToken: authToken});

        } catch (err) {
            console.log(err);
            res.json({ success: false })
        }
    })

module.exports = router;