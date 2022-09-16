const express = require('express')
const { post_notification, get_notification } = require('../Controlers/notification.controlar')

const notificationRouter = express.Router()

notificationRouter.post(`/`, post_notification)
notificationRouter.get(`/`, get_notification)
// notificationRouter.get(`/:id`,)
// notificationRouter.delete(`/:id`,)
// notificationRouter.put(`/:id`,)

module.exports = notificationRouter