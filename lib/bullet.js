const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

const BULLET_OPTIONS = {
  COLOR: 'orange',
  RADIUS: 2,
  SPEED: 10
};

function Bullet(pos, vector, game) {

  var options = {
    pos: pos,
    radius: BULLET_OPTIONS.RADIUS,
    color: BULLET_OPTIONS.COLOR,
    vel: [vector[0] * BULLET_OPTIONS.SPEED, vector[1] * BULLET_OPTIONS.SPEED],
    game: game
  };

  MovingObject.call(this, options)
}

Util.inherits(Bullet, MovingObject);


Bullet.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.pos[0],this.pos[1],3,3);
  // ctx.beginPath();
  // ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI);
  // ctx.stroke();
  ctx.fill();
}

module.exports = Bullet;
