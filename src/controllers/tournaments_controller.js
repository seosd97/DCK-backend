const { TournamentGroup } = require('../../models');

exports.getTournaments = (req, res) => {
    TournamentGroup.findAll().then(r => {
        res.json(r);
    });
};

exports.getTournamentData = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    const tournament = await TournamentGroup.findOne({
        where: {
            id: id
        }
    });

    if (tournament === null) {
        res.json({
            status: 'error',
            msg: 'invalid tournament id'
        });

        return;
    }

    let payload = {};
    const matchDTOs = [];
    const matches = await tournament.getMatches({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    for (let i in matches) {
        const teamRecords = await matches[i].getTeamHistories({
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
