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

exports.getTeamInfo = async (req, res) => {
    const teamData = await Team.findOne({
        where: {
            name: req.params.name
        },
        include: {
            model: Summoner,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            through: { attributes: [] }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    if (teamData === null) {
        res.json({
            status: 'error',
            msg: 'invalid team name'
        });
    }

    const payload = teamData.toJSON();
    const tournamentData = await teamData.getTournamentGroup();
    payload.tournamentName = tournamentData.name;

    res.json(payload);
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
    const summoners = await teamData.getSummoners({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });
    payload.push(summoners);

    res.json(payload);
};
