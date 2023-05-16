const mongoose = require("mongoose");
const userModel = require('./models/temp.model');
const dbConnect = require('./db');

// Define the addressSchema
const addressSchema = new mongoose.Schema({
  unit: { type: String },
  street: { type: String },
  state: { type: String },
  postcode: { type: String },
  country: { type: String }
});

// Define the workerSchema using the addressSchema
const workerSchema = new mongoose.Schema({
  address: { type: addressSchema },
  created_at: { type: Date },
  dob: { type: Date },
  email: { required: true, type: String, unique: true },
  email_verified: { type: Boolean },
  email_verified_at: { type: Date },
  firstName: { type: String },
  gender: { type: String },
  middleName: { type: String },
  nationality: { type: String },
  profile_image: { type: String },
  profile_complete: { type: Boolean, default: false },
  updated_at: { type: Date, default: new Date },
});

const Worker = mongoose.model("Worker", workerSchema);

dbConnect.dbConnect();

const migrateData = async () => {
  try {
    // Fetch all documents from the userModel
    const users = await userModel.find();
    // Transform and save each user as a worker in the Worker model
    for (const user of users) {
      const worker = new Worker({
        address: user.address,
        created_at: user.created_at,
        dob: user.dob,
        email: user.email,
        email_verified: user.email_verified,
        email_verified_at: user.email_verified_at,
        firstName: user.firstName,
        gender: user.gender,
        middleName: user.middleName,
        nationality: user.nationality,
        profile_image: user.profile_image,
        profile_complete: user.profile_complete,
        updated_at: user.updated_at,
      });

      await worker.save();
    }

    console.log("Migration completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

migrateData();
