const { Match, Team, Summoner, TeamHistory, BanHistory, SummonerHistory } = require('../../models');

exports.getAllMatches = async (req, res) => {
    const payload = [];
    const matches = await Match.findAll();
    for (let i in matches) {
        const data = await makeMatchData(matches[i]);
        payload.push(data);
    }

    res.json(payload);
};

exports.getMatchById = async (req, res) => {
    const matchId = parseInt(req.params.id, 10);
    const matchData = await Match.findOne({
        where: {
            id: matchId
        }
    });

    const payload = await makeMatchData(matchData);

    res.json(payload);
};

exports.getMatchByGameId = async (req, res) => {
    const matchId = parseInt(req.params.id, 10);
    const matchData = await Match.findOne({
        where: {
            gid: matchId
        }
    });

    const payload = await makeMatchData(matchData);

    res.json(payload);
};

const makeMatchData = async matchData => {
    let payload = {};
    if (matchData === null) {
        console.log('match data is null');
        payload.error = 'invlaid match id';
        return payload;
    }

    payload.id = matchData.id;
    payload.gameType = matchData.type;
    payload.gameId = matchData.gid;
    payload.duration = matchData.duration;
    payload.round = matchData.round;
    payload.tournamentId = matchData.TournamentGroupId;

    let teamDTOs = [];
    const teamDatas = await matchData.getTeamHistories({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    const summonerDatas = await matchData.getSummonerHistories({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    for (let i in teamDatas) {
        const teamData = teamDatas[i];
        let dto = teamData.toJSON();
        const team = await Team.findOne({
            where: {
                id: teamData.TeamId
            }
        });

        const bans = await BanHistory.findAll({
            where: {
                TeamId: teamData.TeamId,
                MatchId: matchData.id
            },
            attributes: {
                exclude: ['MatchId', 'TeamId', 'createdAt', 'updatedAt']
            },
            raw: true
        });

        let teamKills = 0;
        let teamDeaths = 0;
        let teamAssists = 0;
        let teamGold = 0;
        let teamName = 'NULL';
        if (team !== null) {
            teamName = team.name;
        }

        let summonerDTOs = [];
        for (let i in summonerDatas) {
            const sumDto = summonerDatas[i].toJSON();

            let sumName = 'NULL';
            const summoner = await summonerDatas[i].getSummoner();
            if (summoner !== null) {
                sumName = summoner.name;
            }

            sumDto.summonerName = sumName;
            if (sumDto.camp_id === teamData.camp_id) {
                teamKills += sumDto.kill;
                teamDeaths += sumDto.death;
                teamAssists += sumDto.assist;
                teamGold += sumDto.goldEarned;

                summonerDTOs.push(sumDto);
            }
        }

        dto.kills = teamKills;
        dto.deaths = teamDeaths;
        dto.assists = teamAssists;
        dto.teamGold = teamGold;
        dto.teamName = teamName;
        dto.bans = bans;
        dto.summoners = summonerDTOs;

        teamDTOs.push(dto);
    }

    payload.teams = teamDTOs;

    return payload;
};
