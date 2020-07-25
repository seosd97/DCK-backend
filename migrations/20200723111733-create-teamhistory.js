'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TeamHistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            camp_id: Sequelize.INTEGER,
            win: Sequelize.BOOLEAN,
            towerKills: Sequelize.INTEGER,
            inhibitorKills: Sequelize.INTEGER,
            dragonKills: Sequelize.INTEGER,
            riftHeraldKills: Sequelize.INTEGER,
            baronKills: Sequelize.INTEGER,
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
        return queryInterface.dropTable('TeamHistories');
    }
};
