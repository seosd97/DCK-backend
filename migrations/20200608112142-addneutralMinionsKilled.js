'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'SummonerHistories',
            'neutralMinionsKilled',
            Sequelize.INTEGER
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('SummonerHistories', 'neutralMinionsKilled');
    }
};
