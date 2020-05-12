'use strict';
module.exports = (sequelize, DataTypes) => {
    const SummonerHistory = sequelize.define(
        'SummonerHistory',
        {
            cid: DataTypes.INTEGER,
            spell1_id: DataTypes.INTEGER,
            spell2_id: DataTypes.INTEGER,
            kill: DataTypes.INTEGER,
            death: DataTypes.INTEGER,
            assist: DataTypes.INTEGER,
            total_dmg_dealt: DataTypes.INTEGER,
            champion_level: DataTypes.INTEGER,
            role: DataTypes.STRING,
            win: DataTypes.BOOLEAN,
            camp_id: DataTypes.INTEGER,
            match_id: DataTypes.BIGINT
        },
        {}
    );
    SummonerHistory.associate = function(models) {
        SummonerHistory.belongsTo(models.Summoner, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    };

    return SummonerHistory;
};
