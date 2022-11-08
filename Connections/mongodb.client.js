
const mongoose = require('mongoose');
const {  socialLinksSchema } = require('../mongoose/Schema/socialLinks.shema');
const { ProjectSchema } = require('../mongoose/Schema/projects.schema');
const { notificationSchema } = require('../mongoose/Schema/notification.shema');

const portfolioUri = `portfolio`
const uri = process.env.MONGODB_CONNECTION_URL || `mongodb+srv://devAbdulPortfolio:1532002@cluster0.pdnb4.mongodb.net/${portfolioUri}`;

mongoose.connect(uri).then((res) => console.log('db is connetct')).catch(err => console.dir(err))

module.exports.projectsCollection = mongoose.model('projects', ProjectSchema)
module.exports.notificationCollection = mongoose.model('notifications', notificationSchema)
module.exports.socialLinksCollection = mongoose.model('social_links', socialLinksSchema)
 