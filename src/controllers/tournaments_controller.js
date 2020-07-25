const { Tournament, Team } = require('../../models');

exports.getTournaments = (req, res) => {
    Tournament.findAll().then(r => {
        res.json(r);
    });
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
        const teamRecords = await matches[i].getTeamRecords({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        const recordDTOs = [];
        for (let j in teamRecords) {
            const team = await teamRecords[j].getTeam({
                attributes: {
                    include: ['name']
                }
            });

            const record = teamRecords[j].toJSON();
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

exports.getTeamPerTournament = async (req, res) => {
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
