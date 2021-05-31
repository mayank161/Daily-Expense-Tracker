const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenses','postgres','mayank', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize;