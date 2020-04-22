'use strict';
module.exports = (sequelize, DataTypes) => {
    const TeamHistory = sequelize.define(
        'TeamHistory',
        {
            camp_id: DataTypes.INTEGER,
            win: DataTypes.BOOLEAN
        },
        {}
    );
    TeamHistory.associate = function(models) {
        TeamHistory.belongsTo(models.Team, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };
    return TeamHistory;
};
