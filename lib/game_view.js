const Game = require('./game.js');

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
  this.game.paused = this.game.paused ? false : true;
}


GameView.prototype.welcomeScreen = function() {
  this.ctx.fillStyle = 'red';
  this.ctx.font = '50px serif';
  this.ctx.fillText('Zombies!', 100, 200);
  this.ctx.font = '25px serif';
  this.ctx.fillText('click anywhere to start game', 100, 300);
  this.ctx.fillText('Instructions: WSAD to move, spacebar to shoot', 100, 330);
  this.ctx.fillText('Prevent the zombies from entering the base!', 100, 360);

}

GameView.prototype.start = function() {
  if (this.game !== null) {
    return null;
  }
  this.game = new Game(this.ctx);
  this.paused = false;
  this.game.spawnPlayer();
  this.bindKeyHandlers();
  this.game.start();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
}

GameView.prototype.bindKeyHandlers = function() {
  const player = this.game.player;
  Object.keys(GameView.MOVES).forEach(function(k) {
    const move = GameView.MOVES[k];

    key(k, function() { player.changeDirection(move)});
  });
  key("space", function() { player.fireBullet() });
}


GameView.prototype.animate = function(time) {
  const timeDelta = time - this.lastTime;
  if (this.game.LIVES <= 0 ) {
    this.ctx.fillStyle = 'red';
    this.ctx.font = '50px serif';
    this.ctx.fillText('OH HOHOHOHO! DEFEAT!', 100, 200);
    this.game = null;
    clearInterval(this.spawnIntervals);
  } else {
    this.game.step(timeDelta);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
    this.showScore();
  }
}



GameView.prototype.showScore = function() {
  this.ctx.fillStyle = 'white';
  this.ctx.font = '20px sans-serif';
  this.ctx.fillText(this.game.LIVES + " lives", 0, 40);
  this.ctx.fillText(this.game.bullet_count + " bullets", 80, 40);
  this.ctx.fillText("Score: " + this.game.score, 200, 40);
}

module.exports = GameView;
