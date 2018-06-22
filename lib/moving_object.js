
function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.orientation = options.orientation;
  this.game = options.game;
  this.sprite = options.sprite;
  this.type = options.type;
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

MovingObject.prototype.draw = function(ctx) {
  ctx.drawImage(img, this.sprite[0], this.sprite[1], 100, 100, this.pos[0] - 20, this.pos[1] - 20, 40, 40)
}

MovingObject.prototype.move = function(timeDelta) {
  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;
  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
}


MovingObject.prototype.isCollidedWith = function(other) {
  var dx = this.pos[0] - other.pos[0];
  var dy = this.pos[1] - other.pos[1];
  var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  var diffCenter = (other.radius + this.radius);
  return (distance < diffCenter);
}


MovingObject.prototype.validPosition = function() {
  var inBounds = !(this.pos[0] > this.game.DIM_X || this.pos[0] < 0 || this.pos[1] < 0 || this.pos[1] > this.game.DIM_Y);
  return inBounds;
};

module.exports = MovingObject;
