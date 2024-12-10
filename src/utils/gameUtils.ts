import { Direction, Position } from '../types/game';

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SNAKE_LENGTH = 3;
export const GAME_SPEED = 150;

export const createInitialSnake = (): Position[] => {
  const snake: Position[] = [];
  const middle = Math.floor(GRID_SIZE / 2);
  
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: middle, y: middle + i });
  }
  return snake;
};

export const generateFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const newSnake = [...snake];
  const head = { ...newSnake[0] };

  switch (direction) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }

  newSnake.unshift(head);
  newSnake.pop();
  return newSnake;
};

export const checkCollision = (snake: Position[]): boolean => {
  const head = snake[0];
  
  // Wall collision
  if (
    head.x < 0 ||
    head.x >= GRID_SIZE ||
    head.y < 0 ||
    head.y >= GRID_SIZE
  ) {
    return true;
  }

  // Self collision
  return snake.slice(1).some(segment => 
    segment.x === head.x && segment.y === head.y
  );
};

export const checkFoodCollision = (snake: Position[], food: Position): boolean => {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
};