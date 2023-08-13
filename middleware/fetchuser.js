const jwt = require('jsonwebtoken');
const jwt_secret = "vikramjeet@developer";

const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:'Please authanticate with valid token'})
    }

    try {
        const data = jwt.verify(token,jwt_secret);

        /*
         Get user id that send in jwt token at the time of create jwt token
        // example::
        // const data = {
        //     user: {
        //       id: userModel.id
        //     }
        //   
        */
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:'Please authanticate with valid token'})
    }

}


module.exports = fetchUser;