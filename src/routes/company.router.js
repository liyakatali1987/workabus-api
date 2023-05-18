const express =  require('express');
const companyController =  require('../controller/company.controler');

const router = express.Router();
router.get("/getCompany", companyController.getCompany);
router.post("/createCompany", companyController.createCompany);

module.exports = router;