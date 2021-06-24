const db = require('../util/database');
const Sequelize = require('sequelize');

const order = db.define('order',{
     ID: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
     },
     paymentId: Sequelize.STRING,
     orderId: Sequelize.STRING,
     status: Sequelize.STRING
})

module.exports = order;