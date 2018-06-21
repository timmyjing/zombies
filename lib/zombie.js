const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

const ZOMBIE_SPRITE = [[130,130],[340,125],[10,130],[230,130]];
const ZOMBIE_OPTIONS = {
  COLOR: 'green',
  SPEED: 1,
  RADIUS: 15
};


function Zombie(pos, game) {
  var vector = Util.vector(pos, [game.player.pos[0], game.player.pos[1]]);
  var sprite = vector[0] > 0 ? ZOMBIE_SPRITE[2] : ZOMBIE_SPRITE[3];
  var options = {
    pos: pos,
    color: ZOMBIE_OPTIONS.COLOR,
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
  this.pos = [this.pos[0] + vector[0], this.pos[1] + vector[1]];
}

Zombie.prototype.validPosition = function() {
  var inBounds = !(this.pos[0] > this.game.DIM_X || this.pos[0] < 0 || this.pos[1] < 0 || this.pos[1] > this.game.DIM_Y);
  var notInBase = !((this.pos[0] > (this.game.BASE_X) && (this.pos[0] < (this.game.BASE_X + 100))) && ((this.pos[1] > this.game.BASE_Y)
    && (this.pos[1] < this.game.BASE_Y + 100)));
  return inBounds && notInBase;
}


module.exports = Zombie;
