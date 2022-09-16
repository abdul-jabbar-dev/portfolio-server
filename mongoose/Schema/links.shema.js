const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

module.exports.utilsSchema = new Schema({
    name: {
        type: String,
        uniq: true,
        required: true
    }, url: {
        type: String,
        required: true
    }
})