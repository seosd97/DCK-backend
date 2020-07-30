const Sequelize = require('sequelize');
const op = Sequelize.Op;
const {
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

exports.getMatchDetailByGameId = async (req, res) => {
    try {
        const gameId = parseInt(req.params.game_id, 10);
        let matchData = await Match.findOne({
            where: {
                game_id: gameId
            },
            attributes: {
                exclude: ['MatchGroupId', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: TeamHistory,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: BanHistory,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                },
                {
                    model: MatchParticipant,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    },
                    include: {
                        model: SummonerHistory,
                        as: 'stat',
                        attributes: {
                            exclude: [
                                'id',
                                'summoner_uuid',
                                'statId',
                                'participantId',
                                'createdAt',
                                'updatedAt'
                            ]
                        }
                    }
                }
            ]
        });

        let summoners = [];
        for (let i in matchData.MatchParticipants) {
            const summoner = await Summoner.findOne({
                where: {
                    uuid: matchData.MatchParticipants[i].participant_id
                },
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt']
                },
                raw: true
            });

            summoners.push(summoner);
        }

        matchData = matchData.toJSON();
        matchData.Summoners = summoners;

        res.json(matchData);
    } catch (err) {
        console.log(err);
        res.json({ err });
    }
};

exports.getMatchesByTournamentId = async (req, res) => {
    const tournamentId = parseInt(req.params.tournament_id, 10);
    const matches = await Match.findAll({
        where: {
            TournamentId: tournamentId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(matches);
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
