const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        required: true
    },
    trivia: [String]

}, { timestamps: true });


const Item = mongoose.model('Item', itemSchema);
module.exports = Item;