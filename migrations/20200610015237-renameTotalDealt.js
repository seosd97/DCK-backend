'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'SummonerHistories',
            'total_dmg_dealt',
            'totalDamageDealt'
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'SummonerHistories',
            'totalDamageDealt',
            'total_dmg_dealt'
        );
    }
};
