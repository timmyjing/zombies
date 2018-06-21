const MovingObject = require('./moving_object.js');
const Util = require('./util.js');

const RESOURCES_TYPE = ['bullet', 'life'];

const RESOURCE_OPTIONS = {
  color: 'red',
  radius: 5,
  vel: [0, 0]
};

function Resource(pos, game) {
  var type = RESOURCES_TYPE[Math.floor(Math.random() * RESOURCES_TYPE.length)];
  var color = type === 'bullet' ? 'black' : 'green';
  var options = {
    type: type,
    color: color,
    radius: RESOURCE_OPTIONS.radius,
    pos: pos,
    game: game,
    vel: RESOURCE_OPTIONS.velocity
  }

  MovingObject.call(this, options);
}

Util.inherits(Resource, MovingObject);

Resource.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
}

Resource.prototype.move = function() {
  return null;
}

module.exports = Resource;
