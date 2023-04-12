const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_USER_NAME||'dnkwv76h3',
    api_key: process.env.CLOUDINARY_API_KEY||'326797376699676',
    api_secret: process.env.CLOUDINARY_API_SECRET||`U2OcTLd7F1q90fBh93r4WgbgjEQ`
});
module.exports = cloudinary