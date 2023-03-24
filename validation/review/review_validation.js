const review = require("../review/reviewSchema")

const createReviewValidation = async (req, res, next) => {
    const value = await review.createReview.validate(req.body, {
        abortEarly: false,
    })
    if (value.error) {
        res.status(500).send({
            success: 0,
            message: value.error.details[0].message,
        })
    }
    else {
        next()
    }
}

const editReviewValidation = async(req, res, next)=>{
    const value = await review.editReview.validate(req.body,
        {
            abortEarly: false
        })
        if(value.error){
            res.status(500).send({
                success : 0,
                message : value.error.details[0].message
            })
        }
        else{
            next()
        }
}

module.exports = {
    createReviewValidation,
    editReviewValidation
}

