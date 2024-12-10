import React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onRestart: () => void;
  onPause: () => void;
  isPaused: boolean;
  score: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  onRestart,
  onPause,
  isPaused,
  score,
}) => {
  return (
    <div className="mt-4 text-center">
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-800">得分：{score}</p>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <RotateCcw size={20} />
          重新开始
        </button>
        <button
          onClick={onPause}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
          {isPaused ? '继续' : '暂停'}
        </button>
      </div>
      <div className="mt-6">
        <p className="text-gray-600 mb-2">操作方式：</p>
        <div className="flex justify-center gap-2">
          <ArrowUp className="text-gray-600" />
          <ArrowDown className="text-gray-600" />
          <ArrowLeft className="text-gray-600" />
          <ArrowRight className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default GameControls;