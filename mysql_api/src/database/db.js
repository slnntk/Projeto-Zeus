// ---- Criando a conexão com banco de dados ---- //

const mysql = require("mysql");

// ---- Configurações e instaciação do Sequelize (ORM) ---- //

const Sequelize = require("sequelize");
const sequelize = new Sequelize("zeus_tiago", "root", "12345678", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  sync: { alter: false },
});

module.exports = sequelize;
