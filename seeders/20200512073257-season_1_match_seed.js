'use strict';
const game_api = require('../src/lol-api/game-api');
const { Tournament, Team, Summoner, MatchGroup, Match } = require('../models');

const matchGroups = [
    {
        team1: '석진팀',
        team2: '수빈팀',
        type: 'groupstage',
        matches: [{ id: 4036672778, type: 'groupstage', round: 1, isTeam1Blue: true }]
    },
    {
        team1: '진희팀',
        team2: '승덕팀',
        type: 'groupstage',
        matches: [{ id: 4036701994, type: 'groupstage', round: 1, isTeam1Blue: true }]
    },
    {
        team1: '수빈팀',
        team2: '승덕팀',
        type: 'groupstage',
        matches: [{ id: 4036434436, type: 'groupstage', round: 1, isTeam1Blue: true }]
    },
    {
        team1: '석진팀',
        team2: '진희팀',
        type: 'groupstage',
        matches: [{ id: 4036832891, type: 'groupstage', round: 1, isTeam1Blue: true }]
    },
    {
        team1: '진희팀',
        team2: '수빈팀',
        type: 'groupstage',
        matches: [{ id: 4036703935, type: 'groupstage', round: 1, isTeam1Blue: true }]
    },
    {
        team1: '석진팀',
        team2: '승덕팀',
        type: 'groupstage',
        matches: [{ id: 4036833732, type: 'groupstage', round: 1, isTeam1Blue: true }]
    },
    {
        team1: '승덕팀',
        team2: '진희팀',
        type: 'semifinal',
        matches: [
            { id: 4037816055, type: 'semifinal', round: 1, isTeam1Blue: true },
            { id: 4038026338, type: 'semifinal', round: 2, isTeam1Blue: true },
            { id: 4037847887, type: 'semifinal', round: 3, isTeam1Blue: true },
            { id: 4038028605, type: 'semifinal', round: 4, isTeam1Blue: false }
        ]
    },
    {
        team1: '석진팀',
        team2: '승덕팀',
        type: 'final',
        matches: [
            { id: 4040761459, type: 'final', round: 1, isTeam1Blue: true },
            { id: 4040573475, type: 'final', round: 2, isTeam1Blue: true },
            { id: 4040763625, type: 'final', round: 3, isTeam1Blue: true },
            { id: 4040575176, type: 'final', round: 4, isTeam1Blue: true },
            { id: 4040765097, type: 'final', round: 5, isTeam1Blue: true }
        ]
    }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tournament = await Tournament.findOne({
            where: {
                id: 1
            }
        });

        for (let g in matchGroups) {
            const matchGroupData = matchGroups[g];

            const team1 = await Team.findOne({ where: { name: matchGroupData.team1 } });
            const team2 = await Team.findOne({ where: { name: matchGroupData.team2 } });
            const matchGroup = await MatchGroup.create({
                TournamentId: 1,
                type: matchGroupData.type,
                team1_id: team1.id,
                team2_id: team2.id,
                status: 'end'
            });

            for (let m in matchGroupData.matches) {
                const matchData = matchGroupData.matches[m];
                const res = await game_api.getMatchData(matchData.id);
                const data = JSON.parse(res);
                const matchDto = await matchGroup.createMatch({
                    TournamentId: 1,
                    game_id: data.gameId,
                    duration: data.gameDuration,
                    game_creation: data.gameCreation,
                    game_version: data.gameVersion,
                    type: matchData.type,
                    round: matchData.round,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                const blueTeam = matchData.isTeam1Blue ? team1 : team2;
                const redTeam = !matchData.isTeam1Blue ? team1 : team2;

                console.log(`${matchData.type} round ${matchData.round}`);
                for (let t in data.teams) {
                    const teamData = data.teams[t];
                    const teamDto = teamData.teamId === 100 ? blueTeam : redTeam;

                    console.log(teamDto.name);
                    const teamRecord = await matchDto.createTeamHistory({
                        TeamId: teamDto.id,
                        camp_id: teamData.teamId,
                        win: teamData.win === 'Win',
                        towerKills: teamData.towerKills,
                        inhibitorKills: teamData.inhibitorKills,
                        dragonKills: teamData.dragonKills,
                        riftHeraldKills: teamData.riftHeraldKills,
                        baronKills: teamData.baronKills,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });

                    if (teamData.win === 'Win') {
                        await matchGroup.increment(
                            teamDto.name === matchGroupData.team1
                                ? { team1_score: 1 }
                                : { team2_score: 1 }
                        );
                    }

                    for (let b in teamData.bans) {
                        const banData = teamData.bans[b];
                        const banRecord = await teamRecord.createBanHistory({
                            cid: banData.championId,
                            turn: banData.pickTurn,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    }

                    let sidx = 0;
                    const summoners = await teamDto.getSummoners();
                    const participantList = data.participants.filter(p => {
                        return p.teamId === teamData.teamId;
                    });
                    for (let s in participantList) {
                        const dto = participantList[s];

                        const participant = await matchDto.createMatchParticipant({
                            participant_id: summoners[sidx].uuid,
                            cid: dto.championId,
                            team_id: dto.teamId
                        });

                        await participant.createStat({
                            summoner_uuid: summoners[sidx++].uuid,
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
                            visionScore: dto.stats.visionScore,
                            totalVisionWardsBoughtInGame: dto.stats.totalVisionWardsBoughtInGame,
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
                        });
                    }
                }
            }
        }

        return Promise.all([]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('MatchGroups', null, {}),
            queryInterface.bulkDelete('Matches', null, {}),
            queryInterface.bulkDelete('TeamHistories', null, {}),
            queryInterface.bulkDelete('BanHistories', null, {}),
            queryInterface.bulkDelete('SummonerHistories', null, {})
        ]);
    }
};
