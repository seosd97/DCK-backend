const req = require('request');
const endpoint = 'https://kr.api.riotgames.com/lol/';
const key = 'RGAPI-13d08808-2bbf-497a-b54c-0d9b65db149c';

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
