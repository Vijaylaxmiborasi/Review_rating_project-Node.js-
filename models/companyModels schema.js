const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    foundedOn: {
        type: Date,
        required: true
    },
    companyLogo : {
        type : String
    },
    companyRating : {
        type: String,
        required: true,
        default : 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
})

companySchema.set('timestamps', true)
module.exports = mongoose.model('company', companySchema)
