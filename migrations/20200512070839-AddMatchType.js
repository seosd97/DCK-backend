'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Matches', 'round', Sequelize.INTEGER),
            queryInterface.removeColumn('Matches', 'creation_time')
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Matches', 'round'),
            queryInterface.addColumn('Matches', 'creation_time', Sequelize.BIGINT)
        ]);
    }
};
