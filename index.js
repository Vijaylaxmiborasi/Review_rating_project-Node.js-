const dotenv = require('dotenv')
dotenv.config()

require('./models/config')
const express = require('express')
const bodyParser = require('body-parser');
const router = require('./Routes/commonRoutes')

const app = express()
// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = app.listen(process.env.PORT, function (req, res) {
    console.log(`server is running on port no:${process.env.PORT}`);
})
app.use('/', router)
module.exports = server
