/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/zombies.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./lib/moving_object.js\");\n\nconst BULLET_OPTIONS = {\n  COLOR: 'orange',\n  RADIUS: 2,\n  SPEED: 10\n};\n\nfunction Bullet(pos, vector, game) {\n\n  var options = {\n    pos: pos,\n    radius: BULLET_OPTIONS.RADIUS,\n    color: BULLET_OPTIONS.COLOR,\n    vel: [vector[0] * BULLET_OPTIONS.SPEED, vector[1] * BULLET_OPTIONS.SPEED],\n    game: game\n  };\n\n  MovingObject.call(this, options)\n}\n\nUtil.inherits(Bullet, MovingObject);\n\n\nBullet.prototype.draw = function(ctx) {\n  ctx.fillStyle = this.color;\n  ctx.fillRect(this.pos[0],this.pos[1],3,3);\n  // ctx.beginPath();\n  // ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI);\n  // ctx.stroke();\n  ctx.fill();\n}\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./lib/bullet.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Zombie = __webpack_require__(/*! ./zombie.js */ \"./lib/zombie.js\");\nconst Player = __webpack_require__(/*! ./player.js */ \"./lib/player.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\nconst Resource = __webpack_require__(/*! ./resource.js */ \"./lib/resource.js\");\nconst Sound = __webpack_require__(/*! ./sound.js */ \"./lib/sound.js\");\n\nconst zombieDeath = new Sound('./sounds/zombie_death.mp3');\nconst zombieBite = new Sound('./sounds/zombie.wav');\n\nfunction Game(ctx) {\n  this.DIM_X = 800;\n  this.DIM_Y = 600;\n  this.zombies = [];\n  this.BASE_X = 350;\n  this.BASE_Y = 250;\n  this.LIVES = 5;\n  this.player = null;\n  this.bullets = [];\n  this.resources = [];\n  this.ctx = ctx;\n  this.FOV = [200,200];\n  this.bullet_count = 15;\n  this.zombies_count = 1;\n  this.score = 1000;\n  this.paused = false;\n  this.mute = false;\n}\n\n\nGame.prototype.start = function() {\n  var game = this;\n  this.spawnPlayer();\n  setInterval(this.spawnZombies.bind(this), 5000);\n  setInterval(this.spawnResource.bind(this), 5000);\n  this.timer = setInterval(function() {game.score -= 1000}, 1000);\n}\n\nGame.prototype.spawnPlayer = function() {\n  const player = new Player(this);\n  this.player = player;\n}\n\nGame.prototype.togglePause = function() {\n  var game = this;\n  if (this.paused) {\n    this.timer = setInterval(function() {game.score -= 1000}, 1000);\n  } else {\n    this.timer = clearInterval(this.timer);\n  }\n  this.paused = !this.paused;\n}\n\nGame.prototype.spawnZombie = function() {\n  var zombie = new Zombie(this.randomPosition('zombie'), this);\n  this.zombies.push(zombie);\n}\n\nGame.prototype.spawnZombies = function() {\n  var randomNum = Math.floor(Math.random() * this.zombies_count) + 3;\n  for (var i = 0; i < randomNum; i++) {\n    this.spawnZombie();\n  }\n  this.zombies_count += Math.floor(Math.random() * 2);\n}\n\n\nGame.prototype.spawnResource = function() {\n  var pos = this.randomPosition('resource');\n  var resource =  new Resource(pos);\n  this.resources.push(resource);\n}\n\nGame.prototype.step = function(delta) {\n  if (this.paused) { return null};\n  this.ctx.clearRect(0, 0, 800, 600);\n  this.moveObjects(delta);\n  this.checkCollisions();\n  this.removeOutOfBoundsBullet();\n  this.drawObjects();\n}\n\n\nGame.prototype.randomPosition = function(type) {\n  var randomX, randomY;\n  var vertOrHorz = Math.floor(Math.random() * 2);\n  var sign = Math.floor(Math.random() * 2);\n  if (vertOrHorz === 0) {\n    if (type === 'resource') {\n      randomX = Math.random() * this.DIM_X;\n      randomY = Math.floor(Math.random() * this.DIM_Y);\n    } else {\n      randomX = sign * this.DIM_X;\n      randomY = Math.floor(Math.random() * this.DIM_Y);\n    }\n  } else {\n    if (type === 'resource') {\n      randomY = Math.random() * this.DIM_Y;\n      randomX = Math.floor(Math.random() * this.DIM_X);\n    } else {\n      randomY = sign * this.DIM_Y;\n      randomX = Math.floor(Math.random() * this.DIM_X);\n    }\n  }\n  return [randomX, randomY];\n}\n\n\n\nGame.prototype.allObjects = function() {\n  return [this.player].concat(this.bullets, this.resources, this.zombies);\n}\n\n\nGame.prototype.moveObjects = function(delta) {\n  this.allObjects().forEach( function(obj) {\n    obj.move(delta);\n  });\n  return null;\n}\n\nGame.prototype.drawObjects = function() {\n  var context = this.ctx;\n  this.allObjects().forEach( function(obj) {\n    obj.draw(context);\n  });\n  if (this.score <= 0) {context.drawImage(train, 0, 0, 300, 300, 670, 240, 150, 150);}\n}\n\n\nGame.prototype.checkCollisions = function() {\n  var allObjects = this.allObjects();\n  for (var i = 0; i < allObjects.length; i++) {\n    for (var j = i + 1; j < allObjects.length + 1; j++) {\n      var obj1 = allObjects[i];\n      var obj2 = allObjects[j];\n      if (obj1 === undefined || obj2 === undefined) {\n        continue;\n      }\n      if (obj1.isCollidedWith(obj2)) {\n        this.handleCollisions(obj1, obj2);\n      }\n    }\n  }\n  return null;\n}\n\n\nGame.prototype.handleCollisions = function(obj1, obj2) {\n  if (obj1 instanceof Bullet && obj2 instanceof Zombie) {\n    zombieDeath.load();\n    zombieDeath.play();\n    this.removeObject(obj1);\n    this.removeObject(obj2);\n    this.score += 200;\n  } else if (obj1 instanceof Player && obj2 instanceof Zombie) {\n    zombieBite.load();\n    zombieBite.play();\n    this.LIVES--;\n    obj1.pos = [400, 300];\n  } else if (obj1 instanceof Player && obj2 instanceof Resource) {\n      if (obj2.type === 'bullet') {\n        this.bullet_count += 15;\n      } else {\n        this.LIVES++;\n      }\n    this.removeObject(obj2);\n  } else if (obj1 instanceof Zombie && obj2 instanceof Zombie) {\n    obj2.pos = [obj2.pos[0] + 1, obj2.pos[1] + 1];\n  }\n}\n\nGame.prototype.removeObject = function(obj) {\n  if (obj instanceof Bullet) {\n    this.bullets.splice(this.bullets.indexOf(obj), 1);\n  } else if (obj instanceof Zombie) {\n    this.zombies.splice(this.zombies.indexOf(obj), 1);\n  } else if (obj instanceof Resource ){\n    this.resources.splice(this.resources.indexOf(obj), 1);\n  } else {\n    return null;\n  }\n}\n\nGame.prototype.removeOutOfBoundsBullet = function() {\n  this.bullets = this.bullets.filter( function(bullet) {\n    if (bullet.validPosition()) {\n      return bullet;\n    }\n  });\n}\n\nGame.prototype.gameOver = function() {\n  return (this.LIVES <= 0);\n}\n\n\nGame.prototype.getToDaChoppa = function() {\n  if (this.player.pos[0] > 650 && (this.player.pos[1] > 230 && this.player.pos[1] < 400))\n    return true;\n}\n\nGame.prototype.checkZombies = function() {\n  var zombies = this.zombies.filter( function(zombie) {\n    if (!((zombie.pos[0] < 450 && zombie.pos[0] > 350) && (zombie.pos[1] < 350 && zombie.pos[1] > 250))) {\n      return zombie;\n    }\n  });\n  this.LIVES -= (this.zombies.length - zombies.length);\n  this.zombies = zombies;\n}\n\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./lib/game.js\");\nconst Sound = __webpack_require__(/*! ./sound.js */ \"./lib/sound.js\");\n\nconst train = new Sound('./sounds/train.wav');\n\nfunction GameView(ctx) {\n  this.game = null;\n  this.ctx = ctx;\n}\n\nGameView.MOVES = {\n  w: [0, -1],\n  a: [-1, 0],\n  s: [0, 1],\n  d: [1, 0],\n  'shift+w': [0, -1.35],\n  'shift+a': [-1.35, 0],\n  'shift+s': [0, 1.35],\n  'shift+d': [1.35,0]\n};\n\nGameView.prototype.togglePause = function() {\n  if (this.game === undefined || this.game === null) { return null};\n  this.game.togglePause();\n}\n\n\nGameView.prototype.welcomeScreen = function() {\n  this.ctx.fillStyle = 'red';\n  this.ctx.font = '50px serif';\n  this.ctx.fillText('Zombies!', 100, 200);\n}\n\nGameView.prototype.start = function() {\n  if (this.game !== null) {\n    return null;\n  }\n  this.game = new Game(this.ctx);\n  this.game.start();\n  this.bindKeyHandlers();\n  this.lastTime = 0;\n  this.animFrame = requestAnimationFrame(this.animate.bind(this));\n}\n\nGameView.prototype.bindKeyHandlers = function() {\n  const player = this.game.player;\n  Object.keys(GameView.MOVES).forEach(function(k) {\n    const move = GameView.MOVES[k];\n\n    key(k, function() { player.changeDirection(move)});\n  });\n  key(\"space\", function() { player.fireBullet() });\n}\n\n\nGameView.prototype.renderMessage = function() {\n  if (this.game.LIVES <= 0) {\n    this.ctx.fillStyle = 'red';\n    this.ctx.font = '50px serif';\n    this.ctx.fillText('OH HOHOHOHO! DEFEAT!', 100, 200);\n  } else if (this.game.getToDaChoppa()) {\n    this.ctx.fillStyle = 'white';\n    this.ctx.font = '50px serif';\n    this.ctx.fillText('Sweet!', 200, 200);\n    this.ctx.fillText('The train takes you to safety!', 200, 250);\n    train.load();\n    train.play();\n  }\n}\n\nGameView.prototype.animate = function(time) {\n  if (this.game === undefined) {return null};\n  const timeDelta = time - this.lastTime;\n  if (this.game.gameOver() || this.game.getToDaChoppa()) {\n    clearInterval(this.spawnIntervals);\n    cancelAnimationFrame(this.animFrame);\n    this.renderMessage();\n    delete this.game;\n  } else {\n    this.game.step(timeDelta);\n    this.lastTime = time;\n    this.animFrame = requestAnimationFrame(this.animate.bind(this));\n    this.showScore();\n  }\n}\n\n\nGameView.prototype.showScore = function() {\n  this.ctx.fillStyle = 'white';\n  this.ctx.font = '20px sans-serif';\n  this.ctx.fillText(this.game.LIVES + \" lives\", 10, 40);\n  this.ctx.fillText(this.game.bullet_count + \" bullets\", 80, 40);\n  this.ctx.fillText(\"Time: \" + Math.floor(this.game.score / 1000), 200, 40);\n}\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./lib/game_view.js?");

