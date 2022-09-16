const express = require('express')
const { post_socialLinks, get_socialLinks } = require('../Controlers/socialLinks.controlar')
const socialLinksRouter = express.Router()

socialLinksRouter.post(`/`, post_socialLinks)
socialLinksRouter.get(`/`, get_socialLinks)
// socialLinksRouter.get(`/:id`,)
// socialLinksRouter.delete(`/:id`,)
// socialLinksRouter.put(`/:id`,)

module.exports = socialLinksRouter