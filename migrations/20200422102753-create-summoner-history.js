'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('SummonerHistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cid: {
                type: Sequelize.INTEGER
            },
            spell1_id: {
                type: Sequelize.INTEGER
            },
            spell2_id: {
                type: Sequelize.INTEGER
            },
            kill: {
                type: Sequelize.INTEGER
            },
            death: {
                type: Sequelize.INTEGER
            },
            assist: {
                type: Sequelize.INTEGER
            },
            total_dmg_dealt: {
                type: Sequelize.INTEGER
            },
            champion_level: {
                type: Sequelize.INTEGER
            },
            role: {
                type: Sequelize.STRING
            },
            win: {
                type: Sequelize.BOOLEAN
            },
            camp_id: {
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable('SummonerHistories');
    }
};
