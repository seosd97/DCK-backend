'use strict';
module.exports = (sequelize, DataTypes) => {
    const BanHistory = sequelize.define(
        'BanHistory',
        {
            cid: DataTypes.INTEGER,
            turn: DataTypes.INTEGER
        },
        {}
    );
    BanHistory.associate = function(models) {
        BanHistory.belongsTo(models.Team, {
            onDelete: 'SET NULL'
        });
        BanHistory.belongsTo(models.Match, {
            onDelete: 'SET NULL'
        });
    };

    return BanHistory;
};
