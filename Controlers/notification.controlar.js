const { notificationCollection } = require("../Connections/mongodb.client")


module.exports.post_notification = async (req, res) => {
    try {
        req.body.from = 'Contact Form'
        req.body.postDate = new Date()
        const send = await notificationCollection.create(req.body)
        if (send._id) {
            res.status(200).send(send)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports.get_notification = async (req, res) => {
    try {
        const send = await notificationCollection.find({}).sort({ postDate: -1 })
        res.status(200).send(send)

    } catch (error) {
        res.status(404).send(error)
    }
}