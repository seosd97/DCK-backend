const { Tournament, Team } = require('../../models');

exports.getTournaments = async (req, res) => {
    const datas = await Tournament.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(datas);
};

exports.getTournamentData = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    let payload = {};
    const tournament = await Tournament.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    if (tournament === null) {
        res.json({
            status: 'error',
            msg: 'invalid tournament id'
        });

        return;
    }
    payload = tournament.toJSON();

    const matchDTOs = [];
    const matches = await tournament.getMatches({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    for (let i in matches) {
        const TeamHistories = await matches[i].getTeamHistories({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        const recordDTOs = [];
        for (let j in TeamHistories) {
            const team = await TeamHistories[j].getTeam({
                attributes: {
                    include: ['name']
                }
            });

            const record = TeamHistories[j].toJSON();
            record.teamName = team.name;

            recordDTOs.push(record);
        }

        const match = matches[i].toJSON();
        match.teams = recordDTOs;

        matchDTOs.push(match);
    }

    payload.matches = matchDTOs;

    res.json(payload);
};

exports.getParticipationTeams = async (req, res) => {
    const tournaments = await Tournament.findAll({
        include: {
            model: Team,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    res.json({ tournaments: tournaments });
};
