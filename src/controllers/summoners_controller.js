const { Summoner, Team, SummonerHistory } = require('../../models');
const summonerhistory = require('../../models/summonerhistory');
const Sequelize = require('sequelize');

exports.getAllSummoners = async (req, res) => {
    const datas = await Summoner.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(datas);
};

exports.getSummonerData = async (req, res) => {
    const data = await Summoner.findOne({
        where: {
            name: req.params.id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    if (data === null) {
        req.json({
            status: {
                code: '404',
                msg: `failed to find summoner ${req.params.id}`
            }
        });

        return;
    }

    res.json(data);
};

exports.getSummonerDataByName = async (req, res) => {
    const data = await Summoner.findOne({
        where: {
            name: req.params.name
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    if (data === null) {
        req.json({
            status: {
                code: '404',
                msg: `failed to find summoner ${req.params.name}`
            }
        });

        return;
    }

    res.json(data);
};

exports.getSummonersOfTournament = async (req, res) => {
    const teamDatas = await Team.findAll({
        where: {
            TournamentId: req.params.tournament_id
        },
        include: {
            model: Summoner,
            exclude: ['createdAt', 'updatedAt']
        },
        through: { attributes: [] }
    });

    let payload = [];
    for (let i in teamDatas) {
        payload = teamDatas[i].Summoners.concat(payload);
    }

    res.json(payload);
};

exports.getSummonersOfTeam = async (req, res) => {
    const teamData = await Team.findOne({
        where: {
            name: req.params.team_name
        },
        include: [
            {
                model: Summoner,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: { attributes: [] }
            }
        ]
    });

    if (teamData === null) {
        res.json({
            status: {
                code: '404',
                msg: `failed to find team ${req.params.name}`
            }
        });

        return;
    }

    res.json(teamData.Summoners);
};

exports.getSummonerStat = async (req, res) => {
    const stats = await SummonerHistory.findAll({
        include: { model: Summoner, attributes: [] },
        attributes: [
            'summoner_uuid',
            'Summoner.name',
            'Summoner.profile_icon_id',
            [Sequelize.fn('count', Sequelize.col('id')), 'games'],
            [Sequelize.fn('sum', Sequelize.col('kill')), 'kills'],
            [Sequelize.fn('sum', Sequelize.col('death')), 'deaths'],
            [Sequelize.fn('sum', Sequelize.col('assist')), 'assists'],
            [Sequelize.fn('sum', Sequelize.col('win')), 'wins'],
            [Sequelize.fn('avg', Sequelize.col('visionScore')), 'visionScore'],
            [
                Sequelize.fn(
                    'avg',
                    Sequelize.literal(
                        '(coalesce(totalMinionsKilled, 0) + coalesce(neutralMinionsKilled, 0))'
                    )
                ),
                'cs'
            ]
        ],
        group: 'summoner_uuid',
        order: [[Sequelize.fn('count', Sequelize.col('id')), 'DESC']],
        raw: true
    });

    res.json(stats);
};
