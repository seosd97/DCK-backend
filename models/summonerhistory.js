'use strict';
module.exports = (sequelize, DataTypes) => {
    const SummonerHistory = sequelize.define(
        'SummonerHistory',
        {
            cid: { type: DataTypes.INTEGER, defaultValue: 0 },
            spell1_id: { type: DataTypes.INTEGER, defaultValue: 0 },
            spell2_id: { type: DataTypes.INTEGER, defaultValue: 0 },
            kill: { type: DataTypes.INTEGER, defaultValue: 0 },
            death: { type: DataTypes.INTEGER, defaultValue: 0 },
            assist: { type: DataTypes.INTEGER, defaultValue: 0 },
            totalDamageDealt: { type: DataTypes.INTEGER, defaultValue: 0 },
            champion_level: { type: DataTypes.INTEGER, defaultValue: 0 },
            role: DataTypes.STRING,
            win: DataTypes.BOOLEAN,
            camp_id: { type: DataTypes.INTEGER, defaultValue: 0 },
            match_id: DataTypes.BIGINT,
            item0: { type: DataTypes.INTEGER, defaultValue: 0 },
            item1: { type: DataTypes.INTEGER, defaultValue: 0 },
            item2: { type: DataTypes.INTEGER, defaultValue: 0 },
            item3: { type: DataTypes.INTEGER, defaultValue: 0 },
            item4: { type: DataTypes.INTEGER, defaultValue: 0 },
            item5: { type: DataTypes.INTEGER, defaultValue: 0 },
            doubleKills: { type: DataTypes.INTEGER, defaultValue: 0 },
            tripleKills: { type: DataTypes.INTEGER, defaultValue: 0 },
            quadraKills: { type: DataTypes.INTEGER, defaultValue: 0 },
            pentaKills: { type: DataTypes.INTEGER, defaultValue: 0 },
            unrealKills: { type: DataTypes.INTEGER, defaultValue: 0 },
            goldEarned: { type: DataTypes.INTEGER, defaultValue: 0 },
            totalMinionsKilled: { type: DataTypes.INTEGER, defaultValue: 0 },
            neutralMinionsKilled: { type: DataTypes.INTEGER, defaultValue: 0 },

            wardsPlaced: { type: DataTypes.INTEGER, defaultValue: 0 },
            wardsKilled: { type: DataTypes.INTEGER, defaultValue: 0 },
            visionScore: { type: DataTypes.INTEGER, defaultValue: 0 },
            totalVisionWardsBoughtInGame: { type: DataTypes.INTEGER, defaultValue: 0 },
            perkPrimaryStyle: { type: DataTypes.INTEGER, defaultValue: 0 },
            perkSubStyle: { type: DataTypes.INTEGER, defaultValue: 0 },
            rune0: { type: DataTypes.INTEGER, defaultValue: 0 },
            rune1: { type: DataTypes.INTEGER, defaultValue: 0 },
            rune2: { type: DataTypes.INTEGER, defaultValue: 0 },
            rune3: { type: DataTypes.INTEGER, defaultValue: 0 },
            rune4: { type: DataTypes.INTEGER, defaultValue: 0 },
            rune5: { type: DataTypes.INTEGER, defaultValue: 0 },
            statPerk0: { type: DataTypes.INTEGER, defaultValue: 0 },
            statPerk1: { type: DataTypes.INTEGER, defaultValue: 0 },
            statPerk2: { type: DataTypes.INTEGER, defaultValue: 0 },
            participantId: { type: DataTypes.INTEGER, defaultValue: 0 }
        },
        {}
    );
    SummonerHistory.associate = function(models) {
        SummonerHistory.belongsTo(models.Summoner, {
            onDelete: 'SETNULL',
            foreignKey: {
                name: 'summoner_uuid',
                allowNull: false
            },
            sourceKey: 'uuid'
        });

        SummonerHistory.belongsTo(models.MatchParticipant, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'statId',
                targetKey: 'id',
                allowNull: false
            }
        });

        // SummonerHistory.belongsTo(models.Match, {
        //     onDelete: 'CASCADE',
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
    };
    return SummonerHistory;
};
