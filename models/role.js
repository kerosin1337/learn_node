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
        }
    };
    Role.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Role',
    });
    Role.associate((models) => {
        Role.belongsToMany(models.User, {
            foreignKey: 'role_id',
            through: models.UserRole,
            as: 'users',
        });
        Role.belongsToMany(models.User, {
            through: models.UserRole,
            as: 'users',
            foreignKey: 'role_id',
            otherKey: 'user_id'
        })
    })
    return Role;
};
