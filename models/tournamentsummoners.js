'use strict';
module.exports = (sequelize, DataTypes) => {
    const TournamentSummoners = sequelize.define(
        'TournamentSummoners',
        {
            tournament_code: {
                type: DataTypes.STRING,
                references: {
                    model: 'Tournaments',
                    key: 'id'
                }
            },
            summoner_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Summoners',
                    key: 'id'
                }
            }
        },
        {}
    );
    TournamentSummoners.associate = function(models) {};
    return TournamentSummoners;
};
