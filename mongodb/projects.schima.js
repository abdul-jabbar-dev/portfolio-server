const mongoose = require('mongoose');
module.exports.ProjectSchema = mongoose.Schema({
    websiteName: {
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
        // unique: true,
    },
    liveLink: {
        type: String,

    },
    serverLink: {
        type: String,

    },
    discription: {
        type: String,

    },
    fecilites: {
        type: String,

    },
    description: {
        type: String,

    },
    siteThumbnail: {
        type: String,

    }
})