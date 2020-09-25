const {
    Summoner,
    Team,
    SummonerHistory,
    MatchParticipant,
    Match,
    sequelize
} = require('../../models');
const Sequelize = require('sequelize');
const gameApi = require('../lol-api/game-api');
const dataApi = require('../lol-api/data-api');
const teamhistory = require('../../models/teamhistory');

// NODO : 해당 함수는 값을 db에 update하긴 하지만 api에서 갱신해서 가져온다는 의미로 쓰이므로 get으로 사용
exports.getSummonerFromAPI = async (req, res) => {
    const apiRes = await gameApi.getSummoner(req.params.uuid);
    const newSummoner = JSON.parse(apiRes);

    const summoner = await Summoner.findOne({
        where: { uuid: req.params.uuid },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    summoner.name = newSummoner.name;
    summoner.profile_icon_id = newSummoner.profileIconId;
    summoner.summoner_level = newSummoner.summonerLevel;

    await summoner.save();

    res.json(summoner);
};

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
            uuid: req.params.id
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

    let payload = { summoner: data };
    payload.statics = await this.getSummonerMostChampion(data.uuid);
    payload.matchList = await this.getSummonerMatches(data.uuid);
    res.json(payload);
};

exports.getSummonersOfTournament = async (req, res) => {
    const teamDatas = await Team.findAll({
        where: {
            TournamentId: req.params.tournament_id
        },
        include: {
            model: Summoner,
            exclude: ['createdAt', 'updatedAt']
        },
        through: { attributes: [] }
    });

    let payload = [];
    for (let i in teamDatas) {
        payload = teamDatas[i].Summoners.concat(payload);
    }

    res.json(payload);
};

exports.getSummonersOfTeam = async (req, res) => {
    const teamData = await Team.findOne({
        where: {
            name: req.params.team_name
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
            status: {
                code: '404',
                msg: `failed to find team ${req.params.name}`
            }
        });

        return;
    }

    res.json(teamData.Summoners);
};

exports.getSummonerStat = async (req, res) => {
    const stats = await SummonerHistory.findAll({
        include: { model: Summoner, attributes: [] },
        attributes: [
            'summoner_uuid',
            'Summoner.name',
            'Summoner.profile_icon_id',
            [Sequelize.fn('count', Sequelize.col('id')), 'games'],
            [Sequelize.fn('sum', Sequelize.col('kill')), 'kills'],
            [Sequelize.fn('sum', Sequelize.col('death')), 'deaths'],
            [Sequelize.fn('sum', Sequelize.col('assist')), 'assists'],
            [Sequelize.fn('sum', Sequelize.col('win')), 'wins'],
            [Sequelize.fn('sum', Sequelize.literal('case when win then 0 else 1 end')), 'defeats'],
            [Sequelize.fn('avg', Sequelize.col('visionScore')), 'visionScore'],
            [
                Sequelize.fn(
                    'avg',
                    Sequelize.literal(
                        '(coalesce(totalMinionsKilled, 0) + coalesce(neutralMinionsKilled, 0))'
                    )
                ),
                'cs'
            ]
        ],
        group: 'summoner_uuid',
        order: [[Sequelize.fn('count', Sequelize.col('id')), 'DESC']],
        raw: true
    });

    res.json(stats);
};

exports.getSummonerMostChampion = async uuid => {
    const stat = await SummonerHistory.findAll({
        where: { summoner_uuid: uuid },
        attributes: [
            'cid',
            [Sequelize.fn('count', Sequelize.col('id')), 'games'],
            [Sequelize.fn('sum', Sequelize.col('kill')), 'kills'],
            [Sequelize.fn('sum', Sequelize.col('death')), 'deaths'],
            [Sequelize.fn('sum', Sequelize.col('assist')), 'assists'],
            [Sequelize.fn('sum', Sequelize.col('win')), 'wins'],
            [Sequelize.fn('sum', Sequelize.literal('case when win then 0 else 1 end')), 'defeats'],
            [Sequelize.fn('avg', Sequelize.col('visionScore')), 'visionScore'],
            [
                Sequelize.fn(
                    'avg',
                    Sequelize.literal(
                        '(coalesce(totalMinionsKilled, 0) + coalesce(neutralMinionsKilled, 0))'
                    )
                ),
                'cs'
            ]
        ],
        group: 'cid',
        order: [
            [Sequelize.fn('count', Sequelize.col('id')), 'DESC'],
            [Sequelize.fn('sum', Sequelize.col('win')), 'DESC']
        ],
        raw: true
    });

    stat.map(s => {
        const data = dataApi.getChampionData(s.cid);
        s.championData = data;
        return s;
    });

    return stat;
};

// TODO : 관련 DB구조 수정 후 쿼리 개선 필요
// NOTE : 서버 DB구조를 전체적으로 수정 예정이므로 그 이후 맞춰서 수정
exports.getSummonerMatches = async uuid => {
    const participantsIds = await MatchParticipant.findAll({
        where: { participant_uuid: uuid },
        attributes: ['match_id'],
        raw: true
    });
    const ids1 = participantsIds.map(p => p.match_id);

    const matches1 = await Match.findAll({
        where: { id: ids1 },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
    });

    const stats = await SummonerHistory.findAll({
        where: {
            match_id: matches1.map(m => m.game_id)
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
    });

    const summoners = await Summoner.findAll({
        where: {
            uuid: stats.map(s => s.summoner_uuid)
        },
        attributes: ['uuid', 'name', 'profile_icon_id'],
        raw: true
    });

    let payload = {};
    payload.matches = matches1.map(m => {
        let match = m;
        match.stats = stats;
        match.participant = summoners;

        return match;
    });

    const totalStat = await SummonerHistory.findOne({
        where: { summoner_uuid: uuid },
        attributes: [
            [Sequelize.fn('count', Sequelize.col('id')), 'games'],
            [Sequelize.fn('sum', Sequelize.col('win')), 'wins'],
            [Sequelize.fn('sum', Sequelize.literal('case when win then 0 else 1 end')), 'defeats'],
            [Sequelize.fn('sum', Sequelize.col('kill')), 'kills'],
            [Sequelize.fn('sum', Sequelize.col('death')), 'deaths'],
            [Sequelize.fn('sum', Sequelize.col('assist')), 'assists']
        ],
        raw: true
    });

    payload.totalStat = totalStat;

    return payload;
};
