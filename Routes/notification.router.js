const express = require('express')
const { post_notification, get_notification, del_notification } = require('../Controlers/notification.controlar')

const notificationRouter = express.Router()

notificationRouter.post(`/`, post_notification)
notificationRouter.get(`/`, get_notification)
// notificationRouter.get(`/:id`,)
notificationRouter.delete(`/:id`,del_notification)
// notificationRouter.put(`/:id`,)

module.exports = notificationRouter