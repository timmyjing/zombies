const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');
const Sound = require('./sound.js');


const PLAYER_SPRITE = [[4,0],[335,0],[120,3],[230,3]];
const glockSound = new Sound('./sounds/glock.wav');

const PLAYER_OPTIONS = {
  SPEED: 10,
  RADIUS: 15,
  POS: [400, 300],
  ORIENTATION: [0, 1],
  // UP DOWN RIGHT LEFT
  SPRITE: PLAYER_SPRITE[1]
};


function Player(game) {
  var options = {
    pos: PLAYER_OPTIONS.POS,
    color: PLAYER_OPTIONS.COLOR,
    vel: [0,0],
    radius: PLAYER_OPTIONS.RADIUS,
    orientation: PLAYER_OPTIONS.ORIENTATION,
    game: game,
    sprite: PLAYER_OPTIONS.SPRITE
  };

  MovingObject.call(this, options);
}


Util.inherits(Player, MovingObject);

Player.prototype.changeDirection = function(direction) {
  if (this.game.paused) { return null };
  var oldPos = this.pos;
  this.pos = [this.pos[0] + (direction[0] * 20), this.pos[1] + (direction[1] * 20)];
  if (!this.validPosition()) {
    this.pos = oldPos;
  }
  this.orientation = direction;
  this.updateSprite();
}

Player.prototype.updateSprite = function() {

  if (this.orientation[1] >= 1) {
    this.sprite = PLAYER_SPRITE[1];
  } else if (this.orientation[1] <= -1) {
    this.sprite = PLAYER_SPRITE[0];
  } else if (this.orientation[0] >= 1) {
    this.sprite = PLAYER_SPRITE[2];
  } else if (this.orientation[0] <= -1) {
    this.sprite = PLAYER_SPRITE[3];
  }
}

Player.prototype.fireBullet = function() {
  if (this.game.bullet_count > 0) {
    var bullet = new Bullet(this.pos, this.orientation, this.game);
    this.game.bullets.push(bullet);
    glockSound.load();
    glockSound.play();
    this.game.bullet_count--;
  }
}


module.exports = Player;
