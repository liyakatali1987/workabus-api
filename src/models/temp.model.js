const mongoose =  require("mongoose");

const userSchema = new mongoose.Schema({
  name: { required: true, type: String },
  email: { required: true, type: String, unique: true},
  email_verified_at: { type: Date },
  profile_image: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
  age: { type: Number}
});


module.exports = mongoose.model("workabus_users", userSchema);