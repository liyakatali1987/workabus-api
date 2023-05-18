const Company = require('../models/company.model')
const { registerUser } = require('../models/registeration.model');
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
        // adding user_type to workabus_users
        const filter = { email: req.body.email };
        const registration_data = {
            profile_complete: true,
            user_type: "company"
        };
        const options = { upsert: true, new: true };    
        await registerUsers.findOneAndUpdate(filter, registration_data, options )
        const companyData = req.body
        const company = new Company(companyData)         
        const savedCompany = await company.save()
        console.log(savedCompany)
        res.status(201).json({ success: 'Company registered successfully'})
      } catch (error) {
        // revert user information in case of error
        await registerUsers.findOneAndUpdate(filter, {profile_complete: false}, options ) 
        res.status(400).json({ error: 'Failed to register the company' })
      }
})