const { TournamentGroup } = require('../../models');

exports.getTournaments = (req, res) => {
    TournamentGroup.findAll().then(r => {
        res.json(r);
    });
};
