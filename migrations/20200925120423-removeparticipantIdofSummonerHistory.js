'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('SummonerHistories', 'participantId');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('SummonerHistories', 'participantId', Sequelize.INTEGER);
    }
};
