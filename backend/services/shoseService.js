var express = require("express");
var router = express.Router();

var Shoes = require("../models/shoes");

router.get("/list", async (request, response) => {
  var shoes = await Shoes.find({},'-__v -_id');
  response.send(shoes);
});

router.post("/add", (request, response) => {
  var shoesData = request.body;
  var shoes = new Shoes(shoesData);
  shoes.save(error => {
    if (error) {
      console.log(error);
      return response.status(500).send(error);
    }

    response.status(201).send({ message: "Successfully added" });
  });
});

var shoes = {router};
module.exports = shoes;
