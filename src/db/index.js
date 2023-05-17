const mongoose =  require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.Promise = global.Promise;
const dbString = process.env.DATABASE_URL;

exports.dbConnect = () => {
  mongoose.connection.once("open", () => {
    console.log("DB connection")
  });
  
  try{
    return mongoose.connect(
      `${dbString}?retryWrites=true&w=majority`,
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }catch(e){
    console.log("Error connecting");
  }

};
