const { Router } = require("express");
const {
createConversations,
deleteConversation,
getConversationById,
getAllConversationByUserId } = require("../controllers/conversation.controllers");
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

//Crear conversación ✅
router.post("/conversation",
authenticate,
createConversations);

//Obtener una conversacion por ID
router.get("/conversation/:id",
authenticate,
getConversationById);

//Obtener las conversaciones en las que participa un usuario ✅
router.get("/conversations-user/:id",
authenticate,
getAllConversationByUserId);

//Eliminar conversacion ✅
router.delete("/conversation/:id", deleteConversation)

module.exports = router;