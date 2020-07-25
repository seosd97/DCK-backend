'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Tournaments',
            [
                {
                    id: 1,
                    name: 'DCK Season 1',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    name: 'DCK Season 2',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    name: 'DCK Season 3',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Tournaments', null, {});
    }
};
