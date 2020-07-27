'use strict';
module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define(
        'Team',
        {
            name: DataTypes.STRING,
            prize: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {}
    );
    Team.associate = function(models) {
        Team.hasMany(models.TeamHistory);
        Team.belongsToMany(models.Summoner, { through: 'SummonerTeams' });
        Team.belongsTo(models.Tournament, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Team;
};
