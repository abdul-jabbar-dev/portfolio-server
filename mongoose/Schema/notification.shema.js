
const { default: mongoose } = require('mongoose')
const { Schema } = mongoose
const notificationSchema = new Schema({}, {timestamps:true, strict: false })


module.exports.notificationSchema = notificationSchema