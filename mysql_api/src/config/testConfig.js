const User = require("../modules/entities/User");
const database = require("../database/db");
const Purchase = require("../modules/entities/Purchase");

module.exports = {
  // Popular usuarios.

  async popularBancoDeDadosUser() {
    try {
      const existingUser = await User.findOne({
        where: { email: "felipe@example.com" },
      });

      if (existingUser) {
        console.log("Usuário já existe no banco de dados.");
      } else {
        await User.create({
          name: "Felipe",
          email: "felipe@example.com",
          password: "123456",
        });
        console.log("Dados do usuário inseridos no banco de dados.");
      }
    } catch (error) {
      console.error("Erro ao popular o banco de dados:", error);
    }
  },

  // Popular compras.

  async popularBancoDeDadosPurchase() {
    try {
      // Array com os dados das compras
      const purchasesData = [
        {
          brand_name: "Brand 1",
          price: 10.99,
          weight_grams: 500,
          instant: new Date(),
        },
        {
          brand_name: "Brand 2",
          price: 15.99,
          weight_grams: 750,
          instant: new Date(),
        },
        // Adicione os dados das outras compras aqui...
      ];

      // Verificar se as compras já existem no banco de dados
      for (const purchaseData of purchasesData) {
        const existingPurchase = await Purchase.findOne({
          where: { brand_name: purchaseData.brand_name },
        });

        if (existingPurchase) {
          console.log(
            `Compra '${purchaseData.brand_name}' já existe no banco de dados.`
          );
        } else {
          await Purchase.create(purchaseData);
          console.log(
            `Compra '${purchaseData.brand_name}' criada com sucesso.`
          );
        }
      }

      console.log("Compras populadas no banco de dados com sucesso!");
    } catch (error) {
      console.error("Erro ao popular compras:", error);
    }
  },
};
