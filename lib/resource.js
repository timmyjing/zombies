const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

const RESOURCES_TYPE = ['bullet', 'life'];
const img = document.getElementById('powerups');

const POWERUP_SPRITE = [[0, 0, 5, 0, 25], [110, 0, 0, 0, 32]];

const RESOURCE_OPTIONS = {
  radius: 12,
  vel: [0, 0]
};

function Resource(pos, game) {
  var type = RESOURCES_TYPE[Math.floor(Math.random() * RESOURCES_TYPE.length)];
  var sprite = type === 'bullet' ? POWERUP_SPRITE[1] : POWERUP_SPRITE[0];
  var options = {
    type: type,
    radius: RESOURCE_OPTIONS.radius,
    pos: pos,
    game: game,
    vel: RESOURCE_OPTIONS.velocity,
    sprite: sprite
  }

  MovingObject.call(this, options);
}

Util.inherits(Resource, MovingObject);

Resource.prototype.draw = function() {
  this.game.ctx.drawImage(img, this.sprite[0], this.sprite[1], 100, 100, this.pos[0] - 6, this.pos[1] - 6, this.sprite[4], this.sprite[4]);
}

Resource.prototype.move = function() {
  return null;
}

module.exports = Resource;
