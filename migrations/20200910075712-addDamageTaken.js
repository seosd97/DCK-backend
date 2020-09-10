'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('SummonerHistories', 'totalCSPerMin'),
            queryInterface.addColumn('SummonerHistories', 'totalDamageTaken', Sequelize.INTEGER)
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('SummonerHistories', 'totalCSPerMin', {
                type: Sequelize.FLOAT,
                defaultValue: 0
            }),
            queryInterface.removeColumn('SummonerHistories', 'totalDamageTaken')
        ]);
    }
};
