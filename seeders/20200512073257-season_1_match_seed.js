'use strict';
const game_api = require('../src/lol-api/game-api');
const { Team } = require('../models');

const matchDatas = [
    { id: 4036672778, type: 'groupstage', round: 1, blue: '석진팀', red: '수빈팀' },
    { id: 4036701994, type: 'groupstage', round: 2, blue: '진희팀', red: '승덕팀' },
    { id: 4036434436, type: 'groupstage', round: 3, blue: '수빈팀', red: '승덕팀' },
    { id: 4036832891, type: 'groupstage', round: 4, blue: '석진팀', red: '진희팀' },
    { id: 4036703935, type: 'groupstage', round: 5, blue: '진희팀', red: '수빈팀' },
    { id: 4036833732, type: 'groupstage', round: 6, blue: '석진팀', red: '승덕팀' },
    { id: 4037816055, type: 'semifinal', round: 1, blue: '승덕팀', red: '진희팀' },
    { id: 4038026338, type: 'semifinal', round: 2, blue: '승덕팀', red: '진희팀' },
    { id: 4037847887, type: 'semifinal', round: 3, blud: '승덕팀', red: '진희팀' },
    { id: 4038028605, type: 'semifinal', round: 4, blue: '진희팀', red: '승덕팀' },
    { id: 4040761459, type: 'final', round: 1, blue: '석진팀', red: '승덕팀' },
    { id: 4040573475, type: 'final', round: 2, blue: '석진팀', red: '승덕팀' },
    { id: 4040763625, type: 'final', round: 3, blue: '석진팀', red: '승덕팀' },
    { id: 4040575176, type: 'final', round: 4, blue: '석진팀', red: '승덕팀' },
    { id: 4040765097, type: 'final', round: 5, blue: '석진팀', red: '승덕팀' }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const matchDTOs = [];
        const banDTOs = [];
        const teamDTOs = [];
        const summonerDTOs = [];
        for (let m in matchDatas) {
            const matchData = matchDatas[m];
            const res = await game_api.getMatchData(matchData.id);
            const data = JSON.parse(res);

            const matchRecord = {
                type: matchData.type,
                gid: data.gameId,
                duration: data.gameDuration,
                round: matchData.round,
                TournamentGroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            matchDTOs.push(matchRecord);

            for (let t in data.teams) {
                const dto = data.teams[t];
                const teamName = dto.teamId == 100 ? matchData.blue : matchData.red;
                const teamData = await Team.findOne({ where: { name: teamName } });
                const teamRecord = {
                    TeamId: teamData.id,
                    camp_id: dto.teamId,
                    win: dto.win == 'Win',
                    match_id: data.gameId,
                    towerKills: dto.towerKills,
                    inhibitorKills: dto.inhibitorKills,
                    dragonKills: dto.dragonKills,
                    riftHeraldKills: dto.riftHeraldKills,
                    baronKills: dto.baronKills,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                for (let b in dto.bans) {
                    const banData = dto.bans[b];
                    const banRecord = {
                        TeamId: teamData.id,
                        GameId: data.gameId,
                        cid: banData.championId,
                        turn: banData.pickTurn,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };

                    banDTOs.push(banRecord);
                }

                teamDTOs.push(teamRecord);
            }

            for (let s in data.participants) {
                const dto = data.participants[s];
                const summonerRecord = {
                    SummonerId: 121,
                    cid: dto.championId,
                    spell1_id: dto.spell1Id,
                    spell2_id: dto.spell2Id,
                    kill: dto.stats.kills,
                    death: dto.stats.deaths,
                    assist: dto.stats.assists,
                    total_dmg_dealt: dto.stats.totalDamageDealt,
                    champion_level: dto.stats.champLevel,
                    role: 'NONE',
                    camp_id: dto.teamId,
                    match_id: data.gameId,
                    item0: dto.item0,
                    item1: dto.item1,
                    item2: dto.item2,
                    item3: dto.item3,
                    item4: dto.item4,
                    item5: dto.item5,
                    doubleKills: dto.doubleKills,
                    tripleKills: dto.tripleKills,
                    quadraKills: dto.quadraKills,
                    pentaKills: dto.pentaKills,
                    unrealKills: dto.unrealKills,
                    goldEarned: dto.goldEarned,
                    totalMinionsKilled: dto.totalMinionsKilled,
                    wardsPlaced: dto.wardsPlaced,
                    wardsKilled: dto.wardsKilled,
                    perkPrimaryStyle: dto.perkPrimaryStyle,
                    perkSubStyle: dto.perkSubStyle,
                    participantId: dto.participantId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                summonerDTOs.push(summonerRecord);
            }
        }
        return Promise.all([
            queryInterface.bulkInsert('Matches', matchDTOs, {}),
            queryInterface.bulkInsert('TeamHistories', teamDTOs, {}),
            queryInterface.bulkInsert('BanHistories', banDTOs, {}),
            queryInterface.bulkInsert('SummonerHistoris', summonerDTOs, {})
        ]);
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.bulkDelete('Matches', null, {}),
        queryInterface.bulkDelete('TeamHistories', null, {}),
        queryInterface.bulkDelete('BanHistories', null, {}),
        queryInterface.bulkDelete('SummonerHistoris', null, {});
    }
};
