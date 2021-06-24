const Sequelize = require('sequelize');
const db = require('../util/database');

const year = db.define('year',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    month: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Expense: Sequelize.INTEGER, 
    Income: Sequelize.INTEGER
});

module.exports = year;