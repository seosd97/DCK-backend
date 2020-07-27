// TODO : 추후 분리해서 라우터 작성

const express = require('express');
const router = express.Router();
const game_api = require('../lol-api/game-api');
const ctrl_tournament = require('../controllers/tournaments_controller');
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
router.get('/summoners/:id');
router.get('/summoners/by_name/:name', ctrl_summoner.getSummonerDataByName);

// team
router.get('/teams', ctrl_team.getAllTeams);
router.get('/teams/:name', ctrl_team.getTeamByName);
router.get('/teams/:name/summoners', ctrl_team.getSummonersOfTeam);

// tournament
router.get('/tournaments', ctrl_tournament.getTournaments);
router.get('/tournaments/:id', ctrl_tournament.getTournamentData);
router.get('/tournaments/:id/teams', ctrl_tournament.getParticipationTeams);
router.get('/tournaments/:id/summoners', ctrl_tournament.getParticipationTeams);

// match
router.get('/matches', ctrl_match.getAllMatches);
router.get('/matches/:id', ctrl_match.getMatchByGameId);
router.get('/matches/by_tournament/:id', ctrl_match.getMatchesByTournamentId);
router.get('/riot_api/matches/:id', game_api.getMatchDataFromAPI);

// history
router.get('/matches/team/:name');
router.get('/matches/summoner/:uuid', ctrl_match.getMatchBySummoner);

// statics
router.get('/statics/team/:name');
router.get('/statics/summoner/:name');

// register
router.post('/register/tournament');
router.post('/register/match');
router.post('/register/team');
router.post('/register/summoner');

module.exports = router;
