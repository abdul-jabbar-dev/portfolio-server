
const mongoose = require('mongoose');
const { ProjectSchema } = require('../mongodb/projects.schima');
const uri = process.env.MONGODB_CONNECTION_URL || `mongodb+srv://devAbdulPortfolio:1532002@cluster0.pdnb4.mongodb.net/?retryWrites=true&w=majority/portfolio`;

// const mongodb = require('mongodb');
// const client = new mongodb.MongoClient(uri);
// const database = client.db('portfolio');
// const projectsCollection = database.collection('projects');
// module.exports.client = client;
mongoose.connect(uri).then(res => { console.log('db is connect') }).catch(err=>console.dir(err))
const projectsCollection = mongoose.model('projects', ProjectSchema)
module.exports.projectsCollection = projectsCollection;
//!@@##$%^%&*^%(&U*(%^&(*_$^)))   select collection problem /test ->> portfolio