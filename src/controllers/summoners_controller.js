const { Summoner } = require('../../models');

exports.getAllSummoners = (req, res) => {
    Summoner.findAll({
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

exports.getSummonerByName = (req, res) => {
    Summoner.findOne({
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
