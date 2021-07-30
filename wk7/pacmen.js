let animationID;
let gamePlaying = false;
let cardRect = {
  right: 0,
  bottom: 0
};

let images = [
  ["images/pacman1.png", "images/pacman2.png"],
  ["images/pacman3.png", "images/pacman4.png"]
];

let pacMen = [];


/**
 * Generates a random number within the supplied range
 * @param {Number} min The minimum number that can be generated
 * @param {Number} max The maximum number that can be generated
 * @returns A random number between the supplied min and max
 */
const getRandom = (min, max) => Math.random() * (max - min) + min;

/**
 * This function creates a new instance of a pacman, and adds the corresponding image to the DOM
 * @returns A new pacman object
 */
const makePac = () => {
  const pacman = {};
  pacman.direction = { x: !!Math.round(Math.random()), y: !!Math.round(Math.random()) };
  pacman.mouthOpen = false;
  pacman.velocity = {
    x: getRandom(0, 10),
    y: getRandom(0, 20)
  };
  pacman.position = {
    x: getRandom(cardRect.right || 20, window.innerWidth / 4),
    y: getRandom(cardRect.bottom || 20, window.innerHeight / 4)
  };

  const card = document.getElementById('card');
  if (card) cardRect = card.getBoundingClientRect();

  let game = document.getElementById('game');
  pacman.imgRef = document.createElement('img');
  pacman.imgRef.style.position = 'absolute';
  pacman.imgRef.src = images[+!pacman.direction.x][+pacman.mouthOpen]; // Set the initial image
  pacman.imgRef.width = 100;
  pacman.imgRef.style.left = pacman.position.x;
  pacman.imgRef.style.top = pacman.position.y;
  game.appendChild(pacman.imgRef);

  pacman.hue = 0;
  pacman.animateMouth = () => {
    if (!gamePlaying) return;
    setTimeout(() => {
      pacman.animationFrame = requestAnimationFrame(pacman.animateMouth);
        pacman.mouthOpen = !pacman.mouthOpen;
        // +! looks odd here, essentially we're forcing the Boolean's inverse value into an integer
        pacman.imgRef.src = images[+!pacman.direction.x][+pacman.mouthOpen];
    }, 250);
  };

  return pacman;
};

/**
 * Updates the states of each pacman on the DOM
 */
const update = () => {
  if (!gamePlaying) return;
  // loop over pacmen array and move each one and move image in DOM
  setTimeout(() => {
    animationID = requestAnimationFrame(update);
    pacMen.forEach(pac => {
      checkCollisions(pac);
      pac.hue += 1;
      pac.direction.x ? pac.position.x += pac.velocity.x : pac.position.x -= pac.velocity.x;
      pac.direction.y ? pac.position.y += pac.velocity.y : pac.position.y -= pac.velocity.y;
      pac.imgRef.style.filter = `hue-rotate(${pac.hue}deg)`;
      pac.imgRef.style.left = pac.position.x;
      pac.imgRef.style.top = pac.position.y;
    });
  }, 20);
};

/**
 * Checks for collisions against walls or against the control card, if a collision is detected, the direction on the erred axis is inverted
 * @param {Object} pac The pacman in question
 */
const checkCollisions = pac => {
  if (pac.position.x <= 0 || pac.position.x <= cardRect.right && pac.position.y <= cardRect.bottom) {
    pac.direction.x = true;
  } else if (pac.position.x >= window.innerWidth - 100) {
    pac.direction.x = false;
  }
  if (pac.position.y <= 0 || pac.position.x <= cardRect.right && pac.position.y <= cardRect.bottom) {
    pac.direction.y = true;
  } else if (pac.position.y >= window.innerHeight - 100) {
    pac.direction.y = false;
  }
};

/**
 * Resets the game at the user's request
 */
const resetGame = () => {
  if (!gamePlaying) return;
  document.getElementById('startGame').removeAttribute("disabled");
  document.getElementById('resetGame').setAttribute("disabled", true);
  gamePlaying = false;
  cancelAnimationFrame(animationID);
  let game = document.getElementById('game');
  let images = [...game.getElementsByTagName('img')];
  images.forEach(img => {
    game.removeChild(img);
  });
  pacMen.forEach(man => {
    cancelAnimationFrame(man.animationFrame);
  });
  pacMen = [];
};

/**
 * This function allows the pacmen to start animating when the user presses the `Start Game` button
 */
const startGame = () => {
  if (gamePlaying) return;
  document.getElementById('startGame').setAttribute("disabled", true);
  document.getElementById('resetGame').removeAttribute("disabled");
  gamePlaying = true;
  pacMen.forEach(pacman => pacman.animateMouth());
  update();
};

/**
 * Creates a new pacman and pushes it into the existing `pacMen` array
 */
const makeOne = () => {
  const pac = makePac();
  if (gamePlaying) {
    pac.animateMouth();
  }
  pacMen.push(pac);
};