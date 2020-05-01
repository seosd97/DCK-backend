const express = require('express');
const cors = require('cors');
const game_api = require('./lol-api/game-api');
const app = express();
const router = require('./routes/routers');
const db = require('./../models').sequelize;
const port = 8080;

app.use(cors());
app.use(router);

(async () => {
    await db
        .sync({ alter: true })
        .then(() => {
            console.log('db synchronize success');
        })
        .catch(err => {
            console.log('db synchronize failed');
            console.log(err);
            process.exit();
        });
})();

app.listen(port, () => {
    console.log(`express listening at port ${port}`);
});
