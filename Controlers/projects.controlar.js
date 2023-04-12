const { projectsCollection } = require("../Connections/mongodb.client");
const cloudinary = require("../Connections/cloudinary.config");
const { ObjectID } = require('mongodb')
const fs = require('fs');
const { sendMailWithMy } = require("../utils/mail");



module.exports.post_projects = async (req, res) => {
    try {

        let files = req.files;
        if (files) {
            req.body.siteThumbnail = { ...files.siteThumbnail }
            let getImg = await cloudinary?.v2?.uploader.upload(req.body.siteThumbnail?.tempFilePath, { folder: 'portfolio/projects' }, (err,) => { if (err) throw err })
            req.body.siteThumbnail = await getImg.url
        }
        const result = await projectsCollection.create(req.body)
        fs.rm('./tmp', { recursive: true }, (err) => { if (err) throw err })
        res.send(result)
    } catch (error) {
        res.send(error)

    }
}

module.exports.get_all_projects = async (req, res) => { 
    const { items } = req.query

    let result;
    if (items) {
        result = await projectsCollection.find().sort({ "postDate": -1 }).limit(parseInt(items));
    } else {
        result = await projectsCollection.find();
    }
    res.json(result)
}

module.exports.get_a_project = async (req, res) => {
    const quary = { _id: req.params.id }
    const result = await projectsCollection.findOne(quary)
    res.send(result)
}
module.exports.delete_a_project = async (req, res) => {

    let find = await projectsCollection.find({ _id: req.params.id });
    let images = Object.keys(find[0]).filter(key => key.match('siteScreenShort'))
    images.unshift('siteThumbnail')
    images.forEach(value => cloudinary.v2.uploader.destroy("portfolio/projects/" + find[0][value]?.split('/')[9]?.split('.')[0], (error, result) => console.log("p.c 51", result, error)))
    const result = await projectsCollection.deleteOne({ _id: req.params.id })
    res.json(result)
}
module.exports.update_a_project = async (req, res) => {
    let files = req.files;
    if (files) {
        req.body.siteThumbnail = { ...files.siteThumbnail }
        req.body.siteThumbnail = (await cloudinary.v2.uploader.upload(req.body.siteThumbnail.tempFilePath, { folder: 'portfolio/projects' }, (err, res) => res?.url)).url
        console.log(req.body)
    }
    Object.getOwnPropertyNames(req.body).map(value => value.includes('old') ? cloudinary.v2.uploader.destroy("portfolio/projects/" + req.body[value].split('/')[9]?.split('.')[0], (error, result) => console.log("p.c 64", result)) : ' ');
    delete req.body._id
    req.body.lastModified = new Date();
    const result = await projectsCollection.updateOne({ _id: req.params.id }, { $set: req.body }, { multi: true }).then((res) => console.log(res))
    console.log(result)
    res.json(result);
}