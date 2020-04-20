const req = require('request');
const endpoint = 'https://kr.api.riotgames.com/lol/';
const key = 'RGAPI-cf6af816-5b6d-47f1-a4bc-3b3d99137bde';

const riotReq = req.defaults({
    headers: {
        'X-Riot-Token': key
    }
});

exports.getMatchData = (id, callback) => {
    riotReq(endpoint + `match/v4/matches/${id}`, (err, res) => {
        callback(err, res.body);
    });
};

exports.getSummonerByName = (name, callback) => {
    riotReq(endpoint + `summoner/v4/summoners/by-name/${name}`, (err, res) => {
        callback(err, res.body);
    });
};
