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
        console.log(error)
    }
}