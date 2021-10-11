'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        maxLength: 128,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        maxLength: 128
      },
      createdAt: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: new Date(),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
