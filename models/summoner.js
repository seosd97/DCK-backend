'use strict';
module.exports = (sequelize, DataTypes) => {
    const Summoner = sequelize.define(
        'Summoner',
        {
            uuid: DataTypes.STRING,
            account_id: DataTypes.STRING,
            name: DataTypes.STRING
        },
        {}
    );
    Summoner.associate = function(models) {
        Summoner.hasOne(models.SummonerHistory);
        Summoner.belongsToMany(models.Match, { through: 'MatchSummoners' });
        Summoner.belongsToMany(models.Team, { through: 'SummonerTeams' });
    };

    return Summoner;
};
