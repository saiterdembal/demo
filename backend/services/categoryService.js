var express = require("express");
var router = express.Router();
var ObjectId = require('mongoose').ObjectId;

var Category = require("../models/category");

router.get("/list", async (request, response) => {
  var categories = await Category.find({});
  response.send(categories);
});

router.post("/add", (request, response) => {
  var categoryData = request.body;
  var category = new Category(categoryData);
  
  category.save(error => {
    if (error) {
      console.log(error);
      return response.status(500).send(error);
    }

    response.status(201).send({ message: "Successfully added" });
  });
});


router.delete("/delete/:id", async(request, response) => {
  var categoryData = request.body;
  var category = await Category();
  
  category.remove(error => {
    if (error) {
      console.log(error);
      return response.status(500).send(error);
    }

    response.status(201).send({ message: "Successfully added" });
  });
});







var category = {router};
module.exports = category;