const express = require('express')
const { post_projects, get_all_projects, get_a_project, delete_a_project, update_a_project } = require('../Controlers/projects.controlar')
const projectsRouter = express.Router()

projectsRouter.post(`/`, post_projects)
projectsRouter.get(`/`, get_all_projects)
projectsRouter.get(`/:id`, get_a_project)
projectsRouter.delete(`/:id`, delete_a_project)
projectsRouter.put(`/:id`, update_a_project)

module.exports = projectsRouter