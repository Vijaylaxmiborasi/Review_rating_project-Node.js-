const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },  
    review: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'company'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
})

reviewSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewSchema)