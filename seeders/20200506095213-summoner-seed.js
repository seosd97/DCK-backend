'use strict';

const game_api = require('../src/lol-api/game-api');
const userList = [
    '_LSLqZRd4kCyuNMtPtiXPj7GBewd1z9EsqJeE8tMJMn99w',
    '07AY4_jm3qDZnWzDZqTPzU9ed3TRapqniZeEQ5xu8whgKZQ',
    '1INgWfZyrwXq8U7q9GJ5CYe4VtIzd4pTuvJ0ZYpaICI_Qg',
    '3cSMzHxcw_fVyagmoPdQJioiHJLTD7QdwJN4mzAduY8KC70',
    '45sm6ZKvSw4lU20rGsaNBDZoDBv0okXYXG3Jemtd25AoS6E',
    '8nliV-V783RRFNX44aU8PJaxIIx2NOhcU3m-oJzU8vETFoA',
    'As1OE9KJJ10fcQQL2gM45JBbvctAhFFKXt9-RTeql582BA',
    'cJ-AUvUbrYSRUR7l0Q0a555gAsM7N9lMVecnTrcZt0n6_mE',
    'CO-rGAwswdYIlYCHRoozdn6_DUr-JYxnc0-DiN-Y_sWsyw',
    'D_tvCWAr5_LuNGuWupB1C8IbKhstpFk4H2hsEY4mvrtLNQ',
    'k42NvYLWEHRVQ7Abjv6aUWZmHYjYeOlgB9Zem28pxrfhOg',
    'LLhLI2X_vQYpcItLgwo0tGMm2MU_IkYc7bPc3CaNM0E7Qx8',
    'MBno6ryqTt0Xij1QInqpK-jdzAxO2jcrFItjJywNhQKA-A',
    'mJAaG546gLR9hl5sYtWTuAkVICWJ9NZrL1yERqBRwvsCf-o',
    'ny-C80Q6N3sdsV2TWuajx3vc9vA46v_KmQbFxKMOv-r2UA',
    'oh5ClPyijzV2g8ikeE0o1Bb_TbdeIeNzvy2V8IZy5VERCA',
    'Plnw8V_OJ5crZH-JxyWBpenfwFjMq2yeYepeOoKiDnjQ2b0',
    'PWxoR5Yw7yQ44Lgeq4_-Z58C6Lr4km65HO-miYhs2iUy_w',
    'RIBnRwOof_qHcYbOurqxIEeyzu0Iw7_rD1h6S_FUnlxuXA',
    'SbUkq2j3PQRhdqlI7PxEDLpOGOywN3vXvrZgt2pMlrvwFA',
    'SG60blS_xjmWSmZbU6dQEPBRZSupscfwF7UunodHppQNjHU',
    'slmHI1IPQ9pAxh-8PtqoRzgcg48S7qRgFDNQxu2Xb23wtGQ',
    'TbDkzPibrQFFeq1N3TbPQA-VEG9zvgG8WQ0tWPGdpkIGBaA',
    'u3-xDuezI_CBWP6h6B_vbBRb6BuuMy52eRWqQjdU-DcoJSg',
    'vyZLe7D--lpwDJrqhW97jUc7HuDUvR5ATVjuKgyyiHCQFl8',
    'XlPdgGpiqLKIW6l2rpQ22iZyYGDwkbcdWzNMEci0yMNz1Q',
    'yBe7u6byd3nZqGfqxmRY-0VC06_lNVehcqmD-kuDATjaZW8',
    'yGAQ1GYM56tONXv5w0jQFV7USHTgbX2h8Bw8Qh0Zegaj1bo',
    'Yp7txav8JxBv1OF_dkR2qe_BGoKm-tz4ITGMWxb_PNCI3Q',
    'ZXeSmxd08fxCJktqse5gsPbJ0zpdg9RLy2hIit8nm0I9Qg',
    'zY4vVZ981vqRqm0RaN9XOCysTIFD5wCiaB3PhZOvjRdaAQ'
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let result = [];

        for (let i in userList) {
            const res = await game_api.getSummoner(userList[i]);

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
