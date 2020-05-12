'use strict';
module.exports = (sequelize, DataTypes) => {
    const TournamentGroup = sequelize.define(
        'TournamentGroup',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sid: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {}
    );
    TournamentGroup.associate = function(models) {
        TournamentGroup.hasMany(models.Match);
        TournamentGroup.hasMany(models.Team);
    };

    return TournamentGroup;
};