/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.orientation = options.orientation;\n  this.game = options.game;\n  this.sprite = options.sprite;\n  this.type = options.type;\n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.drawImage(img, this.sprite[0], this.sprite[1], 100, 100, this.pos[0] - 20, this.pos[1] - 20, 40, 40)\n}\n\nMovingObject.prototype.move = function(timeDelta) {\n  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n      offsetX = this.vel[0] * velocityScale,\n      offsetY = this.vel[1] * velocityScale;\n  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n}\n\n\nMovingObject.prototype.isCollidedWith = function(other) {\n  var dx = this.pos[0] - other.pos[0];\n  var dy = this.pos[1] - other.pos[1];\n  var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));\n  var diffCenter = (other.radius + this.radius);\n  return (distance < diffCenter);\n}\n\n\nMovingObject.prototype.validPosition = function() {\n  var inBounds = !(this.pos[0] > this.game.DIM_X || this.pos[0] < 0 || this.pos[1] < 0 || this.pos[1] > this.game.DIM_Y);\n  return inBounds;\n};\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./lib/moving_object.js?");

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./lib/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\nconst Sound = __webpack_require__(/*! ./sound.js */ \"./lib/sound.js\");\n\n\nconst PLAYER_SPRITE = [[4,0],[335,0],[120,3],[230,3]];\n\nconst glockSound = new Sound('./sounds/glock.wav');\n\nconst PLAYER_OPTIONS = {\n  COLOR: 'blue',\n  SPEED: 10,\n  RADIUS: 15,\n  POS: [400, 300],\n  ORIENTATION: [0, 1],\n  // SPRITE: [135, 25, 100, 100],\n  // UP DOWN RIGHT LEFT\n  SPRITE: PLAYER_SPRITE[1]\n};\n\n\nfunction Player(game) {\n  var options = {\n    pos: PLAYER_OPTIONS.POS,\n    color: PLAYER_OPTIONS.COLOR,\n    vel: [0,0],\n    radius: PLAYER_OPTIONS.RADIUS,\n    orientation: PLAYER_OPTIONS.ORIENTATION,\n    game: game,\n    sprite: PLAYER_OPTIONS.SPRITE\n  };\n\n  MovingObject.call(this, options);\n}\n\n\nUtil.inherits(Player, MovingObject);\n\nPlayer.prototype.changeDirection = function(direction) {\n  if (this.game.paused) { return null };\n  var oldPos = this.pos;\n  this.pos = [this.pos[0] + (direction[0] * 20), this.pos[1] + (direction[1] * 20)];\n  if (!this.validPosition()) {\n    this.pos = oldPos;\n  }\n  this.orientation = direction;\n  this.updateSprite();\n}\n\nPlayer.prototype.updateSprite = function() {\n\n  if (this.orientation[1] >= 1) {\n    this.sprite = PLAYER_SPRITE[1];\n  } else if (this.orientation[1] <= -1) {\n    this.sprite = PLAYER_SPRITE[0];\n  } else if (this.orientation[0] >= 1) {\n    this.sprite = PLAYER_SPRITE[2];\n  } else if (this.orientation[0] <= -1) {\n    this.sprite = PLAYER_SPRITE[3];\n  }\n}\n\nPlayer.prototype.fireBullet = function() {\n  if (this.game.bullet_count > 0) {\n    var bullet = new Bullet(this.pos, this.orientation, this.game);\n    this.game.bullets.push(bullet);\n    glockSound.load();\n    glockSound.play();\n    this.game.bullet_count--;\n  }\n}\n\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack:///./lib/player.js?");

