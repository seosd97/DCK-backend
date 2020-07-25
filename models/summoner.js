'use strict';
module.exports = (sequelize, DataTypes) => {
    const Summoner = sequelize.define(
        'Summoner',
        {
            uuid: { type: DataTypes.STRING, unique: true, primaryKey: true },
            account_id: DataTypes.STRING,
            name: DataTypes.STRING,
            profile_icon_id: DataTypes.INTEGER,
            revision_date: DataTypes.BIGINT,
            summoner_level: DataTypes.INTEGER
        },
        { underscored: true }
    );
    Summoner.associate = function(models) {
        Summoner.hasMany(models.SummonerHistory, {
            foreignKey: 'summoner_uuid',
            sourceKey: 'uuid'
        });

        Summoner.belongsToMany(models.Tournament, {
            through: 'TournamentSummoners',
            onDelete: 'CASCADE',
            foreignKey: {
                // name: 'tournament_code',
                allowNull: false
            }
            // sourceKey: 'tournament_code'
        });

        Summoner.belongsToMany(models.Team, {
            through: 'SummonerTeams',
            foreignKey: 'summoner_uuid',
            sourceKey: 'uuid'
        });
    };

    return Summoner;
};
