const express = require('express')
const routes = express.Router();
const companyController = require('../controllers/companyController')
const validation = require('../validation/company/company_validation')
const { upload } = require('../middlewares/imageStorage');
 

routes.post('/add/:id', upload.single('companyLogo'), companyController.addCompany)
routes.get('/get_company',companyController.getCompany)
routes.get('/get_details/:id',companyController.companyReviewcomment)
routes.get('/get_city', companyController.searchCompany)


module.exports = routes;
