'use strict';
const { Team, Summoner } = require('../models');

const bulkData = [
    {
        team: '석진팀',
        summoners: ['석진인데요', '정확신속고급남탓', '하리흰', '수박송송', '제퇴기']
    },
    {
        team: '수빈팀',
        summoners: ['주님하나더가요', '잔잔맨', 'Unslaad Brii', '12시 20분', '편안한승차감']
    },
    { team: '진희팀', summoners: ['Dopa KR', '오재용', 'BlTCH Vayne', 'NaDiapla', '라면꼬들꼬들'] },
    {
        team: '승덕팀',
        summoners: ['183cm미남', 'ZEDDDD99', '          김체원', 'GlenCheck', '안전한이불안']
    },
    {
        team: '동훈팀',
        summoners: ['편안한승차감', 'GlenCheck', '수박송송', '안전한이불안', '          김체원']
    },
    { team: '태우팀', summoners: ['제퇴기', 'Unslaad Brii', '183cm미남', '석진인데요', '오재용'] },
    {
        team: '유환팀',
        summoners: ['ZEDDDD99', '잔잔맨', '라면꼬들꼬들', '팀운좋아질꺼얌', 'BlTCH Vayne']
    },
    {
        team: '슬한팀',
        summoners: ['Dopa KR', 'NaDiapla', '정확신속고급남탓', '하얀냥', '12시 20분']
    },
    {
        team: '민기야 잘하자',
        summoners: ['라면꼬들꼬들', 'Unslaad Brii', '예니하', 'Reyes', '1031 Song']
    },
    {
        team: '현욱이도 이길 수 있는 팀',
        summoners: ['NaDiapla', '잔잔맨', '석진인데요', '룰루는 버스나 타', '세계최강양희성']
    },
    {
        team:
            '월계신유환 마포인지 정왕인지 모를 박태영 구리하준민 서울대입구박성용 증산박상혁과 함께하는 dck팀',
        summoners: ['ZEDDDD99', '          김체원', '안전한이불안', '매우어려운게임', '태0꿍']
    },
    {
        team: '아웃백 좀 그만와라',
        summoners: ['GlenCheck', '183cm미남', '로리 아리', '베이스볼', '팀운좋아질꺼얌']
    }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let results = [];
        for (let i in bulkData) {
            const data = bulkData[i];
            const team = await Team.findOne({
                where: {
                    name: data.team
                }
            });

            if (team === null) {
                console.log('team name is  invalid');
                continue;
            }

            for (let j in data.summoners) {
                const summoner = data.summoners[j];
                const summonerData = await Summoner.findOne({
                    where: {
                        name: summoner
                    }
                });

                results.push({
                    TeamId: team.id,
                    summoner_uuid: summonerData.uuid,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
        }

        return queryInterface.bulkInsert('SummonerTeams', results);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('SummonerTeams', null);
    }
};
