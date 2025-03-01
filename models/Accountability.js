const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Accountability = sequelize.define('Accountability', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    partnerId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
});

module.exports = Accountability;
