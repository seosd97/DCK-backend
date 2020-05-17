'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('SummonerHistories', 'item0', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'item1', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'item2', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'item3', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'item4', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'item5', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'doubleKills', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'tripleKills', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'quadraKills', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'pentaKills', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'unrealKills', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'goldEarned', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'totalMinionsKilled', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'wardsPlaced', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'wardsKilled', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'perkPrimaryStyle', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'perkSubStyle', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'participantId', Sequelize.INTEGER)
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('SummonerHistories', 'item0'),
            queryInterface.removeColumn('SummonerHistories', 'item1'),
            queryInterface.removeColumn('SummonerHistories', 'item2'),
            queryInterface.removeColumn('SummonerHistories', 'item3'),
            queryInterface.removeColumn('SummonerHistories', 'item4'),
            queryInterface.removeColumn('SummonerHistories', 'item5'),
            queryInterface.removeColumn('SummonerHistories', 'doubleKills'),
            queryInterface.removeColumn('SummonerHistories', 'tripleKills'),
            queryInterface.removeColumn('SummonerHistories', 'quadraKills'),
            queryInterface.removeColumn('SummonerHistories', 'pentaKills'),
            queryInterface.removeColumn('SummonerHistories', 'unrealKills'),
            queryInterface.removeColumn('SummonerHistories', 'goldEarned'),
            queryInterface.removeColumn('SummonerHistories', 'totalMinionsKilled'),
            queryInterface.removeColumn('SummonerHistories', 'wardsPlaced'),
            queryInterface.removeColumn('SummonerHistories', 'wardsKilled'),
            queryInterface.removeColumn('SummonerHistories', 'perkPrimaryStyle'),
            queryInterface.removeColumn('SummonerHistories', 'perkSubStyle'),
            queryInterface.removeColumn('SummonerHistories', 'participantId')
        ]);
    }
};
