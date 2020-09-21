const req = require('request-promise');
const endpoint = 'https://kr.api.riotgames.com/lol/';

exports.getMatchData = id => {
    return req
        .get(endpoint + `match/v4/matches/${id}`, {
            headers: {
                'X-Riot-Token': process.env.API_KEY
            }
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMatchDataFromAPI = async (req, res) => {
    const id = req.params.id;
    const data = await this.getMatchData(id);

    res.json(data);
};

exports.getSummoner = uuid => {
    return req
        .get(endpoint + `summoner/v4/summoners/${uuid}`, {
            headers: {
                'X-Riot-Token': process.env.API_KEY
            }
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
            return { msg: err };
        });
};

exports.getSummonerByName = name => {
    return req
        .get(endpoint + `summoner/v4/summoners/by-name/${encodeURI(name)}`, {
            headers: {
                'X-Riot-Token': process.env.API_KEY
            }
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};
