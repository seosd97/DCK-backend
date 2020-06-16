const { Team, Summoner, TournamentGroup } = require('../../models');

exports.getAllTeams = async (req, res) => {
    const teamData = await Team.findAll({
        include: {
            model: TournamentGroup,
            attributes: ['name']
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    res.json({ teams: teamData });
};

exports.getTeamInfo = async (req, res) => {
    const teamData = await Team.findOne({
        where: {
            name: req.params.name
        },
        include: [
            {
                model: Summoner,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: { attributes: [] }
            },
            {
                model: TournamentGroup,
                attributes: ['name']
            }
        ],
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

    res.json(teamData.toJSON());
};

exports.getTeamByGroupId = async (req, res) => {
    const teamData = Team.findAll({
        where: {
            TournamentGroupId: req.params.group_id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(teamData);
};

exports.getSummonersOfTeam = async (req, res) => {
    const teamData = await Team.findOne({
        where: {
            name: req.params.name
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
            status: 'error',
            msg: 'invalid team name'
        });
    }

    res.json(teamData.Summoners);
};
