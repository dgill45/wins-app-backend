const { sequelize } = require('../database');
const User = require('./User');
const Task = require('./Task');
const Message = require('./Message');
const Accountability = require('./Accountability'); // If you have this model

// Define associations
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Message, { foreignKey: 'senderId' });
User.hasMany(Message, { foreignKey: 'receiverId' });
Message.belongsTo(User, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'receiverId' });

User.belongsToMany(User, { through: Accountability, as: 'Partners', foreignKey: 'userId', otherKey: 'partnerId' });

// Sync models (optional for development)
sequelize.sync({ force: false })
    .then(() => console.log('✅ Database synced successfully!'))
    .catch((error) => console.error('❌ Database sync failed:', error));

module.exports = { sequelize, User, Task, Message, Accountability };
