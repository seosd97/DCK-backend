'use strict';
module.exports = (sequelize, DataTypes) => {
    const BanHistory = sequelize.define(
        'BanHistory',
        {
            cid: DataTypes.INTEGER,
            turn: DataTypes.INTEGER,
            GameId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: sequelize.Match,
                    key: 'gid'
                }
            }
        },
        {}
    );
    BanHistory.associate = function(models) {
        BanHistory.belongsTo(models.Team, {
            onDelete: 'CASCADE'
        });
        BanHistory.belongsTo(models.Match, {
            onDelete: 'CASCADE',
            foreignKey: 'GameId'
        });
    };

    return BanHistory;
};
