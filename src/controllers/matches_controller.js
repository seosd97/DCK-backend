const { Match, Team, Summoner, TeamHistory, SummonerHistory, BanHistory } = require('../../models');
const match = require('../../models/match');

exports.getAllMatches = async (req, res) => {
    const matches = await Match.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    res.json(matches);
};

exports.getMatchById = async (req, res) => {
    const matchId = parseInt(req.params.id, 10);
    const matchData = await Match.findOne({
        where: {
            id: matchId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(matchData);
};

exports.getMatchByGameId = async (req, res) => {
    const matchId = parseInt(req.params.game_id, 10);
    const matchData = await Match.findOne({
        where: {
            game_id: matchId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(matchData);
};

exports.getMatchesByType = async (req, res) => {
    const matchDatas = await Match.findAll({
        where: {
            TournamentId: req.params.tournament_id,
            type: req.params.type
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(matchDatas);
};

exports.getMatchDetail = async (req, res) => {};

exports.getMatchDetailByGameId = async (req, res) => {
    try {
        const matchData = await Match.findOne({
            where: {
                game_id: req.params.game_id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: TeamHistory,
                    // as: 'teams',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: BanHistory,
                        // as: 'bans',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                },
                {
                    model: SummonerHistory,
                    // as: 'summoner_stats',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ]
        });

        res.json(matchData.toJSON());
    } catch (err) {
        console.log(err);
        res.json({ err });
    }
};

exports.getMatchBySummoner = async (req, res) => {
    const summoner = await Summoner.findOne({
        where: {
            uuid: req.params.uuid
        }
    });

    if (summoner === null) {
        res.json({ status: 'error', msg: 'invalid uuid' });
        return;
    }

    const histories = await summoner.getSummonerHistorys();

    let payload = [];
    for (let i in histories) {
        const match = await histories[i].getMatch({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        const data = await makeMatchData(match);
        payload.push(data);
    }

    // if (matches === null) {
    //     console.log('cant\'t find matches');
    //     res.json({ status: 'error', msg: 'cant\'t find matches' });
    //     return;
    // }

    // for (let i in matches) {
    //     const match = await makeMatchData(matches[i]);
    //     payload.push(match);
    // }

    res.json(payload);
};

exports.getMatchesByTournamentId = async (req, res) => {
    const matches = await Match.findAll({
        where: {
            TournamentId: req.params.tournament_id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(matches);
};

const makeMatchData = async matchData => {
    let payload = {};
    if (matchData === null) {
        console.log('match data is null');
        payload.status = {
            code: 404,
            msg: 'invlaid match id'
        };
        return payload;
    }

    payload = matchData.toJSON();

    let teamDTOs = [];
    const teamDatas = await matchData.getTeamHistories({
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

        dto.kills = teamKills;
        dto.deaths = teamDeaths;
        dto.assists = teamAssists;
        dto.teamGold = teamGold;
        dto.teamName = teamName;
        dto.bans = bans;

        teamDTOs.push(dto);
    }

    const summonerDatas = await matchData.getSummonerHistorys({
        attributes: {
            exclude: ['summoner_uuid', 'createdAt', 'updatedAt']
        },
        include: {
            model: Summoner,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    });

    payload.teams = teamDTOs;
    payload.summoners = summonerDatas;

    return payload;
};
