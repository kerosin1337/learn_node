'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserRole.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            })
            UserRole.belongsTo(models.Role, {
                foreignKey: 'role_id',
                as: 'role',
            })
        }
    };
    UserRole.init({
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'User',
                    key: 'id',
                },
                onDelete: true
            },
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'Role',
                    key: 'id',
                },
                onDelete: 'CASCADE'
            },
        },
    }, {
        sequelize,
        modelName: 'UserRole',
    });
    return UserRole;
};
