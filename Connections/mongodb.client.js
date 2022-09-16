
const mongoose = require('mongoose');
const { utilsSchema } = require('../mongoose/Schema/links.shema');

const { ProjectSchema } = require('../mongoose/Schema/projects.schima');
const portfolioUri = `portfolio`
const uri = process.env.MONGODB_CONNECTION_URL || `mongodb+srv://devAbdulPortfolio:1532002@cluster0.pdnb4.mongodb.net/${portfolioUri}`;

mongoose.connect(uri).then((res) => console.log('db is connetct')).catch(err => console.dir(err))
const projectsCollection = mongoose.model('projects', ProjectSchema)



const utilsCollection = mongoose.model('utils', utilsSchema)


module.exports.projectsCollection = projectsCollection;
module.exports.utilsCollection = utilsCollection;

// const mongodb = require('mongodb');
// const client = new mongodb.MongoClient(uri);
// const database = client.db('portfolio');
// const projectsCollection = database.collection('projects');
// module.exports.client = client;