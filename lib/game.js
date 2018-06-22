const Zombie = require('./zombie.js');
const Player = require('./player.js');
const Bullet = require('./bullet.js');
const Resource = require('./resource.js');
const Sound = require('./sound.js');

const zombieDeath = new Sound('./sounds/zombie_death.mp3');
const zombieBite = new Sound('./sounds/zombie.wav');

function Game(ctx) {
  this.DIM_X = 800;
  this.DIM_Y = 600;
  this.zombies = [];
  this.BASE_X = 350;
  this.BASE_Y = 250;
  this.LIVES = 5;
  this.player = null;
  this.bullets = [];
  this.resources = [];
  this.ctx = ctx;
  this.FOV = [200,200];
  this.bullet_count = 15;
  this.zombies_count = 1;
  this.score = 1000;
  this.paused = false;
  this.mute = false;
}


Game.prototype.start = function() {
  var game = this;
  this.spawnPlayer();
  setInterval(this.spawnZombies.bind(this), 5000);
  setInterval(this.spawnResource.bind(this), 5000);
  this.timer = setInterval(function() {game.score -= 1000}, 1000);
}

Game.prototype.spawnPlayer = function() {
  const player = new Player(this);
  this.player = player;
}

Game.prototype.togglePause = function() {
  var game = this;
  if (this.paused) {
    this.timer = setInterval(function() {game.score -= 1000}, 1000);
  } else {
    this.timer = clearInterval(this.timer);
  }
  this.paused = !this.paused;
}

Game.prototype.spawnZombie = function() {
  var zombie = new Zombie(this.randomPosition('zombie'), this);
  this.zombies.push(zombie);
}

Game.prototype.spawnZombies = function() {
  var randomNum = Math.floor(Math.random() * this.zombies_count) + 3;
  for (var i = 0; i < randomNum; i++) {
    this.spawnZombie();
  }
  this.zombies_count += Math.floor(Math.random() * 2);
}


Game.prototype.spawnResource = function() {
  var pos = this.randomPosition('resource');
  var resource =  new Resource(pos);
  this.resources.push(resource);
}

Game.prototype.step = function(delta) {
  if (this.paused) { return null};
  this.ctx.clearRect(0, 0, 800, 600);
  this.moveObjects(delta);
  this.checkCollisions();
  this.removeOutOfBoundsBullet();
  this.drawObjects();
}


Game.prototype.randomPosition = function(type) {
  var randomX, randomY;
  var vertOrHorz = Math.floor(Math.random() * 2);
  var sign = Math.floor(Math.random() * 2);
  if (vertOrHorz === 0) {
    if (type === 'resource') {
      randomX = Math.random() * this.DIM_X;
      randomY = Math.floor(Math.random() * this.DIM_Y);
    } else {
      randomX = sign * this.DIM_X;
      randomY = Math.floor(Math.random() * this.DIM_Y);
    }
  } else {
    if (type === 'resource') {
      randomY = Math.random() * this.DIM_Y;
      randomX = Math.floor(Math.random() * this.DIM_X);
    } else {
      randomY = sign * this.DIM_Y;
      randomX = Math.floor(Math.random() * this.DIM_X);
    }
  }
  return [randomX, randomY];
}



Game.prototype.allObjects = function() {
  return [this.player].concat(this.bullets, this.resources, this.zombies);
}


Game.prototype.moveObjects = function(delta) {
  this.allObjects().forEach( function(obj) {
    obj.move(delta);
  });
  return null;
}

Game.prototype.drawObjects = function() {
  var context = this.ctx;
  this.allObjects().forEach( function(obj) {
    obj.draw(context);
  });
  if (this.score <= 0) {context.drawImage(train, 0, 0, 300, 300, 670, 240, 150, 150);}
}


Game.prototype.checkCollisions = function() {
  var allObjects = this.allObjects();
  for (var i = 0; i < allObjects.length; i++) {
    for (var j = i + 1; j < allObjects.length + 1; j++) {
      var obj1 = allObjects[i];
      var obj2 = allObjects[j];
      if (obj1 === undefined || obj2 === undefined) {
        continue;
      }
      if (obj1.isCollidedWith(obj2)) {
        this.handleCollisions(obj1, obj2);
      }
    }
  }
  return null;
}


Game.prototype.handleCollisions = function(obj1, obj2) {
  if (obj1 instanceof Bullet && obj2 instanceof Zombie) {
    zombieDeath.load();
    zombieDeath.play();
    this.removeObject(obj1);
    this.removeObject(obj2);
    this.score += 200;
  } else if (obj1 instanceof Player && obj2 instanceof Zombie) {
    zombieBite.load();
    zombieBite.play();
    this.LIVES--;
    obj1.pos = [400, 300];
  } else if (obj1 instanceof Player && obj2 instanceof Resource) {
      if (obj2.type === 'bullet') {
        this.bullet_count += 15;
      } else {
        this.LIVES++;
      }
    this.removeObject(obj2);
  } else if (obj1 instanceof Zombie && obj2 instanceof Zombie) {
    obj2.pos = [obj2.pos[0] + 1, obj2.pos[1] + 1];
  }
}

Game.prototype.removeObject = function(obj) {
  if (obj instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(obj), 1);
  } else if (obj instanceof Zombie) {
    this.zombies.splice(this.zombies.indexOf(obj), 1);
  } else if (obj instanceof Resource ){
    this.resources.splice(this.resources.indexOf(obj), 1);
  } else {
    return null;
  }
}

Game.prototype.removeOutOfBoundsBullet = function() {
  this.bullets = this.bullets.filter( function(bullet) {
    if (bullet.validPosition()) {
      return bullet;
    }
  });
}

Game.prototype.gameOver = function() {
  return (this.LIVES <= 0);
}


Game.prototype.getToDaChoppa = function() {
  if (this.player.pos[0] > 650 && (this.player.pos[1] > 230 && this.player.pos[1] < 400))
    return true;
}

Game.prototype.checkZombies = function() {
  var zombies = this.zombies.filter( function(zombie) {
    if (!((zombie.pos[0] < 450 && zombie.pos[0] > 350) && (zombie.pos[1] < 350 && zombie.pos[1] > 250))) {
      return zombie;
    }
  });
  this.LIVES -= (this.zombies.length - zombies.length);
  this.zombies = zombies;
}


module.exports = Game;
