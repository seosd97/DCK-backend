'use strict';
module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define(
        'Team',
        {
            name: DataTypes.STRING
        },
        {}
    );
    Team.associate = function(models) {
        Team.hasMany(models.TeamHistory);
        Team.hasMany(models.BanHistory);
        Team.belongsToMany(models.Summoner, { through: 'SummonerTeams' });
        Team.belongsTo(models.TournamentGroup, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Team;
};
