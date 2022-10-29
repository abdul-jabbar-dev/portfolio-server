const { socialLinksCollection } = require("../Connections/mongodb.client")

module.exports.post_socialLinks = async (req, res) => {
    const send = await socialLinksCollection.create(req.body)
    if (send._id) {
        res.status(200).send(send)
    }
}

module.exports.get_socialLinks = async (req, res) => {
    try {
        const send = await socialLinksCollection.find({})
        res.send(send)
    } catch (error) {
        res.send(error)
    }
}
module.exports.delete_socialLinks = async (req, res) => {
    try {
        const send = await socialLinksCollection.deleteOne({ _id: req.params.id })
        res.send(send)
    } catch (error) {
        res.send(error)
    }
}
module.exports.update_socialLinks = async (req, res) => {
    try {
        const send = await socialLinksCollection.updateOne({ _id: req.params.id }, { $set: req.body }, { multi: true })
        res.send(send)
    } catch (error) {
        res.send(error)
    }
}
module.exports.get_a_socialLinks = async (req, res) => {
    try {
        const send = await socialLinksCollection.findOne({ _id: req.params.id })
        res.send(send)
    } catch (error) {
        res.send(error)
    }
}