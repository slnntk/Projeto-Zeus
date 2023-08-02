// Quando estiver configurando o CRUD, será aqui que configurarei a rota das requisições,
// Importa o modulo Express (Biblioteca);
const { Router } = require("express");
// Importa da Biblioteca Express o modulo Router;
const router = Router();

// Routes

router.use("/", require("./UserRoutes"));
router.use("/", require("./PurchaseRoutes"));

// Exporta o objeto router como um módulo para uso;
module.exports = router;
