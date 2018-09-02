var express = require("express");
var router = express.Router();
var path = require('path');
var fs = require('fs');

const folder = path.resolve('../ui/angularUi/src/productImages');
var Product = require("../models/product");

function isNullOrEmpty(val) {
  return val == undefined || val == 'undefined' || val == null || val == 'null';
}

router.get("/list/all", async (request, response) => {
  var products = await Product.find({});
  response.send(products);
});

router.get("/id", async (req, res) => {
  var productId = req.query.pid;
  
  var product = await Product.findOne({ "_id": productId });
  res.send(product);
});

router.get("/getproductcount", async (req, res) => {
  let catId = req.query.catId;
  let query = { 'isActive': 'Yes', 'categoryId': catId };
  let productCount = await Product.find(query).countDocuments();
  res.status(200).send({count: productCount });
});

router.get("/list", async (request, response) => {
  let catId = request.query.catId;
  let currentPage = request.query.currentPage;
  let productCount = request.query.productCount;
 
  currentPage = isNullOrEmpty(currentPage) ? 0 : parseInt(currentPage);
  productCount = isNullOrEmpty(productCount) ? 0 : parseInt(productCount);    
  
  let query = { 'isActive': 'Yes' };
  if (!isNullOrEmpty(catId)) {
    query.categoryId = catId;
  }
  var foundProducts; 
  if (currentPage>0 && productCount>0) { 
    let skip = (currentPage - 1) * productCount;
    foundProducts = await Product.find(query).skip(skip).limit(productCount);
  } else {
    foundProducts = await Product.find(query);
  }
  response.send(foundProducts);
  // var allActiveProducts = await Product.find({'isActive': 'Yes'});
  // var productsByCatId = await Product.find({ 'isActive': 'Yes' }).find({'categoryId' : catId});
  
  // if (catId == null || catId == undefined) {
  //   response.send(allActiveProducts);
  // } else {
  //   response.send(productsByCatId);
  // }
    
    
  
});

router.post("/add", (request, response) => {
  var productData = request.body;
  var product = new Product(productData);
  
    
  product.save((error, newFolder) => {
    if (error) {
      console.log(error);
      return response.status(500).send(error);
    }    
    fs.mkdirSync(folder + '/' + newFolder._id);
    response.status(200).send(true);
  });
});

router.post("/delete",async (req, res) => { 
  let productId = req.body.id;
  await Product.findByIdAndRemove({ '_id': productId }, (err, result) => {
    if (err != null)
      res.status(500).send(err);
    deleteFolderRecursive(folder + '/' + productId);
    res.status(200).send('ok');
  }); 

});

var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

router.post('/image/update', async (req, res) => {
  var productId = req.body.id;
  var imgName = req.body.name;

  var product = await Product.findById({ '_id': productId });
  var iPath = "/productImages" + "/" + productId + '/' + imgName;
  product.defaultImageUrl = iPath;
  product.isActive = 'Yes';
  product.save();

});

router.post('/update', async (req, res) => {
  var productId = req.body._id;
  var product = await Product.findById({ '_id': productId });
    
  product.name = req.body.name,
    product.unitPrice = req.body.unitPrice,
    product.quantity = req.body.quantity,
    product.size = req.body.size,
    product.categoryId = req.body.categoryId
  
  product.save();
});

var product = {router};
module.exports = product;
