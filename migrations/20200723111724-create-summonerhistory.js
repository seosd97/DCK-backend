'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('SummonerHistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cid: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            spell1_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            spell2_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            kill: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            death: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            assist: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            totalDamageDealt: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            champion_level: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            role: Sequelize.STRING,
            win: Sequelize.BOOLEAN,
            camp_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            match_id: Sequelize.BIGINT,
            item0: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            item1: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            item2: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            item3: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            item4: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            item5: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            doubleKills: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            tripleKills: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            quadraKills: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            pentaKills: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            unrealKills: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            goldEarned: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            totalMinionsKilled: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            neutralMinionsKilled: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            wardsPlaced: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            wardsKilled: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            visionScore: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            totalVisionWardsBoughtInGame: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            perkPrimaryStyle: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            perkSubStyle: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            rune0: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            rune1: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            rune2: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            rune3: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            rune4: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            rune5: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            statPerk0: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            statPerk1: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            statPerk2: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            participantId: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('SummonerHistories');
    }
};
