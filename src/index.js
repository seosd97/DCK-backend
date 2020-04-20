const express = require('express');
const game_api = require('./lol-api/game-api');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    game_api.getMatchData(4036701994, (err, data) => {
        if (err) {
            console.log('failed to get march data');
            return;
        }

        const matchData = JSON.parse(data);
        res.send(matchData.platformId);
    });
});

app.listen(port, () => {
    console.log(`express listening at port ${port}`);
});
