const { registerUser } = require('../models/registeration.model');
const Worker = require('../models/worker.model');
const Company = require('../models/company.model');

exports.getUser = async (req, res, next) => {
    const email = req.query.email;
    try {

        // Search for the user in the worker collection
        const user = await registerUser.findOne({ email: email }).exec();

        // If the user is found in the worker collection, return it
        if (user) {
            res.status(200).json(user);
            return;
        }
        res.status(404).json({ message: "User not found" });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.registerUser = async (req, res, next) => {
    const user_type = req.query.user_type;
  
    const registration_data = {
      user_type: user_type,
      profile_complete: true
    };
  
    try {
      let user;
  
      if (user_type === 'worker') {
        user = await Worker.create(req.body);
      } else if (user_type === 'company') {
        user = await Company.create(req.body);
      } else {
        return res.status(400).json({ message: 'Invalid user_type' });
      }
  
      // Set the discriminator field in the registrationschema
      await registerUser.findOneAndUpdate(
        { email: req.body.email },
        { $set: registration_data }
      ).exec();
  
      res.status(200).json({ message: 'User registered successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };
  