const mongoose = require('mongoose');
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes =  require("./routes/user.router");
const companyRoutes =  require("./routes/company.router");
const dbConnect = require("./db");

const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
dbConnect.dbConnect();
const app = express();

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//

app.use("/user", userRoutes);
app.use("/company", companyRoutes);



app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next();
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;