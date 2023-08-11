const { Router } = require("express");
const { createMessage } = require("../controllers/message.controller");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

//rutas protegidas
router.post("/newMessage",
authenticate,
createMessage);

module.exports = router;