/***/ }),

/***/ "./lib/resource.js":
/*!*************************!*\
  !*** ./lib/resource.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./lib/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\n\nconst RESOURCES_TYPE = ['bullet', 'life'];\n\nconst RESOURCE_OPTIONS = {\n  color: 'red',\n  radius: 5,\n  vel: [0, 0]\n};\n\nfunction Resource(pos, game) {\n  var type = RESOURCES_TYPE[Math.floor(Math.random() * RESOURCES_TYPE.length)];\n  var color = type === 'bullet' ? 'black' : 'green';\n  var options = {\n    type: type,\n    color: color,\n    radius: RESOURCE_OPTIONS.radius,\n    pos: pos,\n    game: game,\n    vel: RESOURCE_OPTIONS.velocity\n  }\n\n  MovingObject.call(this, options);\n}\n\nUtil.inherits(Resource, MovingObject);\n\nResource.prototype.draw = function() {\n  ctx.fillStyle = this.color;\n  ctx.beginPath();\n  ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI);\n  ctx.stroke();\n  ctx.fill();\n}\n\nResource.prototype.move = function() {\n  return null;\n}\n\nmodule.exports = Resource;\n\n\n//# sourceURL=webpack:///./lib/resource.js?");

/***/ }),

/***/ "./lib/sound.js":
/*!**********************!*\
  !*** ./lib/sound.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Sound(src) {\n    this.sound = document.createElement(\"audio\");\n    this.sound.src = src;\n    this.sound.setAttribute(\"preload\", \"auto\");\n    this.sound.setAttribute(\"controls\", \"none\");\n    this.sound.style.display = \"none\";\n    document.body.appendChild(this.sound);\n    this.load = function(){\n      this.sound.load();\n    }\n    this.play = function(){\n        this.sound.play();\n    }\n    this.stop = function(){\n        this.sound.pause();\n    }\n}\n\nmodule.exports = Sound;\n\n\n//# sourceURL=webpack:///./lib/sound.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n\n  inherits(Child, Parent) {\n    Child.prototype = Object.create(Parent.prototype);\n    Child.prototype.constructor = Child;\n  },\n\n  vector(start, end) {\n    var dx = end[0] - start[0];\n    var dy = end[1] - start[1];\n    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));\n    return [dx / distance, dy / distance];\n  }\n\n}\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ }),

/***/ "./lib/zombie.js":
/*!***********************!*\
  !*** ./lib/zombie.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./lib/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./lib/moving_object.js\");\n\nconst ZOMBIE_SPRITE = [[130,130],[340,125],[10,130],[230,130]];\nconst ZOMBIE_OPTIONS = {\n  COLOR: 'green',\n  SPEED: 1,\n  RADIUS: 15\n};\n\n\nfunction Zombie(pos, game) {\n  var vector = Util.vector(pos, [game.player.pos[0], game.player.pos[1]]);\n  var sprite = vector[0] > 0 ? ZOMBIE_SPRITE[2] : ZOMBIE_SPRITE[3];\n  var options = {\n    pos: pos,\n    color: ZOMBIE_OPTIONS.COLOR,\n    vel: [vector[0] * ZOMBIE_OPTIONS.SPEED, vector[1] * ZOMBIE_OPTIONS.SPEED],\n    radius: ZOMBIE_OPTIONS.RADIUS,\n    orientation: [vector[0], vector[1]],\n    game: game,\n    sprite: sprite\n  }\n\n  MovingObject.call(this, options);\n}\n\nUtil.inherits(Zombie, MovingObject);\n\n\nZombie.prototype.move = function() {\n  var vector = Util.vector(this.pos, [this.game.player.pos[0], this.game.player.pos[1]]);\n  this.pos = [this.pos[0] + vector[0], this.pos[1] + vector[1]];\n}\n\nZombie.prototype.validPosition = function() {\n  var inBounds = !(this.pos[0] > this.game.DIM_X || this.pos[0] < 0 || this.pos[1] < 0 || this.pos[1] > this.game.DIM_Y);\n  var notInBase = !((this.pos[0] > (this.game.BASE_X) && (this.pos[0] < (this.game.BASE_X + 100))) && ((this.pos[1] > this.game.BASE_Y)\n    && (this.pos[1] < this.game.BASE_Y + 100)));\n  return inBounds && notInBase;\n}\n\n\nmodule.exports = Zombie;\n\n\n//# sourceURL=webpack:///./lib/zombie.js?");

/***/ }),

