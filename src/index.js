const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const dataApi = require('./lol-api/data-api');
const app = express();
const router = require('./routes/routers');
const db = require('./../models').sequelize;
const port = process.env.SERVER_PORT || 443;

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

const option =
    process.env.NODE_ENV === 'production'
        ? {
            key: fs.readFileSync('/opt/bitnami/apache2/conf/api.dcklol.com.key'),
            cert: fs.readFileSync('/opt/bitnami/apache2/conf/api.dcklol.com.crt')
        }
        : undefined;

option
    ? https.createServer(option, app).listen(port, () => {
        console.log(`http server on port ${port}`);
    })
    : http.createServer(app).listen(port, () => {
        console.log(`http server on port ${port}`);
    });
