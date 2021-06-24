const express = require('express');
const router = express.Router();
const p = require('../util/database')
const expense = require('../models/expense');

const expenseController = require('../controller/expense');
const userController = require('../controller/user');
// router.get((req,res) => {
//      expense.findAll().then(data => console.log('hello'))
//      .catch(err => console.log(err));
// })
router.get('/user', userController.getUser)
// router.get('/expense', expenseController.getExpense);

router.get('/:month', expenseController.getMonth);

router.get('/last/:year', expenseController.getYear);

router.post('/expense', userController.authenticated, expenseController.postData);

router.get('/day/:date', userController.authenticated, expenseController.getDay);

router.get('/max/user', userController.authenticated, expenseController.getMax);

module.exports = router;