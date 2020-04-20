const req = require('request');
const endpoint = 'http://ddragon.leagueoflegends.com/cdn/';
const lang = 'ko_KR';
const gameVersion = '10.8.1';
const key = 'RGAPI-cf6af816-5b6d-47f1-a4bc-3b3d99137bde';

const riotReq = req.defaults({
    headers: {
        'X-Riot-Token': key
    }
});

// NOTE : Champion은 제공하는 json으로 자체 DB를 구축해서 찾도록 함
exports.getChampionData = id => {};
