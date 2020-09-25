'use strict';
module.exports = (sequelize, DataTypes) => {
    const MatchParticipant = sequelize.define(
        'MatchParticipant',
        {
            cid: DataTypes.INTEGER,
            team_id: DataTypes.INTEGER,
            participant_uuid: DataTypes.STRING
        },
        {}
    );
    MatchParticipant.associate = function(models) {
        MatchParticipant.belongsTo(models.Match, {
            foreignKey: 'match_id'
        });
    };
    return MatchParticipant;
};
