const { Summoner, SummonerHistory } = require('../../models');

exports.getAllSummoners = async (req, res) => {
    const datas = await Summoner.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    res.json(datas);
};

exports.getSummonerData = async (req, res) => {
    const data = await Summoner.findOne({
        where: {
            name: req.params.id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    if (data === null) {
        req.json({
            status: {
                code: '404',
                msg: `failed to find summoner ${req.params.id}`
            }
        });

        return;
    }

    res.json(data);
};

exports.getSummonerDataByName = async (req, res) => {
    const data = await Summoner.findOne({
        where: {
            name: req.params.name
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });

    if (data === null) {
        req.json({
            status: {
                code: '404',
                msg: `failed to find summoner ${req.params.name}`
            }
        });

        return;
    }

    res.json(data);
};
