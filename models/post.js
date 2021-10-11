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
            // define association here
        }
    };
    Post.init({
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'User',
                    onDelete: true
                },
                key: 'id',
            },
        },
        title: DataTypes.STRING,
        body: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Post',
    });
    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' })
    }
    return Post;
};
