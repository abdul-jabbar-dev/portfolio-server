
const { default: mongoose } = require('mongoose')
const { Schema } = mongoose
const notificationSchema = new Schema({}, { strict: false })


module.exports.notificationSchema = notificationSchema