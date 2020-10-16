'use strict';
const { Team, Summoner } = require('../models');

const bulkData = [
    {
        team: '석진팀',
        summoners: [
            'SbUkq2j3PQRhdqlI7PxEDLpOGOywN3vXvrZgt2pMlrvwFA',
            'MBno6ryqTt0Xij1QInqpK-jdzAxO2jcrFItjJywNhQKA-A',
            '8nliV-V783RRFNX44aU8PJaxIIx2NOhcU3m-oJzU8vETFoA',
            '45sm6ZKvSw4lU20rGsaNBDZoDBv0okXYXG3Jemtd25AoS6E',
            'cJ-AUvUbrYSRUR7l0Q0a555gAsM7N9lMVecnTrcZt0n6_mE'
        ]
    },
    {
        team: '수빈팀',
        summoners: [
            'zY4vVZ981vqRqm0RaN9XOCysTIFD5wCiaB3PhZOvjRdaAQ',
            'u3-xDuezI_CBWP6h6B_vbBRb6BuuMy52eRWqQjdU-DcoJSg',
            'XlPdgGpiqLKIW6l2rpQ22iZyYGDwkbcdWzNMEci0yMNz1Q',
            'slmHI1IPQ9pAxh-8PtqoRzgcg48S7qRgFDNQxu2Xb23wtGQ',
            'vyZLe7D--lpwDJrqhW97jUc7HuDUvR5ATVjuKgyyiHCQFl8'
        ]
    },
    {
        team: '진희팀',
        summoners: [
            'D_tvCWAr5_LuNGuWupB1C8IbKhstpFk4H2hsEY4mvrtLNQ',
            'yGAQ1GYM56tONXv5w0jQFV7USHTgbX2h8Bw8Qh0Zegaj1bo',
            'k42NvYLWEHRVQ7Abjv6aUWZmHYjYeOlgB9Zem28pxrfhOg',
            'RIBnRwOof_qHcYbOurqxIEeyzu0Iw7_rD1h6S_FUnlxuXA',
            '07AY4_jm3qDZnWzDZqTPzU9ed3TRapqniZeEQ5xu8whgKZQ'
        ]
    },
    {
        team: '승덕팀',
        summoners: [
            'TbDkzPibrQFFeq1N3TbPQA-VEG9zvgG8WQ0tWPGdpkIGBaA',
            'CO-rGAwswdYIlYCHRoozdn6_DUr-JYxnc0-DiN-Y_sWsyw',
            '3cSMzHxcw_fVyagmoPdQJioiHJLTD7QdwJN4mzAduY8KC70',
            'As1OE9KJJ10fcQQL2gM45JBbvctAhFFKXt9-RTeql582BA',
            'ZXeSmxd08fxCJktqse5gsPbJ0zpdg9RLy2hIit8nm0I9Qg'
        ]
    },
    {
        team: '동훈팀',
        summoners: [
            'vyZLe7D--lpwDJrqhW97jUc7HuDUvR5ATVjuKgyyiHCQFl8',
            'As1OE9KJJ10fcQQL2gM45JBbvctAhFFKXt9-RTeql582BA',
            '45sm6ZKvSw4lU20rGsaNBDZoDBv0okXYXG3Jemtd25AoS6E',
            'ZXeSmxd08fxCJktqse5gsPbJ0zpdg9RLy2hIit8nm0I9Qg',
            '3cSMzHxcw_fVyagmoPdQJioiHJLTD7QdwJN4mzAduY8KC70'
        ]
    },
    {
        team: '태우팀',
        summoners: [
            'cJ-AUvUbrYSRUR7l0Q0a555gAsM7N9lMVecnTrcZt0n6_mE',
            'XlPdgGpiqLKIW6l2rpQ22iZyYGDwkbcdWzNMEci0yMNz1Q',
            'TbDkzPibrQFFeq1N3TbPQA-VEG9zvgG8WQ0tWPGdpkIGBaA',
            'SbUkq2j3PQRhdqlI7PxEDLpOGOywN3vXvrZgt2pMlrvwFA',
            'yGAQ1GYM56tONXv5w0jQFV7USHTgbX2h8Bw8Qh0Zegaj1bo'
        ]
    },
    {
        team: '유환팀',
        summoners: [
            'CO-rGAwswdYIlYCHRoozdn6_DUr-JYxnc0-DiN-Y_sWsyw',
            'u3-xDuezI_CBWP6h6B_vbBRb6BuuMy52eRWqQjdU-DcoJSg',
            '07AY4_jm3qDZnWzDZqTPzU9ed3TRapqniZeEQ5xu8whgKZQ',
            'yBe7u6byd3nZqGfqxmRY-0VC06_lNVehcqmD-kuDATjaZW8',
            'k42NvYLWEHRVQ7Abjv6aUWZmHYjYeOlgB9Zem28pxrfhOg'
        ]
    },
    {
        team: '슬한팀',
        summoners: [
            'D_tvCWAr5_LuNGuWupB1C8IbKhstpFk4H2hsEY4mvrtLNQ',
            'RIBnRwOof_qHcYbOurqxIEeyzu0Iw7_rD1h6S_FUnlxuXA',
            'MBno6ryqTt0Xij1QInqpK-jdzAxO2jcrFItjJywNhQKA-A',
            'oh5ClPyijzV2g8ikeE0o1Bb_TbdeIeNzvy2V8IZy5VERCA',
            'slmHI1IPQ9pAxh-8PtqoRzgcg48S7qRgFDNQxu2Xb23wtGQ'
        ]
    },
    {
        team: '민기야 잘하자',
        summoners: [
            '07AY4_jm3qDZnWzDZqTPzU9ed3TRapqniZeEQ5xu8whgKZQ',
            'XlPdgGpiqLKIW6l2rpQ22iZyYGDwkbcdWzNMEci0yMNz1Q',
            'mJAaG546gLR9hl5sYtWTuAkVICWJ9NZrL1yERqBRwvsCf-o',
            'PWxoR5Yw7yQ44Lgeq4_-Z58C6Lr4km65HO-miYhs2iUy_w',
            'SG60blS_xjmWSmZbU6dQEPBRZSupscfwF7UunodHppQNjHU'
        ]
    },
    {
        team: '현욱이도 이길 수 있는 팀',
        summoners: [
            'RIBnRwOof_qHcYbOurqxIEeyzu0Iw7_rD1h6S_FUnlxuXA',
            'u3-xDuezI_CBWP6h6B_vbBRb6BuuMy52eRWqQjdU-DcoJSg',
            'SbUkq2j3PQRhdqlI7PxEDLpOGOywN3vXvrZgt2pMlrvwFA',
            '_LSLqZRd4kCyuNMtPtiXPj7GBewd1z9EsqJeE8tMJMn99w',
            '1INgWfZyrwXq8U7q9GJ5CYe4VtIzd4pTuvJ0ZYpaICI_Qg'
        ]
    },
    {
        team:
            '월계신유환 마포인지 정왕인지 모를 박태영 구리하준민 서울대입구박성용 증산박상혁과 함께하는 dck팀',
        summoners: [
            'CO-rGAwswdYIlYCHRoozdn6_DUr-JYxnc0-DiN-Y_sWsyw',
            '3cSMzHxcw_fVyagmoPdQJioiHJLTD7QdwJN4mzAduY8KC70',
            'ZXeSmxd08fxCJktqse5gsPbJ0zpdg9RLy2hIit8nm0I9Qg',
            'Plnw8V_OJ5crZH-JxyWBpenfwFjMq2yeYepeOoKiDnjQ2b0',
            'ny-C80Q6N3sdsV2TWuajx3vc9vA46v_KmQbFxKMOv-r2UA'
        ]
    },
    {
        team: '아웃백 좀 그만와라',
        summoners: [
            'As1OE9KJJ10fcQQL2gM45JBbvctAhFFKXt9-RTeql582BA',
            'TbDkzPibrQFFeq1N3TbPQA-VEG9zvgG8WQ0tWPGdpkIGBaA',
            'LLhLI2X_vQYpcItLgwo0tGMm2MU_IkYc7bPc3CaNM0E7Qx8',
            'Yp7txav8JxBv1OF_dkR2qe_BGoKm-tz4ITGMWxb_PNCI3Q',
            'yBe7u6byd3nZqGfqxmRY-0VC06_lNVehcqmD-kuDATjaZW8'
        ]
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
