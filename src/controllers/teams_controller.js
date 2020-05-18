const { Team, Summoner } = require('../../models');

exports.getAllTeams = (req, res) => {
    Team.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    })
        .then(d => {
            res.json(d);
        })
        .catch(err => {
            res.json(err);
        });
};

exports.getTeamByName = (req, res) => {
    Team.findOne({
        where: {
            name: req.params.name
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    })
        .then(d => {
            res.json(d);
        })
        .catch(err => {
            res.json(err);
        });
};

exports.getTeamByGroupId = (req, res) => {
    Team.findAll({
        where: {
            TournamentGroupId: req.params.group_id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    })
        .then(d => {
            res.json(d);
        })
        .catch(err => {
            res.json(err);
        });
};

exports.getSummonersOfTeam = async (req, res) => {
    const teamData = await Team.findOne({
        where: {
            name: req.params.name
        },
        raw: true
    });

    if (teamData === null) {
        res.json({
            status: 'error',
            msg: 'invalid team name'
        });
    }

    const payload = [];
    const summoners = await teamData.getSummoners();
    for (let i in summoners) {
        const summoner = summoners[i].toJSON();

        delete summoner.createdAt;
        delete summoner.updatedAt;

        payload.push(summoner);
    }

    res.json(payload);
};
