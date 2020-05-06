'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Teams', [
            {
                name: '석진팀',
                TournamentGroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '수빈팀',
                TournamentGroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '진희팀',
                TournamentGroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '승덕팀',
                TournamentGroupId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '동훈팀',
                TournamentGroupId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '태우팀',
                TournamentGroupId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '슬한팀',
                TournamentGroupId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '유환팀',
                TournamentGroupId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '민기야 잘하자',
                TournamentGroupId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '현욱이도 이길 수 있는 팀',
                TournamentGroupId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name:
                    '월계신유환 마포인지 정왕인지 모를 박태영 구리하준민 서울대입구박성용 증산박상혁과 함께하는 dck팀',
                TournamentGroupId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: '아웃백 좀 그만와라',
                TournamentGroupId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Teams', null, {});
    }
};
