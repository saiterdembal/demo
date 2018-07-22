var mongoose = require('mongoose');

var shoesSchema = new mongoose.Schema({
    name : String,
    unitPrice: Number,
    quantity: Number,
    size: Number,
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Category'}
});

module.exports = mongoose.model('Shoes', shoesSchema);