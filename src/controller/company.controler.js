const Company = require('../models/company.models')

exports.getCompany = (async (req, res) => {    
    const email = req.query.email
    try {
        const company = await Company.findOne({ email: email })
        res.status(200).json(company)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
});

exports.createCompany = (async (req, res) => {
    try {
        const companyData = req.body
        const company = new Company(companyData)         
        const savedCompany = await company.save()
        console.log(savedCompany)
        res.status(201).json(savedCompany)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
})