const Sequelize = require('sequelize');
const op = Sequelize.Op;
const {
    Tournament,
    MatchGroup,
    Match,
    Team,
    Summoner,
    TeamHistory,
    SummonerHistory,
    BanHistory,
    MatchParticipant
} = require('../../models');
const match = require('../../models/match');

exports.getMatchesGroups = async (req, res) => {
    const options = {
        where: {},
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    };

    const { filter } = req.query;
    if (filter !== undefined) {
        const tournament = await Tournament.findOne({
            where: { name: filter }
        });

        if (tournament === null) {
            res.json([]);
            return;
        }

        options.where = { TournamentId: tournament.id };
    }
    const matches = await MatchGroup.findAll(options);

    let payload = [];
    for (let i in matches) {
        const match = matches[i].toJSON();

        const tournament = await matches[i].getTournament({
            attributes: ['name'],
            raw: true
        });
        match.tournamentName = tournament.name;

        const teams = await Team.findAll({
            where: {
                [op.or]: [{ id: match.team1_id }, { id: match.team2_id }]
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: true
        });

        match.teams = teams;
        payload.push(match);
    }

    res.json(payload);
};

exports.getAllMatches = async (req, res) => {
    const matches = await MatchGroup.findAll({
        include: {
            model: Match,
            attributes: {
                exclude: ['id', 'MatchGroupId', 'createdAt', 'updatedAt']
            }
        },
        attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
        }
    });

    res.json(matches);
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
    const tournamentId = parseInt(req.params.tournament_id, 10);
    const matchDatas = await MatchGroup.findAll({
        where: {
            TournamentId: tournamentId,
            type: req.params.type
        },
        include: {
            model: Match,
            attributes: {
                exclude: ['id', 'MatchGroupId', 'createdAt', 'updatedAt']
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(matchDatas);
};

exports.getMatchDetail = async (req, res) => {};

// TODO : match table과 각 스탯의 관계를 재설정 하면서 꼭 재작업 필요
exports.getMatchDetailByGameId = async (req, res) => {
    try {
        const gameId = parseInt(req.params.game_id, 10);
        const matchData = await Match.findOne({
            where: {
                game_id: gameId
            },
            attributes: {
                exclude: ['MatchGroupId', 'createdAt', 'updatedAt']
            },
            include: {
                model: TeamHistory,
                as: 'teamStats',
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: BanHistory,
                        as: 'bans',
                        attributes: ['cid', 'turn']
                    },
                    {
                        model: Team,
                        attributes: ['name']
                    }
                ]
            }
        });

        const participants = await MatchParticipant.findAll({
            where: { match_id: matchData.id },
            attributes: ['participant_uuid'],
            raw: true
        });

        const uuids = participants.map(p => p.participant_uuid);
        const summoners = await Summoner.findAll({
            where: { uuid: uuids },
            attributes: ['uuid', 'name', 'profile_icon_id', 'stats.cid', 'stats.camp_id'],
            include: {
                model: SummonerHistory,
                as: 'stats',
                where: {
                    match_id: gameId
                },
                attributes: []
            },
            raw: true
        });

        const stats = await SummonerHistory.findAll({
            where: {
                match_id: gameId
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true
        });

        let payload = matchData.toJSON();
        payload.participants = summoners;
        payload.stats = stats;

        res.json(payload);
    } catch (err) {
        console.log(err);
        res.json({ err });
    }
};

exports.getMatchListByMatchGroup = async (req, res) => {
    let payload = {};
    const match = await MatchGroup.findOne({
        where: {
            id: req.params.matchgroup_id
        },
        include: {
            model: Match,
            attributes: {
                exclude: ['MatchGroupId', 'createdAt', 'updatedAt']
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    payload = match.toJSON();

    const teams = await Team.findAll({
        where: {
            [op.or]: [{ id: match.team1_id }, { id: match.team2_id }]
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });
    payload.Teams = teams;

    res.json(payload);
};

exports.getTeamMatchList = async (req, res) => {
    const matches = await MatchGroup.findAll({
        where: {
            [op.or]: {
                team1_id: req.params.team_id,
                team2_id: req.params.team_id
            }
        },
        attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
        }
    });

    res.json(matches);
};

exports.getSummonerMatchList = async (req, res) => {
    const matches = await Match.findAll({
        attributes: {
            exclude: ['id', 'MatchGroupId', 'createdAt', 'updatedAt']
        },
        include: {
            model: MatchParticipant,
            where: {
                participant_id: req.params.uuid
            },
            attributes: {
                exclude: ['id', 'MatchId', 'createdAt', 'updatedAt']
            }
        }
    });

    res.json(matches);
};
