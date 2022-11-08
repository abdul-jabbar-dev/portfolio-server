const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const socialLinksSchema = new Schema({}, { strict: false })
 
module.exports.socialLinksSchema = socialLinksSchema