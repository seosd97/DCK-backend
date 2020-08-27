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
router.get('/summoners/by_tournament/:tournament_id', ctrl_summoner.getSummonersOfTournament);
router.get('/summoners/by_team/:team_name', ctrl_summoner.getSummonersOfTeam);
router.get('/summoners/:id', ctrl_summoner.getSummonerData);
router.get('/summoners/by_name/:name', ctrl_summoner.getSummonerDataByName);

// team
router.get('/teams', ctrl_team.getAllTeams);
router.get('/teams/by_tournament/:tournament_id', ctrl_team.getTeamsOfTournament);
router.get('/teams/:name', ctrl_team.getTeamByName);

// tournament
router.get('/tournaments', ctrl_tournament.getTournaments);
router.get('/tournaments/:id', ctrl_tournament.getTournamentData);

// match
router.get('/matches', ctrl_match.getMatchesGroups);
router.get('/matches/:game_id', ctrl_match.getMatchDetailByGameId);
// router.get('/matches/detail/:game_id', ctrl_match.getMatchDetailByGameId);
router.get('/matchlists/by_matchgroup/:matchgroup_id', ctrl_match.getMatchListByMatchGroup);
router.get('/matchlists/by_team/:team_id', ctrl_match.getTeamMatchList);
router.get('/matchlists/by_summoner/:uuid', ctrl_match.getSummonerMatchList);

// statics
router.get('/statics/team/:name');
router.get('/statics/summoner/:name');

// register
router.post('/register/tournament');
router.post('/register/match');
router.post('/register/team');
router.post('/register/summoner');
router.get('/register/tournament');
router.get('/register/match');
router.get('/register/team');
router.get('/register/summoner');

module.exports = router;
