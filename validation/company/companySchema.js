const joi = require('joi')

const companySchema = {
    registerCompany: joi.object({
        companyName: joi.string().required(),
        location: joi.string().required(),
        city: joi.string().required(),
        foundedOn: joi.date().required()

    }).unknown(true)
}

module.exports = companySchema
