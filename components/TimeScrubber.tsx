import React from 'react';

interface TimeScrubberProps {
    currentTime: number;
    totalDuration: number;
    onTimeChange: (newTime: number) => void;
}

const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export const TimeScrubber: React.FC<TimeScrubberProps> = ({ currentTime, totalDuration, onTimeChange }) => {
    return (
        <div className="mt-4 flex items-center gap-4 px-2">
            <span className="font-mono text-sm text-slate-400">{formatTime(currentTime)}</span>
            <input
                type="range"
                min="0"
                max={totalDuration}
                value={currentTime}
                onChange={(e) => onTimeChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                aria-label="Meditation time scrubber"
            />
            <span className="font-mono text-sm text-slate-400">{formatTime(totalDuration)}</span>
        </div>
    );
};
