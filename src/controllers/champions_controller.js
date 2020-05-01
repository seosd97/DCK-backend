const { Champion } = require('../../models');

exports.getAllChampions = (req, res) => {
    Champion.findAll()
        .then(d => {
            res.json(d);
        })
        .catch(err => {
            res.send(err);
        });
};

exports.getChampionById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    Champion.findAll({
        where: {
            key: id
        }
    })
        .then(d => {
            res.json(d);
        })
        .catch(err => {
            res.send(err);
        });
};
