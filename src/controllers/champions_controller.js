const { Champion } = require('../../models');

exports.getAllChampions = (req, res) => {
    Champion.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    })
        .then(d => {
            res.json(d);
        })
        .catch(err => {
            res.send(err);
        });
};

exports.getChampionById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    Champion.findOne({
        where: {
            key: id
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
            res.send(err);
        });
};

exports.getChampionByName = (req, res) => {
    Champion.findOne({
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
