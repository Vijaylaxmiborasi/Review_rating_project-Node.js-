const express = require('express')
const routes = express.Router();
const validation = require('../validation/review/review_validation')
const reviewController = require('../controllers/reviewController')
const auth = require('../middlewares/auth_middleware');

routes.post('/add_review/',validation.createReviewValidation, reviewController.addReview)
routes.patch('/edit_review/:id',validation.editReviewValidation,reviewController.editReview)
routes.delete('/delete_review/:id',reviewController.deleteReview)
routes.get('/list_review',reviewController.listReview)
routes.get('/detail_review/:_id',reviewController.detailReview)

module.exports = routes