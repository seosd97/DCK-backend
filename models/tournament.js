'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tournament = sequelize.define(
        'Tournament',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
            // tournament_code: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            //     unique: true
            // }
        },
        { underscored: true }
    );
    Tournament.associate = function(models) {
        Tournament.hasMany(models.Match, {
            // foreignKey: 'tournament_code',
            // sourceKey: 'tournament_code'
        });
        Tournament.hasMany(models.Team, {
            // foreignKey: 'tournament_code',
            // sourceKey: 'tournament_code'
        });
        Tournament.belongsToMany(models.Summoner, {
            through: 'TournamentSummoners'
            // foreignKey: 'tournament_code',
            // sourceKey: 'tournament_code'
        });
    };

    return Tournament;
};
