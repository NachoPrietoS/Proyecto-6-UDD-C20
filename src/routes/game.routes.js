const express = require('express');
const { getAllGames, createGame, updateGamebyId, deleteGameById } = require('../controllers/game.controller');

const gameRouter = express.Router();

gameRouter.get('/', getAllGames);
gameRouter.post('/', createGame);
gameRouter.put('/:id', updateGamebyId);
gameRouter.delete('/:id', deleteGameById);

module.exports = gameRouter;