// TODO : 추후 분리해서 라우터 작성

const express = require('express');
const router = express.Router();
const game_api = require('../lol-api/game-api');
const ctrl_tournament = require('../controllers/tournaments_controller');
const ctrl_champion = require('../controllers/champions_controller');

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
router.get('/tournaments', ctrl_tournament.getTournaments);
router.get('/tournament/:id');
router.get('/tournament/:id/matches');
router.get('/tournament/:group_id/match/:match_id');

// match
router.get('/matches');
router.get('/match/:id');

// history
router.get('/history/team/:team_name');
router.get('/history/:summoner_name');

// champion
router.get('/champions', ctrl_champion.getAllChampions);
router.get('/champion/:id', ctrl_champion.getChampionById);
router.get('/champion/:name');

// register
router.post('/register/tournament');
router.post('/register/match');
router.post('/register/team');
router.post('/register/summoner');

module.exports = router;
