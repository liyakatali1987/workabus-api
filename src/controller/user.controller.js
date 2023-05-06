const userModel = require('../models/user.model');

exports.getUser = async(req, res, next) => {
    const email = req.query.email;
    try {
        const user = await userModel.findOne({ email: email });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
