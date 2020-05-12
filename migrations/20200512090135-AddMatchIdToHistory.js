'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('TeamHistories', 'match_id', Sequelize.BIGINT),
            queryInterface.addColumn('SummonerHistories', 'match_id', Sequelize.BIGINT)
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('TeamHistories', 'match_id'),
            queryInterface.removeColumn('SummonerHistories', 'match_id')
        ]);
    }
};
