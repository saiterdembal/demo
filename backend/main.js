var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var category = require('./services/categoryService');
var user = require('./services/userService');
var shoes = require('./services/shoseService');


var app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://usershop2018db:org2012blsm@ds020168.mlab.com:20168/shoesdbshop2018', {useNewUrlParser: true}, error =>{
    if(!error){
        console.log('connected to db')
    }
});

app.use('/category', category.router);
app.use('/user', user.router);
app.use('/shoes', shoes.router);
app.listen(8080);