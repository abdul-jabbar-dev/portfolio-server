const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

module.exports.socialLinksSchema = new Schema({
    name: {
        type: String,
        uniq: true,
        required: true
    }, url: {
        type: String,
        required: true
    }, priority: {
        type: String,
        required: true
    }
})