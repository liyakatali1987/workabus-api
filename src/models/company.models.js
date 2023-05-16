const mongoose =  require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { required: true, type: String },
  email: { required: true, type: String, unique: true},
  email_verified_at: { type: Date },
  profile_image: { type: String },
  abn: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
  about: { type: String },
  mobilePhone: { type: String },
  phoneNumber: { type: String }
});

module.exports = mongoose.model("workabus_companies", companySchema);