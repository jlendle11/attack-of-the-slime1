const slime = { x: 0, y: 0 };
const humans = { x: 5, y: 5 };
const cars = [
  { x: 0, y: 3 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
];

// Tutorial/walkthrough for fade effect: "https://christopheraue.net/design"
function fadeInPage() {
  const fader = document.getElementById('fader');
  fader.classList.add('fade-out');
}
fadeInPage();

document.addEventListener('DOMContentLoaded', () => {
  const anchors = document.getElementsByTagName('a');
  for (let i = 0; i < anchors.length; i += 1) {
    if (anchors[i].hostname !== window.location.hostname) {
      return;
    }
    anchors[i].addEventListener('click', (event) => {
      const fader = document.getElementById('fader');
      const anchor = event.currentTarget;

      const listener = function () {
        window.location = anchor.href;
        fader.removeEventListener('animationend', listener);
      };
      fader.addEventListener('animationend', listener);

      event.preventDefault();
      fader.classList.add('fade-in');
    });
  }
});

function createCars() {
  // eslint-disable-next-line no-restricted-syntax
  for (const car of cars) {
    const carEl = document.createElement('div');
    carEl.className = 'car';
    carEl.style.top = `${(car.y * 100).toString()}px`;
    carEl.style.left = `${(car.x * 100).toString()}px`;
    document.querySelector('.game-board').appendChild(carEl);
  }
}

function createHuman() {
  const humanEx = document.querySelectorAll('.human');
  for (let i = 0; i < humanEx.length; i++) {
    humanEx[i].remove();
    return;
  }

  const humanEl = document.createElement('div');
  humanEl.className = 'human';
  humanEl.style.left = `${(humans.x * 100).toString()}px`;
  humanEl.style.top = `${(humans.y * 100).toString()}px`;
  document.querySelector('.game-board').appendChild(humanEl);
}

const isHuman = function (x, y) {
  if (humans.x === x && humans.y === y) {
    return true;
  }
  return false;
};

const isMoveOnBoard = function (x, y) {
  if (x < 0 || y < 0 || x > 5 || y > 5) {
    return false;
  }
  return true;
};

const removeHuman = function (x, y) {
  if (humans.x === x && humans.y === y) {
    delete humans.x;
    delete humans.y;
  }
};

const carAtLoc = function (x, y) {
  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    if (car.x === x && car.y === y) {
      return true;
    }
  }
  return false;
};

const canMoveTo = function (x, y) {
  if (!isMoveOnBoard(x, y)) {
    return false;
  }
  if (carAtLoc(x, y)) {
    return false;
  }
  return true;
};

function moveSlime(x, y) {
  const slimeEl = document.querySelector('.slime');
  slimeEl.style.left = `${(x * 100).toString()}px`;
  slimeEl.style.top = `${(y * 100).toString()}px`;
  if (isHuman(x, y)) {
    removeHuman(x, y);
    createHuman();
    if (document.querySelectorAll('.slime').length === 29) {
      setTimeout(() => { window.location.href = 'win.html'; }, 200);
    } else if (document.querySelectorAll('.slime').length > 29) {
      setTimeout(() => { window.location.href = 'game-over.html'; }, 200);
    } else {
      setTimeout(() => { window.location.href = 'game-over2.html'; }, 200);
    }
  }
}


function moveLeft() {
  if (canMoveTo(slime.x - 1, slime.y)) {
    const trail = document.querySelector('.slime');
    const clone = trail.cloneNode(false);
    clone.id = 'clone';
    document.querySelector('.game-board').appendChild(clone);
    slime.x -= 1;
    moveSlime(slime.x, slime.y);
  }
}

function moveUp() {
  if (canMoveTo(slime.x, slime.y - 1)) {
    const trail = document.querySelector('.slime');
    const clone = trail.cloneNode(false);
    clone.id = 'clone';
    document.querySelector('.game-board').appendChild(clone);
    slime.y -= 1;
    moveSlime(slime.x, slime.y);
  }
}

function moveRight() {
  if (canMoveTo(slime.x + 1, slime.y)) {
    const trail = document.querySelector('.slime');
    const clone = trail.cloneNode(false);
    clone.id = 'clone';
    document.querySelector('.game-board').appendChild(clone);
    slime.x += 1;
    moveSlime(slime.x, slime.y);
  }
}

function moveDown() {
  if (canMoveTo(slime.x, slime.y + 1)) {
    const trail = document.querySelector('.slime');
    const clone = trail.cloneNode(false);
    clone.id = 'clone';
    document.querySelector('.game-board').appendChild(clone);
    slime.y += 1;
    moveSlime(slime.x, slime.y);
  }
}

document.body.addEventListener('keydown', (evt) => {
  const { keyCode } = evt;
  if ([37, 38, 39, 40].includes(keyCode)) {
    evt.preventDefault();
  }
  switch (keyCode) {
    case 37:
      moveLeft();
      break;
    case 38:
      moveUp();
      break;
    case 39:
      moveRight();
      break;
    case 40:
      moveDown();
      break;
    default:
  }
});

function runGame() {
  createCars();
  createHuman();
}
runGame();
