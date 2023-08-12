const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');


//create a User using Post "/api/auth". Doesn't require Auth
router.post('/', [
    body('name').isLength({ min: 4 }),
    body('email','enter valid and unique email').isEmail(),
    body('password').isLength({ min: 5 })
    ],

    async (req, res) => {

        console.log(req.body);
        //res.send(req.body);
        //res.json({requestBody: req.body}) 
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() })

        let email = await User.findOne({email:req.body.email});
        if(email) return res.status(400).send({error:"duplicate email is not allow"})

        const jwt_secret= "vikramjeet@developer";
       
      try{

        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);

        const myData = await User.create({
          name:req.body.name,
          email:req.body.email,
          password:hash
        });

        const data = {
          user:{
            id:myData.id
          }
        }
        const authtoken = jwt.sign(data, jwt_secret);
        //console.log(token);

        res.json({authtoken});
        
      }catch(err){
        return res.status(400).send(err.message)
      }

    })

module.exports = router;