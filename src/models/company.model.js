const mongoose = require("mongoose");


const companySchema = new mongoose.Schema(
  {
    companyName: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    email_verified_at: { type: Date },
    profile_image: { type: String },
    abn: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    about: { type: String },
    mobilePhone: { type: String },
    phoneNumber: { type: String },
    user_type: { type: String, required: true, default: 'company'},
  },
  { collection: "workabus_companies" }
);

const Company = mongoose.model("Company", companySchema, "workabus_companies");

module.exports = Company;
