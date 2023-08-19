const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const jwt_secret = "vikramjeet@developer";
const fetchuser = require('../middleware/fetchuser');


//Route 1: create a User using Post "/api/auth/createuser". No login require
router.post('/createuser', [
  body('name').isLength({ min: 4 }),
  body('email', 'enter valid and unique email').isEmail(),
  body('password').isLength({ min: 5 })
],
async (req, res) => {

    let success = false;

    console.log(req.body);
    //res.send(req.body);
    //res.json({requestBody: req.body}) 
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send({ success,errors: errors.array() })

    let email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).send({ success,error: "duplicate email is not allow" })

    try {

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const myData = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });

      const data = {
        user: {
          id: myData.id
        }
      }
      const authtoken = jwt.sign(data, jwt_secret);
      //console.log(token);

      res.json({ success:true,authtoken });

    } catch (err) {
      return res.status(400).send(err.message)
    }

  })


//Route 2: Login user using Post "/api/auth/login"
router.post('/login', [
  body('email', 'enter valid and unique email').isEmail(),
  body('password').isLength({ min: 5 })
],
  async (req, res) => {

    let success = false;

    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ success,error: errors.array() })
    }

    try {

      const userModel = await User.findOne({ email: email });
      if (!userModel) {
        res.status(400).json({ success,error: "check email credential properly" });
      }

      const passwordCompare = await bcrypt.compare(password, userModel.password);
      if (!passwordCompare) {
        res.status(400).json({ success,error: "check password credential properly" });
      }


      const data = {
        user: {
          id: userModel.id
        }
      }
      const authtoken = jwt.sign(data, jwt_secret);
      res.json({ success:true,authtoken });

    } catch (err) {
      res.status(400).send(err.message)
    }

  })


  //Route 3: get User data using Auth token:Login is required
  router.post('/getuser',fetchuser,async (req,res)=>{
    console.log(req);

    const userId = req.user.id;

    try {
      const user = await User.findById(userId).select("-password");
      res.status(200).send(user);
    } catch (error) {
        res.send(error.message);
    }

  })

module.exports = router;