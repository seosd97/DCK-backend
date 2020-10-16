const req = require('request-promise');
const endpoint = 'http://ddragon.leagueoflegends.com/cdn/';
const lang = 'ko_KR';
const key = process.env.API_KEY;

const riotReq = req.defaults({
    headers: {
        'X-Riot-Token': key
    }
});

let championList = null;
let gameVersion = null;

exports.gameVersion = gameVersion;

exports.preloadData = async () => {
    const version = await req.get('https://ddragon.leagueoflegends.com/api/versions.json');
    if (version == null) {
        console.log('failed to load game version');
        return false;
    }
    gameVersion = JSON.parse(version)[0];

    console.log(gameVersion);
    const championData = await riotReq(endpoint + `${gameVersion}/data/${lang}/champion.json`);
    if (championData == null) {
        console.log('failed to load champion.json');
        return false;
    }
    championList = JSON.parse(championData).data;

    console.log('success to load game data');
    return true;
};

exports.getChampionData = id => {
    for (let i in championList) {
        if (championList[i].key === `${id}`) {
            return championList[i];
        }
    }

    return null;
};
