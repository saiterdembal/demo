var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: String,
    seoUrl:String
})

module.exports = mongoose.model('Category',categorySchema)