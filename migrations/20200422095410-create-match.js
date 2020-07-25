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
            type: Sequelize.STRING,
            round: Sequelize.INTEGER,
            game_id: Sequelize.BIGINT,
            duration: {
                type: Sequelize.BIGINT,
                defaultValue: 0
            },
            game_creation: {
                type: Sequelize.BIGINT,
                defaultValue: 0
            },
            game_version: Sequelize.STRING,
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
