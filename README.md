# Zombies - A game built using Vanilla Javascript

## Background and Overview

San Francisco is under a zombie epidemic and AppAcademy is under attack!

Zombies is a survival game where a player controls a hero character on screen in order to defend a chokepoint. The player will be able to shoot projectiles in order to destroy zombies and prevent them from entering the office and disrupting the students who are currently working on their full stack project. The game will be from a topdown 2D
point of view. The hero has a finite amount of health and must avoid getting hit by zombies. The game is lost when the hero is out of health or if enough zombies have entered the office.

## MVP
- Randomly generated zombies that slowly converge onto the home base
- Sound effects in order to determine the presence of zombies in the game
- Players can shoot projectiles in order to defend against the zombie attack
- The game is lost when enough zombies have passed into the safe zone or when the player gets enough strikes from a zombie
- Score is based on the amount of time survived

## WireFrames

## Architecture and Technologies
- Game logic will be built on Vanilla JavaScript
- Canvas will be used to render the game
- Webpack will be used to bundle up the scripts
- Web Audio API for sound effects

Scripts in this project:

<code>board.js</code>: This script will handle the DOM manipulation such as the Canvas rendering and event listeners.

<code>zombies.js</code>: This script will contain all the logic for all the moving objects in the game.

<code>audio.js</code>: This script will contain all the audio events and logic associated with the game.


## Implementation
Weekend:
- Researched various JavaScript based games in order to see what was possible
- Researched how to make a 2D game using sprites

### Day 1:
- Setup Node modules and configure Webpack. Get started with the entry file.
- Work on the game classes such as moving objects.
- Collision detection and zombie AI will be implemented.
- Create the game grid.
- Create the logic for zombies to randomly spawn on the screen.

### Day 2:
- Learn how to implement sprites into Canvas in order to render animations.
- Gather sprites and create a sprite sheet for the game characters and animations.
- Create keyboard controls for the player.

### Day 3:
- Add sound effects using Web Audio API.
- Make sure the game plays smoothly

### Day 4:
- Bug checks, game testing, and game balance.
- Work on the HTML presentation for the project.
- Create game to start, reset and pause the game.

## Bonuses
- Narrowed field of view with fog of war in order to increase difficulty
- Special bosses such as big bugs
- Limited resources such as ammunition in order to make the game more survival based
- Barricades that can be built and repaired
- Special weapons
- Random events
- Quests
