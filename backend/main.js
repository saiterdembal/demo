var express = require('express');
var jwt = require("jwt-simple");

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var category = require('./services/categoryService');
var user = require('./services/userService');
var product = require('./services/productService');
var image= require('./services/imageProductService');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use((res, resp, next) => {
//     var token = res.headers.authorization;
//     console.log("worked");
//     var result = jwt.decode(token, '12345');
//     console.log(result);
//     if (result != null && result.key == "s.erdembal@gmail.com")
//         next();
//     resp.status(500).send("Not authorize");
//  });


mongoose.connect('mongodb://usershop2018db:org2012blsm@ds020168.mlab.com:20168/shoesdbshop2018', {useNewUrlParser: true}, error =>{
    if(!error){
        console.log('connected to db')
    }
});


app.use('/category', category.router);
app.use('/user', user.router);
app.use('/product', product.router);
app.use('/image', image.router)

app.listen(8080);