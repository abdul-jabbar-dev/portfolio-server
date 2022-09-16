const { notificationCollection } = require("../Connections/mongodb.client")


module.exports.post_notification = async (req, res) => {
    try {
        req.body.from = 'Contact Form'
        req.body.postDate = new Date()
        console.log(req.body)
        const send = await notificationCollection.create(req.body)
        if (send._id) {
            res.status(200).send(send)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports.get_notification = async (req, res) => {
    const send = await notificationCollection.find({})
    if (send) {
        res.status(200).send(send)
    }
}