const express = require('express');
const router = express.Router();
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
        
      try{
        const myData = await new User(req.body);
        const result = myData.save()
        res.status(200).send(myData)
      }catch(err){
        return res.status(400).send(err.message)
      }

        // .then(item => { 
        //   //res.send("item saved to database");
        //   res.status(200).json({ data:myData,message: 'item saved to database' });
        // })
        // .catch(err => {
        //   res.status(400).send(err.message);
        // });
    })

module.exports = router;