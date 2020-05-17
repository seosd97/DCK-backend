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
            match_id: DataTypes.BIGINT,
            item0: DataTypes.INTEGER,
            item1: DataTypes.INTEGER,
            item2: DataTypes.INTEGER,
            item3: DataTypes.INTEGER,
            item4: DataTypes.INTEGER,
            item5: DataTypes.INTEGER,
            doubleKills: DataTypes.INTEGER,
            tripleKills: DataTypes.INTEGER,
            quadraKills: DataTypes.INTEGER,
            pentaKills: DataTypes.INTEGER,
            unrealKills: DataTypes.INTEGER,
            goldEarned: DataTypes.INTEGER,
            totalMinionsKilled: DataTypes.INTEGER,
            wardsPlaced: DataTypes.INTEGER,
            wardsKilled: DataTypes.INTEGER,
            perkPrimaryStyle: DataTypes.INTEGER,
            perkSubStyle: DataTypes.INTEGER,
            participantId: DataTypes.INTEGER
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
