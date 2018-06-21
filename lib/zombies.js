console.log("Webpack is working!");
const Game = require('./game.js');
const Zombie = require('./zombie.js');
const MovingObject = require('./moving_object.js');
const GameView = require('./game_view.js');

const canvas = document.getElementById('canvas');
window.ctx = canvas.getContext('2d');
const img = document.getElementById('sprite');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
window.img = img;

document.addEventListener('DOMContentLoaded', function() {
  const gameview = new GameView(ctx);
  gameview.welcomeScreen();
  window.game = gameview;

  canvas.addEventListener('click', function(event) {
    if (event && gameview.game !== null) {
      gameview.togglePause();
    }
    if (event && gameview.game === null) {
      gameview.start();
    }

  });

  document.addEventListener('keypress', function(event) {
      event.preventDefault();
  });
});
