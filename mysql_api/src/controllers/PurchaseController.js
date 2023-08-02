const database = require("../database/db");
const dotenv = require("dotenv");

const Purchase = require("../modules/entities/Purchase");

module.exports = {
  async getPurchaseById(req, res) {
    try {
      const purchase = await Purchase.findByPk(req.params.purchaseId);

      if (purchase) {
        return res.status(200).json({
          purchase_id: purchase.purchase_id,
          brand_name: purchase.brand_name,
          price: purchase.price,
          weight_grams: purchase.weight_grams,
          instant: purchase.instant,
        });
      } else {
        console.log("Purchase not found");
        return res.status(404).json({ msg: "Purchase not found" });
      }
    } catch (err) {
      console.error("Error fetching purchase by ID:", err);
      return res.status(500).json({ msg: "An unexpected error occurred" });
    }
  },

  async getAll(req, res) {
    try {
      const allPurchase = await Purchase.findAll();
      res.status(200).json(allPurchase);
    } catch (err) {
      console.error("Error fetching all purchases:", err);
      return res.status(500).json({ msg: "An unexpected error occurred" });
    }
  },

  async deletePurchaseById(req, res) {
    try {
      const purchase = await Purchase.findByPk(req.params.purchaseId);

      if (purchase) {
        await purchase.destroy();
        return res.status(200).json({ msg: "Deleted with success" });
      } else {
        console.log("Purchase not found");
        return res.status(404).json({ msg: "Purchase not found" });
      }
    } catch (err) {
      console.error("Error deleting purchase by ID:", err);
      return res.status(500).json({ msg: "An unexpected error occurred" });
    }
  },

  async updatePurchaseById(req, res) {
    try {
      const oldPurchase = await Purchase.findByPk(req.params.purchaseId);

      if (oldPurchase) {
        const newPurchase = {
          brand_name: req.body.brand_name,
          price: req.body.price,
          weight_grams: req.body.weight_grams,
          instant: req.body.instant,
        };
        await oldPurchase.update(newPurchase, {
          where: { purchase_id: req.params.purchaseId },
        });
        return res.status(200).json({
          msg: "Purchase updated with success!",
        });
      } else {
        console.log("Purchase not found");
        return res.status(404).json({ msg: "Purchase not found" });
      }
    } catch (err) {
      console.error("Error updating purchase by ID:", err);
      return res.status(500).json({ msg: "An unexpected error occurred" });
    }
  },

  async createPurchase(req, res) {
    try {
      if (!req.body.brand_name || !req.body.price || !req.body.weight_grams) {
        console.log("Required fields are missing");
        return res.status(400).json({ msg: "Required fields are missing" });
      }

      if (isNaN(req.body.price) || isNaN(req.body.weight_grams)) {
        console.error("Error creating purchase body fields are Nan[2]:", err);
        return res.status(500).json({ msg: "Required fields are NaN" });
      }

      if (req.body.price < 0 || req.body.weight_grams < 0) {
        console.error(
          "Error creating purchase body fields are negative [2]:",
          err
        );
        return res.status(500).json({ msg: "Required fields are negatives" });
      }

      let instantReq;
      if (req.body.instant) {
        instantReq = new Date(req.body.instant);
      } else {
        instantReq = new Date();
      }

      const purchase = {
        brand_name: req.body.brand_name,
        price: req.body.price,
        weight_grams: req.body.weight_grams,
        instant: instantReq,
      };
      console.log(purchase);

      await Purchase.create(purchase);
      return res.status(200).json({
        msg: "Purchase created with success!",
      });
    } catch (err) {
      console.error("Error creating purchase:", err);
      return res.status(500).json({ msg: "An unexpected error occurred" });
    }
  },
};
