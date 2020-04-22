'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Champions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cid: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            key: {
                type: Sequelize.INTEGER
            },
            splash_img: {
                type: Sequelize.STRING
            },
            loading_img: {
                type: Sequelize.STRING
            },
            portrait_img: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Champions');
    }
};
