const express = require('express');
const game_api = require('./lol-api/game-api');
const app = express();
const router = require('./router/routers');
const db = require('./../models').sequelize;
const port = 3001;

app.use(router);

(async () => {
    await db
        .sync({ alter: true })
        .then(() => {
            console.log('db synchronize finished');
        })
        .catch(err => {
            console.log(err);
        });
})();

app.listen(port, () => {
    console.log(`express listening at port ${port}`);
});
