'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post.hasOne(sequelize.models.User, {
                foreignKey: 'id'
            })
            // define association here
        }
    };
    Post.init({
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'Users',
                    onDelete: true
                },
                key: 'id',
            },
        },
        title: DataTypes.STRING,
        body: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Posts',
    });

    return Post;
};
