const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const db = require('../util/database')

const expense = db.define('daily', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    catagory: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: Sequelize.STRING
})

module.exports = expense;