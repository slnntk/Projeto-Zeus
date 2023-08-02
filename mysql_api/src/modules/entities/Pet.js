const { Sequelize }  = require('sequelize');
const database = require('../../database/db');

const Pet = database.define('pet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalAmount:{
        type: Sequelize.DOUBLE,
        allowNull: true
    }
})

module.exports = Pet;