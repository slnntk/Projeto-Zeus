const UserController = require("../controllers/UserController");
const { Router } = require("express");
const router = Router();

router.get("/users/:userId", UserController.getUser);

module.exports = router;
