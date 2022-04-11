module.exports.calls = () => {
    const express = require('express')
    const app = express()
    const cors = require('cors');
    const port = process.env.PORT || 2001;
    const mongodb = require('mongodb')
    const fileUpload = require('express-fileupload')
    const cloudinary = require('cloudinary')
    const { ObjectID } = require('mongodb')
    const fs = require('fs')
    app.use(express.json())
    app.use(fileUpload({
        useTempFiles: true,
    }));
    require('dotenv').config()
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_USER_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    app.use(cors())
    const uri = process.env.MONGODB_CONNECTION_URL;
    const client = new mongodb.MongoClient(uri);
    return { uri, client, cloudinary, port, app, fileUpload, express, mongodb, ObjectID, fs }
}