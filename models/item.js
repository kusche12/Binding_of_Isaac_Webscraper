const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    trivia: [String]

}, { timestamps: true });


const Item = mongoose.model('Item', itemSchema);
module.exports = Item;