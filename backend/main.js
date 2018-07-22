var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://usershop2018db:org2012blsm@ds020168.mlab.com:20168/shoesdbshop2018', {useNewUrlParser: true}, error =>{
    if(!error){
        console.log('connected to db')
    }
});

app.listen(8080);