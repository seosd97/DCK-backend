'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Summoners', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            uuid: {
                type: Sequelize.STRING,
                unique: true,
                primaryKey: true
            },
            account_id: Sequelize.STRING,
            name: Sequelize.STRING,
            profile_icon_id: Sequelize.INTEGER,
            revision_date: Sequelize.BIGINT,
            summoner_level: Sequelize.INTEGER,
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
        return queryInterface.dropTable('Summoners');
    }
};
