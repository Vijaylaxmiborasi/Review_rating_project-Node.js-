const company = require('./companySchema')

module.exports = {
  registerCompanyValidation: async (req, res, next) => {
    const value = await company.registerCompany.validate(req.body, { abortEarly: false })
    if (value.error) {
      res.status(500).send({
        success: 0,
        message: value.error.details[0].message
      })
    }
    else {
      next()
    }
  }
}
