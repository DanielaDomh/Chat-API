const { Conversations, Participants, Messages }  = require('../models');

//Obtener Conversacion por ID
const getConversationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversations = await Conversations.findAll({
      where: { id },
      include: [
        Participants, Messages
      ]});
    res.status(200).json({ conversations });
  } catch (error) {
    next(error);
  }
};

//Obtener conversacion de un usuario
const getAllConversationByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversations = await Conversations.findAll({
        include: [{
          model: Participants,
          where: { userId: id }}
        ]});
      res.status(200).json({ conversations });
  } catch (error) {
    next(error);
  }
};

//Crear conversacion
const createConversations = async (req, res, next) => {
try {
    //body {createdBy, participant}
    const { createdBy, participants, type } = req.body;
    const conversation = await Conversations.create({createdBy, type});
    const { id } = conversation;
    const participantsArray = participants.map((participant) => ({
      userId: participant,
      conversationId: id,
    }));
    participantsArray.push({ userId: createdBy, conversationId: id})
    await Participants.bulkCreate(participantsArray)
    res.status(201).end();
  } catch(error) {
    next(error)  }
};

//Eliminar conversacion
const deleteConversation = async (req,res,next) => {
  try {
    const { id } =req.params;
    await Conversations.destroy({ where: { id }});
    res.status(204).end();
  }catch(error){
    next(error)
  }
};

module.exports = {
    createConversations,
    deleteConversation,
    getConversationById,
    getAllConversationByUserId,
};