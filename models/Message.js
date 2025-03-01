const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database').sequelize;
const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    taskId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = Message;