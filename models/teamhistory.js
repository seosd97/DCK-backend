'use strict';
module.exports = (sequelize, DataTypes) => {
    const TeamHistory = sequelize.define(
        'TeamHistory',
        {
            camp_id: DataTypes.INTEGER,
            win: DataTypes.BOOLEAN,
            towerKills: DataTypes.INTEGER,
            inhibitorKills: DataTypes.INTEGER,
            dragonKills: DataTypes.INTEGER,
            riftHeraldKills: DataTypes.INTEGER,
            baronKills: DataTypes.INTEGER
        },
        {}
    );
    TeamHistory.associate = function(models) {
        TeamHistory.hasMany(models.BanHistory, {
            as: 'bans'
        });
        TeamHistory.belongsTo(models.Team, {
            onDelete: 'SETNULL',
            foreignKey: {
                allowNull: false
            }
        });

        TeamHistory.belongsTo(models.Match, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };
    return TeamHistory;
};
