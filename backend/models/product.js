var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name : String,
    unitPrice: Number,
    quantity: Number,
    size: String,
    defaultImageUrl: String,
    categoryId: String,
    isActive : String 
    
});

module.exports = mongoose.model('Product', productSchema);