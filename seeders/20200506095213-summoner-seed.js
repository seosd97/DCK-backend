'use strict';

const game_api = require('../src/lol-api/game-api');
const userList = [
    '제퇴기',
    '수박송송',
    '정확신속고급남탓',
    '석진인데요',
    'High Bright Hero',
    '주님하나더가요',
    '잔잔맨',
    '뽀로똥멍청이',
    '12시 20분',
    '편안한 승차감',
    'Dopa kr',
    '오재용',
    'BlTCH Vayne',
    'NaDiapla',
    '라면꼬들꼬들',
    '183cm 미남',
    '김우석사냥꾼',
    'n0 die plz',
    'GlenCheck',
    '안전한 이불안',
    '하얀냥',
    '팀운좋아질꺼얌',
    '세계최강양희성',
    '로리아리',
    '예니하',
    '여1준',
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
