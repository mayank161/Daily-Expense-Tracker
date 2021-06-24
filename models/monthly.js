const Sequelize = require('sequelize');
const db = require('../util/database');

const monthly = db.define('month', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    TotalIncome: { type: Sequelize.INTEGER},
    TotalExpense:{ type: Sequelize.INTEGER},
    date: Sequelize.STRING,
    pp: Sequelize.DataTypes.DATEONLY
})

module.exports = monthly;