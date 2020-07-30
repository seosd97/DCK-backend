'use strict';
module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define(
        'Match',
        {
            type: DataTypes.STRING,
            round: DataTypes.INTEGER,
            game_id: DataTypes.BIGINT,
            duration: { type: DataTypes.BIGINT, defaultValue: 0 },
            game_creation: { type: DataTypes.BIGINT, defaultValue: 0 },
            game_version: DataTypes.STRING
        },
        {}
    );
    Match.associate = function(models) {
        Match.hasMany(models.TeamHistory);
        // Match.hasMany(models.SummonerHistory);
        Match.hasMany(models.MatchParticipant);

        Match.belongsTo(models.Tournament, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });

        Match.belongsTo(models.MatchGroup, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Match;
};
