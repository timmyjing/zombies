const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

const ZOMBIE_SPRITE = [[130,130],[340,125],[20,130],[230,130]];
const ZOMBIE_OPTIONS = {
  SPEED: 0.85,
  RADIUS: 15
};


function Zombie(pos, game) {
  var vector = Util.vector(pos, [game.player.pos[0], game.player.pos[1]]);
  var sprite = vector[0] > 0 ? ZOMBIE_SPRITE[2] : ZOMBIE_SPRITE[3];
  var options = {
    pos: pos,
    vel: [vector[0] * ZOMBIE_OPTIONS.SPEED, vector[1] * ZOMBIE_OPTIONS.SPEED],
    radius: ZOMBIE_OPTIONS.RADIUS,
    orientation: [vector[0], vector[1]],
    game: game,
    sprite: sprite
  }

  MovingObject.call(this, options);
}

Util.inherits(Zombie, MovingObject);


Zombie.prototype.move = function() {
  var vector = Util.vector(this.pos, [this.game.player.pos[0], this.game.player.pos[1]]);
  this.updateSprite(vector);
  this.pos = [this.pos[0] + vector[0], this.pos[1] + vector[1]];
}

Zombie.prototype.updateSprite = function(vector) {
  if (vector[1] > 0.8 && vector[0] < 0.3) {
    this.sprite = ZOMBIE_SPRITE[1];
  } else if (vector[1] < -0.8 && vector[0] < 0.3) {
    this.sprite = ZOMBIE_SPRITE[0];
  } else if (vector[0] > 0.6) {
    this.sprite = ZOMBIE_SPRITE[2];
  } else if (vector[0] < -0.6){
    this.sprite = ZOMBIE_SPRITE[3];
  }
}

module.exports = Zombie;
