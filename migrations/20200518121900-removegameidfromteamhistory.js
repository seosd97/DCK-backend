'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('TeamHistories', 'match_id');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('TeamHistories', 'match_id', Sequelize.BIGINT);
    }
};
