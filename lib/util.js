const Util = {
  inherits(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
  },
  vector(start, end) {
    var dx = end[0] - start[0];
    var dy = end[1] - start[1];
    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return [dx / distance, dy / distance];
  }
};

module.exports = Util;
