'use strict';

const game_api = require('../src/lol-api/game-api');
const userList = [
    '제퇴기',
    '수박송송',
    '정확신속고급남탓',
    '석진인데요',
    '하리흰',
    '주님하나더가요',
    '잔잔맨',
    'Unslaad Brii',
    '12시 20분',
    '편안한 승차감',
    'Dopa kr',
    '오재용',
    'BlTCH Vayne',
    'NaDiapla',
    '라면꼬들꼬들',
    '183cm 미남',
    'ZEDDDD99',
    '김체원',
    'GlenCheck',
    '안전한 이불안',
    '하얀냥',
    '팀운좋아질꺼얌',
    '세계최강양희성',
    '로리아리',
    '예니하',
    '룰루는 버스나 타',
    '매우어려운게임',
    '베이스볼',
    'Reyes',
    '1031 Song',
    '태0꿍'
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let result = [];

        for (let i in userList) {
            const res = await game_api.getSummonerByName(userList[i]);

            const data = JSON.parse(res);
            const userData = {
                uuid: data.id,
                account_id: data.accountId,
                name: data.name,
                profile_icon_id: data.profileIconId,
                revision_date: data.revisionDate,
                summoner_level: data.summonerLevel,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            result.push(userData);
        }

        return queryInterface.bulkInsert('Summoners', result, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Summoners', null, {});
    }
};
