'use strict';
const game_api = require('../src/lol-api/game-api');
const { Team, Summoner, Match } = require('../models');

const matchDatas = [
    { id: 4036672778, type: 'groupstage', round: 1, blue: '석진팀', red: '수빈팀' },
    { id: 4036701994, type: 'groupstage', round: 2, blue: '진희팀', red: '승덕팀' },
    { id: 4036434436, type: 'groupstage', round: 3, blue: '수빈팀', red: '승덕팀' },
    { id: 4036832891, type: 'groupstage', round: 4, blue: '석진팀', red: '진희팀' },
    { id: 4036703935, type: 'groupstage', round: 5, blue: '진희팀', red: '수빈팀' },
    { id: 4036833732, type: 'groupstage', round: 6, blue: '석진팀', red: '승덕팀' },
    { id: 4037816055, type: 'semifinal', round: 1, blue: '승덕팀', red: '진희팀' },
    { id: 4038026338, type: 'semifinal', round: 2, blue: '승덕팀', red: '진희팀' },
    { id: 4037847887, type: 'semifinal', round: 3, blue: '승덕팀', red: '진희팀' },
    { id: 4038028605, type: 'semifinal', round: 4, blue: '진희팀', red: '승덕팀' },
    { id: 4040761459, type: 'final', round: 1, blue: '석진팀', red: '승덕팀' },
    { id: 4040573475, type: 'final', round: 2, blue: '석진팀', red: '승덕팀' },
    { id: 4040763625, type: 'final', round: 3, blue: '석진팀', red: '승덕팀' },
    { id: 4040575176, type: 'final', round: 4, blue: '석진팀', red: '승덕팀' },
    { id: 4040765097, type: 'final', round: 5, blue: '석진팀', red: '승덕팀' }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        //const matchDTOs = [];
        const banDTOs = [];
        const teamDTOs = [];
        const summonerDTOs = [];
        for (let m in matchDatas) {
            const matchData = matchDatas[m];
            const res = await game_api.getMatchData(matchData.id);
            const data = JSON.parse(res);

            await queryInterface.bulkInsert(
                'Matches',
                [
                    {
                        gid: data.gameId,
                        duration: data.gameDuration,
                        game_creation: data.gameCreation,
                        type: matchData.type,
                        round: matchData.round,
                        TournamentId: 1,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                ],
                {}
            );

            const matchDTO = await Match.findOne({
                where: {
                    gid: data.gameId
                }
            });

            for (let t in data.teams) {
                const teamDTO = data.teams[t];
                const teamName = teamDTO.teamId == 100 ? matchData.blue : matchData.red;
                console.log(teamName);
                const teamData = await Team.findOne({ where: { name: teamName } });
                const teamRecord = {
                    TeamId: teamData.id,
                    camp_id: teamDTO.teamId,
                    win: teamDTO.win == 'Win',
                    MatchId: matchDTO.id,
                    towerKills: teamDTO.towerKills,
                    inhibitorKills: teamDTO.inhibitorKills,
                    dragonKills: teamDTO.dragonKills,
                    riftHeraldKills: teamDTO.riftHeraldKills,
                    baronKills: teamDTO.baronKills,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                let sIndex = 0;
                const summoners = await teamData.getSummoners();
                for (let s in data.participants) {
                    const dto = data.participants[s];
                    if (dto.teamId !== teamDTO.teamId) continue;

                    const summonerStat = {
                        summoner_uuid: summoners[sIndex++].uuid,
                        MatchId: matchDTO.id,
                        cid: dto.championId,
                        spell1_id: dto.spell1Id,
                        spell2_id: dto.spell2Id,
                        kill: dto.stats.kills,
                        death: dto.stats.deaths,
                        assist: dto.stats.assists,
                        totalDamageDealt: dto.stats.totalDamageDealtToChampions,
                        champion_level: dto.stats.champLevel,
                        role: 'NONE',
                        camp_id: dto.teamId,
                        match_id: data.gameId,
                        win: dto.stats.win,
                        item0: dto.stats.item0,
                        item1: dto.stats.item1,
                        item2: dto.stats.item2,
                        item3: dto.stats.item3,
                        item4: dto.stats.item4,
                        item5: dto.stats.item5,
                        doubleKills: dto.stats.doubleKills,
                        tripleKills: dto.stats.tripleKills,
                        quadraKills: dto.stats.quadraKills,
                        pentaKills: dto.stats.pentaKills,
                        unrealKills: dto.stats.unrealKills,
                        goldEarned: dto.stats.goldEarned,
                        totalMinionsKilled: dto.stats.totalMinionsKilled,
                        neutralMinionsKilled: dto.stats.neutralMinionsKilled,
                        wardsPlaced: dto.stats.wardsPlaced,
                        wardsKilled: dto.stats.wardsKilled,
                        perkPrimaryStyle: dto.stats.perkPrimaryStyle,
                        perkSubStyle: dto.stats.perkSubStyle,
                        rune0: dto.stats.perk0,
                        rune1: dto.stats.perk1,
                        rune2: dto.stats.perk2,
                        rune3: dto.stats.perk3,
                        rune4: dto.stats.perk4,
                        rune5: dto.stats.perk5,
                        statPerk0: dto.stats.statPerk0,
                        statPerk1: dto.stats.statPerk1,
                        statPerk2: dto.stats.statPerk2,
                        participantId: dto.participantId,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };

                    summonerDTOs.push(summonerStat);
                }

                for (let b in teamDTO.bans) {
                    const banData = teamDTO.bans[b];
                    const banRecord = {
                        TeamId: teamData.id,
                        MatchId: matchDTO.id,
                        cid: banData.championId,
                        turn: banData.pickTurn,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };

                    banDTOs.push(banRecord);
                }

                teamDTOs.push(teamRecord);
            }
        }

        return Promise.all([
            queryInterface.bulkInsert('TeamRecords', teamDTOs, {}),
            queryInterface.bulkInsert('BanHistories', banDTOs, {}),
            queryInterface.bulkInsert('SummonerRecords', summonerDTOs, {})
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('Matches', null, {}),
            queryInterface.bulkDelete('TeamRecords', null, {}),
            queryInterface.bulkDelete('BanHistories', null, {}),
            queryInterface.bulkDelete('SummonerRecords', null, {})
        ]);
    }
};
