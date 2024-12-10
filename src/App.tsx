import React, { useCallback, useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import { Direction, GameState } from './types/game';
import {
  GAME_SPEED,
  checkCollision,
  checkFoodCollision,
  createInitialSnake,
  generateFood,
  moveSnake,
} from './utils/gameUtils';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    snake: createInitialSnake(),
    food: generateFood(createInitialSnake()),
    direction: 'UP',
    isGameOver: false,
    score: 0,
  });
  const [isPaused, setIsPaused] = useState(false);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      const keyDirections: { [key: string]: Direction } = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };

      const newDirection = keyDirections[event.key];
      if (!newDirection) return;

      const opposites = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      };

      if (opposites[newDirection] !== gameState.direction) {
        setGameState(prev => ({ ...prev, direction: newDirection }));
      }
    },
    [gameState.direction, gameState.isGameOver]
  );

  const gameLoop = useCallback(() => {
    if (isPaused || gameState.isGameOver) return;

    setGameState(prev => {
      const newSnake = moveSnake(prev.snake, prev.direction);

      if (checkCollision(newSnake)) {
        return { ...prev, isGameOver: true };
      }

      if (checkFoodCollision(newSnake, prev.food)) {
        const growthPoint = newSnake[newSnake.length - 1];
        newSnake.push(growthPoint);
        return {
          ...prev,
          snake: newSnake,
          food: generateFood(newSnake),
          score: prev.score + 10,
        };
      }

      return { ...prev, snake: newSnake };
    });
  }, [gameState.isGameOver, isPaused]);

  useEffect(() => {
    const intervalId = setInterval(gameLoop, GAME_SPEED);
    return () => clearInterval(intervalId);
  }, [gameLoop]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleRestart = () => {
    setGameState({
      snake: createInitialSnake(),
      food: generateFood(createInitialSnake()),
      direction: 'UP',
      isGameOver: false,
      score: 0,
    });
    setIsPaused(false);
  };

  const togglePause = () => {
    if (!gameState.isGameOver) {
      setIsPaused(prev => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">贪吃蛇游戏</h1>
      {gameState.isGameOver && (
        <div className="mb-4 text-xl font-semibold text-red-600">
          游戏结束！最终得分：{gameState.score}
        </div>
      )}
      <GameBoard snake={gameState.snake} food={gameState.food} />
      <GameControls
        onRestart={handleRestart}
        onPause={togglePause}
        isPaused={isPaused}
        score={gameState.score}
      />
    </div>
  );
}

export default App;