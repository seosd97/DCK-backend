'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Summoners', 'tier');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Summoners', 'tier', { type: Sequelize.STRING });
    }
};
