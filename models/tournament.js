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
        {}
    );
    Tournament.associate = function(models) {
        Tournament.hasMany(models.MatchGroup);
        Tournament.hasMany(models.Match);
        Tournament.hasMany(models.Team);
    };

    return Tournament;
};
