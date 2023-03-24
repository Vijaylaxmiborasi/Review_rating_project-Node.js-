const express = require('express')
const routes = express.Router()
const companyRoute = require('../Routes/companyRoutes')
const userRoute = require('../Routes/userRoute')
const reviewRoute = require('./reviewRoutes')


routes.use('/user', userRoute)
routes.use('/company', companyRoute)
routes.use('/review', reviewRoute)

module.exports = routes;