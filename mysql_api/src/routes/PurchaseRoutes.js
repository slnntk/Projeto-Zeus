const PurchaseController = require("../controllers/PurchaseController");
const { Router } = require("express");
const router = Router();

// ---- PURCHASES ----/
router.get("/purchases/:purchaseId", PurchaseController.getPurchaseById);
router.get("/purchases/", PurchaseController.getAll);
router.post("/purchases/", PurchaseController.createPurchase);
router.delete("/purchases/:purchaseId", PurchaseController.deletePurchaseById);
router.put("/purchases/:purchaseId", PurchaseController.updatePurchaseById);

module.exports = router;
