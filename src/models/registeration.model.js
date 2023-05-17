const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    created_at: { type: Date },
    email: { required: true, type: String, unique: true },
    email_verified: { type: Boolean },
    email_verified_at: { type: Date },
    profile_complete: { type: Boolean, default: false },
    profile_image: { type: String },
    updated_at: { type: Date, default: new Date },
    user_type: { type: String },
  },
  { collection: "workabus_users" } // Specify the collection name here
);

const registerUser = mongoose.model("registerUser", registrationSchema);

module.exports = { registerUser };