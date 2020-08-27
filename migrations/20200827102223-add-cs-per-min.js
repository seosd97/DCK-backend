'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('SummonerHistories', 'totalCSPerMin', {
            type: Sequelize.FLOAT,
            defaultValue: 0
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('SummonerHistories', 'totalCSPerMin');
    }
};
