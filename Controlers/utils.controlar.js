const { utilsCollection } = require("../Connections/mongodb.client")

module.exports.post_utils = async (req, res) => {
    try {
        const send = await utilsCollection.create(req.body)
        if (send._id) {
            res.status(200).send(send)
        }
    } catch (error) {
        res.send(error)
    }
}
module.exports.get_utils = async (req, res) => {
    try {
        const send = await utilsCollection.find({})
        res.send(send)
    } catch (error) {
        console.log(error)
    }
}