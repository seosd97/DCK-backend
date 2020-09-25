'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('MatchParticipants', 'participant_id', 'participant_uuid')
            // queryInterface.addColumn('MatchParticipants', 'match_id', Sequelize.BIGINT)
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('MatchParticipants', 'participant_uuid', 'participant_id')
            // queryInterface.removeColumn('MatchParticipants', 'match_id')
        ]);
    }
};
