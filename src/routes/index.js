const userRoutes = require('./user.routes');
const conversationRoutes = require('./conversation.routes');
const messagesRoutes = require('./messages.routes');

const apiRoutes = (app) => {
    app.use(userRoutes);
    app.use(conversationRoutes);
    app.use(messagesRoutes);
}

module.exports = apiRoutes;