import React from 'react';
import { Position } from '../types/game';
import { CELL_SIZE, GRID_SIZE } from '../utils/gameUtils';

interface GameBoardProps {
  snake: Position[];
  food: Position;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food }) => {
  return (
    <div 
      className="relative bg-gray-800 border-2 border-gray-700"
      style={{
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
      }}
    >
      {snake.map((segment, index) => (
        <div
          key={`snake-segment-${index}`}
          className={`absolute rounded-sm ${
            index === 0 ? 'bg-green-500' : 'bg-green-400'
          }`}
          style={{
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
          }}
        />
      ))}
      <div
        className="absolute bg-red-500 rounded-full"
        style={{
          width: CELL_SIZE - 2,
          height: CELL_SIZE - 2,
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
        }}
      />
    </div>
  );
};

export default GameBoard;