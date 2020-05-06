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
