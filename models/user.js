'use strict';
const {
        Model
    } = require('sequelize'),
    bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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

        async validPassword(password) {
            return await bcrypt.compare(password, this.password);
        }

    };
    User.init({
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [3, 30],
            }
        },
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
    });
    return User;
}
;

