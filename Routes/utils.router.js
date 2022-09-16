const express = require('express')
const { post_utils,get_utils } = require('../Controlers/utils.controlar')
const utilsRouter = express.Router()

utilsRouter.post(`/`,post_utils)
utilsRouter.get(`/`,get_utils)
// utilsRouter.get(`/:id`,)
// utilsRouter.delete(`/:id`,)
// utilsRouter.put(`/:id`,)

module.exports = utilsRouter