const { Sequelize } = require("sequelize");
const database = require("../../database/db");

const Purchase = database.define("purchase", {
  purchase_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  brand_name: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  weight_grams: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  instant: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Purchase;
