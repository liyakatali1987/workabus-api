const mongoose = require("mongoose");
// const userModel = require("./models/temp.model");
const dbConnect = require("./db");
const { getUserModel } = require("./models/registeration.model");

dbConnect.dbConnect();

const migrateData = async () => {
  try {
    // Fetch all documents from the userModel
    
    const UserModel = getUserModel('worker');
    const users = await UserModel.find();
    for (const user of users) {
      // Transform user data according to the new schema
      const transformedData = {
        address: {
          unit: user.unit,
          street: user.street,
          state: user.state,
          postcode: user.postcode,
          country: user.country,
        },
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
        user_type: user.user_type,
      };

      // Get the appropriate model based on user_type
      

      // Create a new instance of the model with the transformed data
      const newUser = new UserModel(transformedData);

      // Save the new instance to the collection associated with the new schema
      await newUser.save();
    }

    console.log("Migration completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
};

migrateData();
