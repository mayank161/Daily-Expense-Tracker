const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
router.post('/signup',userController.postSingUp);
router.post('/login',userController.postLogin);
router.get('/user/premium',userController.authenticated,userController.premium);
router.post('/user/update',userController.update);
module.exports = router;

