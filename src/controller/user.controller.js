const { default: mongoose } = require('mongoose');
const { getUserModel } = require('../models/user.model');

exports.getUser = async (req, res, next) => {
    const email = req.query.email;
    console.log(email);
    const workerModel = getUserModel("worker");
    const companyModel = getUserModel("company");

    try {

        // Search for the user in the worker collection
        const worker = await workerModel.findOne({ email: email }).exec();

        // If the user is found in the worker collection, return it
        if (worker) {
            res.status(200).json(worker);
            return;
        }

        // If the user is not found in the worker collection, search in the company collection
        const company = await companyModel.findOne({ email: email }).exec();

        // If the user is found in the company collection, return it
        if (company) {
            res.status(200).json(company);
            return;
        }

        // If the user is not found in either collection, return a custom error response
        res.status(404).json({ message: "User not found" });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
