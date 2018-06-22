const Game = require('./game.js');
const Sound = require('./sound.js');

const train = new Sound('./sounds/train.wav');

function GameView(ctx) {
  this.game = null;
  this.ctx = ctx;
}

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
  'shift+w': [0, -1.35],
  'shift+a': [-1.35, 0],
  'shift+s': [0, 1.35],
  'shift+d': [1.35,0]
};

GameView.prototype.togglePause = function() {
  if (this.game === undefined || this.game === null) { return null};
  this.game.togglePause();
}


GameView.prototype.welcomeScreen = function() {
  this.ctx.fillStyle = 'red';
  this.ctx.font = '50px serif';
  this.ctx.fillText('Zombies!', 100, 200);
}

GameView.prototype.start = function() {
  if (this.game !== null) {
    return null;
  }
  this.game = new Game(this.ctx);
  this.game.start();
  this.bindKeyHandlers();
  this.lastTime = 0;
  this.animFrame = requestAnimationFrame(this.animate.bind(this));
}

GameView.prototype.bindKeyHandlers = function() {
  const player = this.game.player;
  Object.keys(GameView.MOVES).forEach(function(k) {
    const move = GameView.MOVES[k];

    key(k, function() { player.changeDirection(move)});
  });
  key("space", function() { player.fireBullet() });
}


GameView.prototype.renderMessage = function() {
  if (this.game.LIVES <= 0) {
    this.ctx.fillStyle = 'red';
    this.ctx.font = '50px serif';
    this.ctx.fillText('OH HOHOHOHO! DEFEAT!', 100, 200);
  } else if (this.game.getToDaChoppa()) {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '50px serif';
    this.ctx.fillText('Sweet!', 200, 200);
    this.ctx.fillText('The train takes you to safety!', 200, 250);
    train.load();
    train.play();
  }
}

GameView.prototype.animate = function(time) {
  if (this.game === undefined) {return null};
  const timeDelta = time - this.lastTime;
  if (this.game.gameOver() || this.game.getToDaChoppa()) {
    clearInterval(this.spawnIntervals);
    cancelAnimationFrame(this.animFrame);
    this.renderMessage();
    delete this.game;
  } else {
    this.game.step(timeDelta);
    this.lastTime = time;
    this.animFrame = requestAnimationFrame(this.animate.bind(this));
    this.showScore();
  }
}


GameView.prototype.showScore = function() {
  this.ctx.fillStyle = 'white';
  this.ctx.font = '20px sans-serif';
  this.ctx.fillText(this.game.LIVES + " lives", 10, 40);
  this.ctx.fillText(this.game.bullet_count + " bullets", 80, 40);
  this.ctx.fillText("Time: " + Math.floor(this.game.score / 1000), 200, 40);
}

module.exports = GameView;
