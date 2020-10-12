const express = require('express');
const cors = require('cors');
const dataApi = require('./lol-api/data-api');
const app = express();
const router = require('./routes/routers');
const db = require('./../models').sequelize;
const port = 8080;

app.use(cors());
app.use(router);

const init = async () => {
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

    if (await !dataApi.preloadData()) {
        console.log('failed to cache data');
        process.exit();
    }
};

(async () => {
    await init();
})();

app.listen(port, () => {
    console.log(`express listening at port ${port}`);
});
