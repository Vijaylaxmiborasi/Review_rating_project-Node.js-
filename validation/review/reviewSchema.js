const joi = require("joi")

const schema = {
    createReview: joi.object({
        subject: joi.string().max(20).required(),
        review: joi.string().max(300).required(),
        rating: joi.number().required()

    }).unknown(true),
    editReview: joi.object({
        subject: joi.string().max(20),
        review: joi.string().max(300),
        rating: joi.number()

    }).unknown(true)
}


module.exports = schema