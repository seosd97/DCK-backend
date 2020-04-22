'use strict';
module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define(
        'Match',
        {
            type: DataTypes.STRING,
            gid: DataTypes.BIGINT,
            duration: DataTypes.INTEGER,
            creation_time: DataTypes.BIGINT
        },
        {}
    );
    Match.associate = function(models) {
        Match.hasMany(models.BanHistory);
        Match.belongsToMany(models.Team, { through: 'MatchTeams' });
        Match.belongsToMany(models.Summoner, { through: 'MatchSummoners' });
        Match.belongsTo(models.TournamentGroup, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Match;
};
