const { Summoner, Team } = require('../../models');

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
