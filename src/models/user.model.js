const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  unit: { type: String },
  street: { type: String },
  state: { type: String },
  postcode: { type: String },
  country: { type: String }
});

const workerSchema = new mongoose.Schema({
  address: { type: addressSchema },
  created_at: { type: Date },
  dob: { type: Date },
  email: { required: true, type: String, unique: true },
  email_verified: { type: Boolean },
  email_verified_at: { type: Date },
  firstName: { required: true, type: String },
  gender: { type: String },
  middleName: { type: String },
  nationality: { type: String },
  profile_image: { type: String },
  profile_complete: { type: Boolean, default: false },
  updated_at: { type: Date, default: new Date },
});

const companySchema = new mongoose.Schema({
  address: { type: addressSchema },
  created_at: { type: Date },
  email: { required: true, type: String, unique: true },
  email_verified: { type: Boolean },
  email_verified_at: { type: Date },
  profile_complete: { type: Boolean, default: false },
  profile_image: { type: String },
  updated_at: { type: Date, default: new Date },
});

const User = mongoose.model("workabus_users", mongoose.Schema({}), "workabus_users");

function getUserModel(user_type) {
  if (user_type === "worker") {
    return mongoose.model("Worker", workerSchema);
  } else if (user_type === "company") {
    return mongoose.model("Company", companySchema);
  } else {
    throw new Error("Invalid user_type");
  }
}

module.exports = {
  User,
  getUserModel,
};
