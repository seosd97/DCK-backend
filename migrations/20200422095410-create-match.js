'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Matches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING
            },
            gid: {
                type: Sequelize.BIGINT
            },
            duration: {
                type: Sequelize.INTEGER
            },
            creation_time: {
                type: Sequelize.BIGINT
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
        return queryInterface.dropTable('Matches');
    }
};
