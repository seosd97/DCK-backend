'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('TeamHistories', 'towerKills', Sequelize.INTEGER),
            queryInterface.addColumn('TeamHistories', 'inhibitorKills', Sequelize.INTEGER),
            queryInterface.addColumn('TeamHistories', 'dragonKills', Sequelize.INTEGER),
            queryInterface.addColumn('TeamHistories', 'riftHeraldKills', Sequelize.INTEGER),
            queryInterface.addColumn('TeamHistories', 'baronKills', Sequelize.INTEGER),
            queryInterface.addColumn('TeamHistories', 'teamKills', Sequelize.INTEGER),
            queryInterface.addColumn('TeamHistories', 'teamDeath', Sequelize.INTEGER),
            queryInterface.addColumn('TeamHistories', 'teamAssists', Sequelize.INTEGER)
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('TeamHistories', 'towerKills'),
            queryInterface.removeColumn('TeamHistories', 'inhibitorKills'),
            queryInterface.removeColumn('TeamHistories', 'dragonKills'),
            queryInterface.removeColumn('TeamHistories', 'riftHeraldKills'),
            queryInterface.removeColumn('TeamHistories', 'baronKills'),
            queryInterface.removeColumn('TeamHistories', 'teamKills'),
            queryInterface.removeColumn('TeamHistories', 'teamDeath'),
            queryInterface.removeColumn('TeamHistories', 'teamAssists')
        ]);
    }
};
