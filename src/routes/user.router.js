const express =  require('express');
const UserController =  require('../controller/user.controller.js');


const router = express.Router();
router.get("/getUser", UserController.getUser);

module.exports = router;