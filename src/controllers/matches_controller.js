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
    const teamDatas = await matchData.getTeamHistories();
    for (let i in teamDatas) {
        const teamData = teamDatas[i];
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

        let teamName = 'NULL';
        if (team !== null) {
            teamName = team.name;
        }

        const dto = {
            teamName: teamName,
            data: teamData.toJSON(),
            bans: bans
        };

        delete dto.data.createdAt;
        delete dto.data.updatedAt;

        teamDTOs.push(dto);
        console.log(dto);
    }

    payload.teams = teamDTOs;

    let summonerDTOs = [];
    const summonerDatas = await matchData.getSummonerHistories();
    for (let i in summonerDatas) {
        const sumData = summonerDatas[i];
        const dto = sumData.toJSON();

        delete dto.createdAt;
        delete dto.updatedAt;

        summonerDTOs.push(dto);
    }

    payload.summoners = summonerDTOs;

    return payload;
};
