
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProjectSchema = new Schema({
    websiteName: {
        type: String,
        // required: [true, 'please provide a name'],
        trim: true,
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
    },
    createAt: {
        type: Date,
        default: Date.now()
    }, updateAt: {
        type: Date,

    },
    views: Number
}, {
    timestamps: true
})
module.exports.ProjectSchema = ProjectSchema