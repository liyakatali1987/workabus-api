const mongoose = require('mongoose');
const { registerUser } = require('../models/registeration.model');
const { Worker } = require('../models/worker.model');
const { Company } = require('../models/company.model');

exports.getUser = async (req, res, next) => {
    const email = req.query.email;
    try {

        const user = await registerUser.findOne({ email: email }).exec();
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

exports.registration = async (req, res, next) => {
    const user_type = req.query.user_type;
    const filter = { email: req.body.email };
    const options = { upsert: true, new: true };
    const registration_data = {
        profile_complete: true,
        user_type: user_type
    };
   
    const payload = { ...req.body, ...registration_data };
    
    try {
        const existingUser = await Worker.findOne({ email: req.body.email });
        if (existingUser) {
            // update the existing user with the new data
            console.log(existingUser)
            const worker = new Worker(payload);
            await Worker.findOneAndUpdate(filter, payload, options);
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            console.log('sfjhsfhkj')
            // create a new user with the given data
            const worker = new Worker(payload);
            await worker.save();
            return res.status(200).json({ success: 'User created successfully' });
        }
    } catch (err) {
            return res.status(500).json({ error: 'Internal server error' })
    }
};

  








