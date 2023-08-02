// Serve para configurar o arquivo do server (properties.env).

// dotenv serve para conseguir ler o arquivo a partir do caminho dele.
require("dotenv").config({ path: "properties.env" });
const express = require("express");

// Especificação da W3C para poder trabalhar com API,
// permitindo acessos a recursos de outros sites,
// mesmo estando em dominios diferentes.
const cors = require("cors");

// Modulo capaz de converter o modulo em vários outros formatos.
const bodyParser = require("body-parser");

// Essa const é eu mostrando para o servidor onde estão as rotas.
const routes = require("./routes/routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

// Importar o perfil de teste.
const testConfig = require("../src/config/testConfig");

// Importar os Users do perfil de teste.
const { popularBancoDeDadosUser } = require("../src/config/testConfig");
popularBancoDeDadosUser();
// Importar as Compras do perfil de teste.
const { popularBancoDeDadosPurchase } = require("../src/config/testConfig");
const { json } = require("body-parser");
popularBancoDeDadosPurchase();

// Prefixo, para que todos os endereços das minhas rotas tenham essa prefixo.
//app.use('/api', routes);



app.listen(3000, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
  const database = require("../src/database/db");
  const User = require("./modules/entities/User");
  const Pet = require("./modules/entities/Pet");
  const Purchase = require("./modules/entities/Purchase");
  database.sync();
});
