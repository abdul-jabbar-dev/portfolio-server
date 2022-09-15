const express = require('express')
const cors = require('cors');
const app = express()
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
}));
require('dotenv').config()
app.use(cors())

module.exports.app = app