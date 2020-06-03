'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('SummonerHistories', 'rune0', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'rune1', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'rune2', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'rune3', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'rune4', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'rune5', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'statPerk0', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'statPerk1', Sequelize.INTEGER),
            queryInterface.addColumn('SummonerHistories', 'statPerk2', Sequelize.INTEGER)
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('SummonerHistories', 'rune0'),
            queryInterface.removeColumn('SummonerHistories', 'rune1'),
            queryInterface.removeColumn('SummonerHistories', 'rune2'),
            queryInterface.removeColumn('SummonerHistories', 'rune3'),
            queryInterface.removeColumn('SummonerHistories', 'rune4'),
            queryInterface.removeColumn('SummonerHistories', 'rune5'),
            queryInterface.removeColumn('SummonerHistories', 'statPerk0'),
            queryInterface.removeColumn('SummonerHistories', 'statPerk1'),
            queryInterface.removeColumn('SummonerHistories', 'statPerk2')
        ]);
    }
};
