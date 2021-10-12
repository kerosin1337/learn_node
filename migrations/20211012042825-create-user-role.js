'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserRoles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Users',
                        onDelete: true
                    },
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE'
            },
            role_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Roles',
                    },
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('UserRoles');
    }
};
