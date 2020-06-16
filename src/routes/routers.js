// TODO : 추후 분리해서 라우터 작성

const express = require('express');
const router = express.Router();
const game_api = require('../lol-api/game-api');
const ctrl_tournament = require('../controllers/tournaments_controller');
const ctrl_champion = require('../controllers/champions_controller');
const ctrl_match = require('../controllers/matches_controller');
const ctrl_team = require('../controllers/teams_controller');
const ctrl_summoner = require('../controllers/summoners_controller');

router.get('/', (req, res) => {
    res.send(
        '<div style="font-family: monospace; white-space: pre; margin: 0 auto;">' +
            ' _____     ______     __  __        __  __     __     ______     ______   ______     ______     __  __    <br>' +
            '/\\  __-.  /\\  ___\\   /\\ \\/ /       /\\ \\_\\ \\   /\\ \\   /\\  ___\\   /\\__  _\\ /\\  __ \\   /\\  == \\   /\\ \\_\\ \\   <br>' +
            '\\ \\ \\/\\ \\ \\ \\ \\____  \\ \\  _"-.     \\ \\  __ \\  \\ \\ \\  \\ \\___  \\  \\/_/\\ \\/ \\ \\ \\/\\ \\  \\ \\  __<   \\ \\____ \\  <br>' +
            ' \\ \\____-  \\ \\_____\\  \\ \\_\\ \\_\\     \\ \\_\\ \\_\\  \\ \\_\\  \\/\\_____\\    \\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\/\\_____\\ <br>' +
            '  \\/____/   \\/_____/   \\/_/\\/_/      \\/_/\\/_/   \\/_/   \\/_____/     \\/_/   \\/_____/   \\/_/ /_/   \\/_____/ <br>' +
            '                                                                                                          <br>' +
            '</div>'
    );
});

// summoner
router.get('/summoners', ctrl_summoner.getAllSummoners);
router.post('/summoners');
router.get('/summoner/register');
router.get('/summoner/:name', ctrl_summoner.getSummonerByName);

// team
router.get('/teams', ctrl_team.getAllTeams);
router.post('/teams');
router.get('/teams/:group_id', ctrl_team.getTeamByGroupId);
router.get('/team/:name', ctrl_team.getTeamInfo);
router.get('/team/:name/summoners', ctrl_team.getSummonersOfTeam);
router.get('/team/register');

// tournament
router.post('/tournaments');
router.get('/tournaments', ctrl_tournament.getTournaments);
router.get('/tournament/:id', ctrl_tournament.getTournamentData);
router.get('/tournament/:id/matches');
router.get('/tournament/:group_id/match/:match_id');

// match
router.get('/matches', ctrl_match.getAllMatches);
router.get('/match/:id', ctrl_match.getMatchByGameId);
router.get('/riotapi/match/:id', game_api.getMatchDataFromAPI);

// history
router.get('/history/team/:team_name');
router.get('/history/:summoner_name');

// champion
// router.get('/champions', ctrl_champion.getAllChampions);
// router.get('/champion/:id', ctrl_champion.getChampionById);
// router.get('/champion/:name', ctrl_champion.getChampionByName);

// register
router.post('/register/tournament');
router.post('/register/match');
router.post('/register/team');
router.post('/register/summoner');

module.exports = router;
