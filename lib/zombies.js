const Game = require('./game.js');
const Zombie = require('./zombie.js');
const MovingObject = require('./moving_object.js');
const GameView = require('./game_view.js');

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const train = document.getElementById('train');
  var gameview = new GameView(ctx);
  const song = document.getElementById('background');

  canvas.addEventListener('click', function(event) {
    if (event && gameview.game !== null) {
      gameview.togglePause();
    }

    if (event && gameview.game === null) {
      gameview.start();
    }

    if (event && gameview.game === undefined) {
      gameview = new GameView(ctx);
      gameview.start();
    }
  });

  document.addEventListener('keypress', function(event) {
      event.preventDefault();
      if (event.key === "m") {
        song.muted = !song.muted;
      }
  });
  // gameview.welcomeScreen();
  gameview.renderMessage();
});
