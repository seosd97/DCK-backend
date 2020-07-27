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
        BanHistory.belongsTo(models.TeamHistory, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return BanHistory;
};
