'use strict';
module.exports = (sequelize, DataTypes) => {
    const MatchParticipant = sequelize.define(
        'MatchParticipant',
        {
            participant_id: {
                type: DataTypes.STRING,
                references: {
                    model: 'Summoners',
                    key: 'uuid'
                }
            },
            cid: DataTypes.INTEGER,
            team_id: DataTypes.INTEGER
        },
        {}
    );
    MatchParticipant.associate = function(models) {
        MatchParticipant.hasOne(models.SummonerHistory, {
            as: 'stat'
        });

        MatchParticipant.belongsTo(models.Match, {
            onDelete: 'CASCADE',
            foriegnKey: {
                name: 'match_id',
                allowNull: false
            }
        });
    };
    return MatchParticipant;
};
