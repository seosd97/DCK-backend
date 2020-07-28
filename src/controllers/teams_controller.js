const { Team, Summoner, Tournament } = require('../../models');

exports.getAllTeams = async (req, res) => {
    const teamDatas = await Team.findAll({
        include: {
            model: Tournament,
            attributes: ['name']
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(teamDatas);
};

exports.getTeamByName = async (req, res) => {
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
                model: Tournament,
                attributes: ['name']
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
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

    res.json(teamData.toJSON());
};

exports.getTeamsOfTournament = async (req, res) => {
    const teamDatas = await Team.findAll({
        where: {
            tournamentId: req.params.tournament_id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(teamDatas);
};
