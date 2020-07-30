const {
    MatchGroup,
    Match,
    Team,
    Summoner,
    TeamHistory,
    SummonerHistory,
    BanHistory
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
        const matchData = await Match.findOne({
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
                    model: SummonerHistory,
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

exports.getSummonerMatchList = async (req, res) => {
    const summoner = await Summoner.findOne({
        where: {
            name: req.params.name
        }
    });
};
