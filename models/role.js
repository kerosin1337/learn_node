'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Role.belongsToMany(models.User, {
                foreignKey: 'role_id',
                through: models.UserRole,
                as: 'role',
            });
            Role.belongsToMany(models.User, {
                through: models.UserRole,
                as: 'user',
                foreignKey: 'role_id',
                otherKey: 'user_id'
            })
        }
    };
    Role.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
};
