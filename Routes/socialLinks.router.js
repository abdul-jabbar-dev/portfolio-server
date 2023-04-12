const express = require('express')
const { post_socialLinks, get_socialLinks, delete_socialLinks, update_socialLinks, get_a_socialLinks } = require('../Controlers/socialLinks.controlar')
const socialLinksRouter = express.Router()

socialLinksRouter.post(`/`, post_socialLinks)
socialLinksRouter.get(`/`, get_socialLinks)
socialLinksRouter.get(`/:id`, get_a_socialLinks)
socialLinksRouter.delete(`/:id`, delete_socialLinks)
socialLinksRouter.put(`/:id`, update_socialLinks)

module.exports = socialLinksRouter