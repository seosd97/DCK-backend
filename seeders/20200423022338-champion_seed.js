'use strict';
const data_api = require('./../src/lol-api/data-api');

module.exports = {
    up: (queryInterface, Sequelize) => {
        let result = [];
        return new Promise((resolve, reject) => {
            data_api.getAllChampionData((err, res) => {
                if (err) {
                    reject();
                }

                const list = JSON.parse(res).data;
                for (let i in list) {
                    const data = list[i];
                    const champ = {
                        cid: data.id,
                        name: data.name,
                        key: data.key,
                        splash_img: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.id}_0.jpg`,
                        loading_img: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.id}_0.jpg`,
                        portrait_img: `http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/${data.id}.png`,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };

                    result.push(champ);
                }

                resolve();
            });
        })
            .then(() => {
                return queryInterface.bulkInsert('Champions', result, {});
            })
            .catch(err => {
                console.log(err);
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Champions', null, {});
    }
};
