const req = require('request');
const endpoint = 'http://ddragon.leagueoflegends.com/cdn/';
const lang = 'ko_KR';
const gameVersion = '10.8.1';
const key = 'RGAPI-77e6f06b-65f9-4fcb-941e-1795e09f6a15';

const riotReq = req.defaults({
    headers: {
        'X-Riot-Token': key
    }
});

// NOTE : Champion은 제공하는 json으로 자체 DB를 구축해서 찾도록 함
exports.getAllChampionData = callback => {
    riotReq(endpoint + `${gameVersion}/data/${lang}/champion.json`, (err, res) => {
        callback(err, res.body);
    });
};
