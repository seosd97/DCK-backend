// TODO : 추후 분리해서 라우터 작성

const express = require('express');
const router = express.Router();
const game_api = require('./../lol-api/game-api');

router.get('/', (req, res) => {
    game_api.getMatchData(4036701994, (err, data) => {
        if (err) {
            console.log('failed to get march data');
            return;
        }
        const matchData = JSON.parse(data);
        res.send(matchData.platformId);
    });
});

// summoner
router.get('/summoners');
router.post('/summoners');
router.get('/summoner/register');
router.get('/summoner/:name');

// team
router.get('/teams');
router.post('/teams');
router.get('/teams/:group_id');
router.get('/team/register');
router.get('/team/:name');
router.get('/team/:name/summoners');

// tournament
router.post('/tournaments');
router.get('/tournament/register');
router.get('/tournament/:id');
router.get('/tournament/:id/matches');
router.get('/tournament/:group_id/match/:match_id');

// match
router.get('/matches');
router.get('/match/:id');

// history
router.get('history/team/:team_name');
router.get('history/:summoner_name');

module.exports = router;
