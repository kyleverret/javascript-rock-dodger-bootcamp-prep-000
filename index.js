/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge
    const dodgerRightEdge = dodgerLeftEdge +40 ;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge +20;
    
    var inst1 = rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge;
    var inst2 = rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge; 
    var inst3 = rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge; 
    
    if (inst1 || inst2 || inst3)
    
    /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
               {
      return true
    }
  }
}

function createRock(x) {
  console.log("game interval is");
  console.log(gameInterval);
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;
  
 GAME.append(rock);
moveRock(rock);
}

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
   
   
  function moveRock(rock) {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     
  var top = 0;
 
  function step() {
    rock.style.top = `${top += 2}px`;
      if (checkCollision(rock) === true){
       endGame();}
    else if (top > 400){
  console.log('remove');
  rock.remove();
}
    else if (top < 400) {
      window.requestAnimationFrame(step);
    }

  }
if (top <400){
  
window.requestAnimationFrame(step);
}

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  console.log(ROCKS);
  clearInterval(gameInterval);
  for (var i=0; i<ROCKS.length; i++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  
}

function moveDodger(e) {
  if (e.which == 37){
    e.preventDefault();
        moveDodgerLeft();
  }
  else if (e.which == 39){
        e.preventDefault();
            moveDodgerRight();

  }
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  if (left > 0) {
    DODGER.style.left = `${left - 1}px`
  }
}

function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  if (left < 360) {
    DODGER.style.left = `${left + 1}px`
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000);
}
