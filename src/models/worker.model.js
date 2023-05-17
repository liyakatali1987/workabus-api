const mongoose = require("mongoose");
const { registerUser } = require('./registeration.model');


const addressSchema = new mongoose.Schema({
    unit: { type: String },
    street: { type: String },
    state: { type: String },
    postcode: { type: String },
    country: { type: String }
});

const workerSchema = new mongoose.Schema(
    {
        address: { type: addressSchema },
        firstName: { required: true, type: String },
        dob: { type: Date },
        gender: { type: String },
        middleName: { type: String },
        nationality: { type: String },
    },
    { discriminatorKey: "user_type", collection: "workabus_workers" }
);

const Worker = registerUser.discriminator("Worker", workerSchema);

module.exports = Worker;
