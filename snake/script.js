class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.next = null;
  }
};

const root = document.getElementById('field');
const ROW_COUNT = 20;
const COL_COUNT = 20;
const INTERVAL = 200;

const FIELD = Array(COL_COUNT).fill().map(() => 
  Array(ROW_COUNT).fill('0')
);
const gameState = {
  ignoreUserInput: true,
  intervalId: null,
  direction: "UP"
};
const snake = {
  head: new Node(9, 9),
  tail: new Node(9, 10),
  length: 2
};
snake.tail.next = snake.head;

console.log(snake);

const getTileId = (x, y) => `tile_${y}x${x}`;
const addSnakeBodyNode = (x, y) => {
  const tile = document.getElementById(getTileId(x, y));

  FIELD[y][x] = 'x';
  tile.classList.add('snakeBody');
}

const removeSnakeBodyNode = (x, y) => {
  const tile = document.getElementById(getTileId(x, y));

  FIELD[y][x] = '0';
  tile.classList.remove('snakeBody');
};

const removeFood = (x, y) => {
  const tile = document.getElementById(getTileId(x, y));

  FIELD[y][x] = '0';
  tile.classList.remove('food');
};

const init = () => {
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      const newTile = document.createElement('div');

      newTile.id = getTileId(j, i);
      newTile.classList.add('tile');
      root.appendChild(newTile);
    }
  }

  addSnakeBodyNode(snake.head.x, snake.head.y);
  addSnakeBodyNode(snake.tail.x, snake.tail.y);
};

const tick = () => {
  let nextX = snake.head.x;
  let nextY = snake.head.y;

  gameState.ignoreUserInput = false;
  switch (gameState.direction) {
    case "UP":
      nextY = snake.head.y ? snake.head.y - 1 : COL_COUNT - 1;
      break;
    case "DOWN":
      nextY = snake.head.y === COL_COUNT - 1 ? 0 : snake.head.y + 1;
      break;
    case "LEFT":
      nextX = snake.head.x ? snake.head.x - 1 : ROW_COUNT - 1;
      break;
    case "RIGHT":
      nextX = snake.head.x === ROW_COUNT - 1 ? 0 : snake.head.x + 1;
      break;
  }

  const moveHead = () => {
    const newNode = new Node(nextX, nextY);
  
    addSnakeBodyNode(nextX, nextY);
    snake.head.next = newNode;
    snake.head = snake.head.next;
  };

  switch(FIELD[nextY][nextX]) {
    case '0':
      moveHead();
      removeSnakeBodyNode(snake.tail.x, snake.tail.y)
      snake.tail = snake.tail.next;
      break;
    case 'x':
      clearInterval(gameState.intervalId);
      let ptr = snake.tail;
      const head = document.getElementById(getTileId(snake.head.x, snake.head.y));

      head.innerHTML = 'x';
      while(ptr != null) {
        const node = document.getElementById(getTileId(ptr.x, ptr.y));

        node.classList.add('deadCell');
        ptr = ptr.next;
      }
      break;
    case 'a':
      removeFood(nextX, nextY);
      moveHead();
      placeFood();
      break;
    default:
      console.log('FIELD ERROR');
      break;
  };

};

const getRandomNode = () => 
  [Math.ceil(Math.random() * 100) % COL_COUNT, Math.ceil(Math.random() * 100) % ROW_COUNT];

const placeFood = () => {
 let [y, x] = getRandomNode();
 
 while (FIELD[y][x] != '0') {
  [y,x] = getRandomNode();
 };
  const tile = document.getElementById(getTileId(x, y));

  tile.classList.add('food');
  FIELD[y][x] = 'a';
};

// Initialize field and game state
init();

// Start gameplay
gameState.intervalId = setInterval(() => {
  tick();
}, INTERVAL);
placeFood();

// User input event listeners
window.addEventListener('keyup', (e) => {
  if (gameState.ignoreUserInput) return;
  
  let userInput = null;

  switch (e.keyCode) {
    case 38:
      userInput = "UP";
      break;
    case 40:
      userInput = "DOWN";
      break;
    case 37:
      userInput = "LEFT";
      break;
    case 39:
      userInput = "RIGHT";
      break;
    default:
      break;
  };
  if (!userInput || gameState.direction === userInput) return;
  if (gameState.direction === "UP" && userInput === "DOWN" ||
    gameState.direction === "RIGHT" && userInput === "LEFT" ||
    gameState.direction === "LEFT" && userInput === "RIGHT" ||
    gameState.direction === "DOWN" && userInput === "UP")
  return;

  gameState.direction = userInput;
  gameState.ignoreUserInput = true;

  return;
})

