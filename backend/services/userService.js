var express = require("express");
var jwt = require("jwt-simple");
var router = express.Router();

var User = require("../models/user");

router.post("/register", (request, response) => {
  var userData = request.body;
  var user = new User(userData);
  user.save((error, registeredUser) => {
    if (!error) {
      
      let payload = { subject: registeredUser._id };
      let token = jwt.encode(payload, 'secretKey');
      response.status(200).send({ token });
    } else {
      return response.status(500).send({ message: error });
    }
  });
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.decode(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject;
  next();
}

router.get('/home/shipping-detail', verifyToken, (req, res) => {
  res.send();
});
router.post('/login', async(request, response) =>{
    var userData = request.body;
    var user = await User.findOne({email : userData.email});
    if(!user){
        return response.status(401).send({message: 'Email or password is invalid !'});
    }

    if(userData.password != user.password){
        return response.status(401).send({message: 'Email or password is invalid !'});
  }
  
  let payload = {subject: user._id };
  let token = jwt.encode(payload, 'secretKey');
  response.status(200).send({ token });

});

var user = {router};
module.exports = user;