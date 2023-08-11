const express =  require('express');
const router = express.Router();
const User = require('../models/Users');


//create a User using Post "/api/auth". Doesn't require Auth
router.post('/',(req,res)=>{
    console.log(req.body);
    //res.send(req.body);
   //res.json({requestBody: req.body}) 
    var myData = new User(req.body);
    myData.save()
    .then(item => {
      //res.send("item saved to database");
      res.status(200).json({ data:myData,message: 'item saved to database' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
})

module.exports = router;