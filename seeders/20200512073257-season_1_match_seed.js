'use strict';
const game_api = require('../src/lol-api/game-api');

const matchDatas = [
    { id: 4036672778, type: 'groupstage', round: 1 },
    { id: 4036701994, type: 'groupstage', round: 2 },
    { id: 4036434436, type: 'groupstage', round: 3 },
    { id: 4036832891, type: 'groupstage', round: 4 },
    { id: 4036703935, type: 'groupstage', round: 5 },
    { id: 4036833732, type: 'groupstage', round: 6 },
    { id: 4037816055, type: 'semifinal', round: 1 },
    { id: 4038026338, type: 'semifinal', round: 2 },
    { id: 4037847887, type: 'semifinal', round: 3 },
    { id: 4038028605, type: 'semifinal', round: 4 },
    { id: 4040761459, type: 'final', round: 1 },
    { id: 4040573475, type: 'final', round: 2 },
    { id: 4040763625, type: 'final', round: 3 },
    { id: 4040575176, type: 'final', round: 4 },
    { id: 4040765097, type: 'final', round: 5 }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // let result = [];
        // for (let m in matchDatas) {
        //     const res = await game_api.getMatchData(matchDatas[m].id);
        //     const data = JSON.parse(res);
        //     const matchData = {
        //         type: matchDatas[m].type,
        //         gid: data.gameId,
        //         duration: data.gameDuration,
        //         round: matchDatas[m.round],
        //         TournamentGroupId: 1
        //     };
        //     const teamDTOs = [];
        //     for (let t in data.teams) {
        //         const dto = data.teams[t];
        //         const teamRecord = {
        //             campId: dto.teamId,
        //             win: dto.win,
        //             match_id: data.gameId
        //         };
        //         teamDTOs.push(teamRecord);
        //     }
        //     const SummonerDTOs = [];
        //     for (let s in data.participants) {
        //         const dto = data.participants[s];
        //         const summonerRecord = {
        //             cid: dto.championId,
        //             spell1_id: dto.spell1Id,
        //             spell2_id: dto.spell2Id,
        //             kill: dto.stats.kills,
        //             death: dto.stats.deaths,
        //             assist: dto.stats.assists,
        //             total_dmg_dealt: dto.stats.totalDamageDealt,
        //             champion_level: dto.stats.champLevel,
        //             role: 'NONE',
        //             camp_id: dto.teamId,
        //             match_id: data.gameId
        //         };
        //     }
        // }
        // return new Promise((resolve, reject) => {});
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    }
};
