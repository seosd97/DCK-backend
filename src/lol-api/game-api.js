const req = require('request');
const endpoint = 'https://kr.api.riotgames.com/lol/';
const key = 'RGAPI-77e6f06b-65f9-4fcb-941e-1795e09f6a15';

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
