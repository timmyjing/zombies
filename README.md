# Zombies - A game built using Vanilla Javascript

## Background and Overview

San Francisco is under a zombie epidemic and AppAcademy is under attack!

Zombies is a survival game where a player controls a hero character on screen in order to defend a chokepoint. The player will be able to shoot projectiles in order to destroy zombies and prevent them from entering the office and disrupting the students who are currently working on their full stack project. The game will be from a topdown 2D
point of view. The hero has a finite amount of health and must avoid getting hit by zombies. The game is lost when the hero is out of health or if enough zombies have entered the office. Might consider renaming the game to Bug Attack! to be more friendly and programmer tongue in cheek (Hero is armed with debugger).

Finished Product - Inspired by retro arcade games
![alt-text](https://raw.githubusercontent.com/timmyjing/zombies/master/wiki/Screen%20Shot%202018-06-22%20at%202.24.59%20AM.png "Zombies gameplay")
![alt-text](https://raw.githubusercontent.com/timmyjing/zombies/master/wiki/Screen%20Shot%202018-06-22%20at%202.24.51%20AM.png "Zombies") Excuse me lol, it is very hard to take a screenshot and not lose this game



## MVP
- Randomly generated zombies that slowly converge onto the home base
- Sound effects in order to determine the presence of zombies in the game
- Players can shoot projectiles in order to defend against the zombie attack
- The game is lost when enough zombies have passed into the safe zone or when the player gets enough strikes from a zombie
- Score is based on the amount of time survived
- UPDATE: Gameplay was overhauled in order to remove the home base due to the lack of an appropriate sprite. Some of the available freeware sprites would require creating path logic. The game is now survival based where zombies randomly spawn and chase the player and the player must survive for 60 seconds until evacuation. The player's vision is limited. Ammo and lives are also finite with powerups that could be picked up. High score is scrapped for a timer instead due to the survival nature.

## WireFrames
![alt-text](https://raw.githubusercontent.com/timmyjing/zombies/master/wiki/zombies.jpg "Zombies wireframe")

## Architecture and Technologies
- Game logic will be built on Vanilla JavaScript
- Canvas will be used to render the game
- Webpack will be used to bundle up the scripts
- Web Audio API for sound effects

Scripts in this project:

<code>game.js</code>: This script will handle the DOM manipulation such as the Canvas rendering and event listeners.

<code>zombies.js</code>: This script will contain all the logic for all the moving objects in the game. Made with webpack.

<code>audio.js</code>: This script will contain all the audio events and logic associated with the game. - DID NOT NEED.


## Implementation
Weekend:
- Researched various JavaScript based games in order to see what was possible
- Researched how to make a 2D game using sprites

### Day 1:
- Setup Node modules and configure Webpack. Get started with the entry file. - DONE
- Work on the game classes such as moving objects. - DONE
- Collision detection and zombie AI will be implemented. - DONE
- Create the game grid. - DONE
- Create the logic for zombies to randomly spawn on the screen. - DONE

### Day 2:
- Learn how to implement sprites into Canvas in order to render animations. - DONE
- Gather sprites and create a sprite sheet for the game characters and animations. - DONE
- Create keyboard controls for the player. - DONE

### Day 3:
- Add sound effects using Web Audio API. - DONE, did not need Web Audio API, used HTML audio tags
- Make sure the game plays smoothly - DONE

### Day 4:
- Bug checks, game testing, and game balance. - DONE. Made the game reasonably difficult and removed any lingering console logs and etc.
- Work on the HTML presentation for the project. - DONE
- Create game to start, reset and pause the game. - DONE

## Code Example

One challenge I had was properly implementing a pause feature since relying on setInterval for the spawning of resources and zombies made it buggy when the game paused. The intervals would continue even though the game was paused and then suddenly a horde of zombies would spawn. By storing the intervals to the game object keys, I can clear them with clearInterval() and restart them whenever the game is unpaused.

```
  Game.prototype.start = function() {
  var game = this;
  this.spawnPlayer();
  this.zombieTimer = setInterval(this.spawnZombies.bind(this), 5000);
  this.resourceTimer = setInterval(this.spawnResource.bind(this), 8000);
  this.timer = setInterval(function() {game.time -= 1000}, 1000);
}
```

Also, the use of a prototype MovingObject also helped keep the code DRY and made it much easier to handle collisions as all the objects in the game inherited from MovingObject, thus having access to a handle collision method.
```
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
```

## Bonuses
- Narrowed field of view with fog of war in order to increase difficulty - DONE
- Special bosses such as big bugs 
- Limited resources such as ammunition in order to make the game more survival based - DONE
- Barricades that can be built and repaired
- Special weapons
- Random events
- Quests - Nah haha

## Future Changes
- New sprites for the powerups, didn't get a chance to implement due to a lack of time.
- Couldn't get Canvas to render the custom font for the welcome screen

## Post Comments
- Project was written with ES5 syntax in order to better understand JavaScript as I felt that prototypal syntax was very foreign to me after coming from ES6. It was also good practice for OOP.