/***/ "./lib/zombies.js":
/*!************************!*\
  !*** ./lib/zombies.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("console.log(\"Webpack is working!\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./lib/game.js\");\nconst Zombie = __webpack_require__(/*! ./zombie.js */ \"./lib/zombie.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./lib/moving_object.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./lib/game_view.js\");\n\nconst canvas = document.getElementById('canvas');\nwindow.ctx = canvas.getContext('2d');\nconst img = document.getElementById('sprite');\nconst train = document.getElementById('train');\nconst startButton = document.getElementById('start');\nconst pauseButton = document.getElementById('pause');\nwindow.img = img;\n\n\ndocument.addEventListener('DOMContentLoaded', function() {\n  var gameview = new GameView(ctx);\n  gameview.welcomeScreen();\n  window.gameview = gameview;\n  canvas.addEventListener('click', function(event) {\n    if (event && gameview.game !== null) {\n      gameview.togglePause();\n    }\n\n    if (event && gameview.game === null) {\n      gameview.start();\n    }\n\n    if (event && gameview.game === undefined) {\n      gameview = new GameView(ctx);\n      gameview.start();\n    }\n  });\n\n  document.addEventListener('keypress', function(event) {\n      event.preventDefault();\n  });\n});\n\n\n//# sourceURL=webpack:///./lib/zombies.js?");

/***/ })

/******/ });