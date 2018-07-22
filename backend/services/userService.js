var express = require("express");
var jwt = require("jwt-simple");
var router = express.Router();

var User = require("../models/user");

router.post("/register", (request, response) => {
  var userData = request.body;
  var user = new User(userData);
  user.save(error => {
    if (!error) {
      response.status(201).send({ message: "Created" });
    } else {
      return response.status(500).send({ message: error });
      console.log(error);
    }
  });
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

    var payload = {};
    var token = jwt.encode(payload, '12345');
    response.status(200).send({token});
});

var user = {router};
module.exports = user;