'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    User.associate = (models) => {
        User.hasMany(models.Post, {
            foreignKey: 'author_id',
            as: 'posts'
        })
        User.belongsToMany(models.Role, {
            through: models.UserRole,
            as: 'roles',
            foreignKey: 'user_id',
            otherKey: 'role_id'
        })
    }
    return User;
};

