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
        Summoner.hasMany(models.SummonerHistory);
        Summoner.belongsToMany(models.Team, { through: 'SummonerTeams' });
    };

    return Summoner;
};
