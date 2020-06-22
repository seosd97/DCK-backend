'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Summoners', 'profile_icon_id', Sequelize.INTEGER);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Summoners', 'profile_icon_id');
    }
};
