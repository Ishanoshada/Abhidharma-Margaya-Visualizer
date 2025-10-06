import React from 'react';
import { KASINA_TYPES, type KasinaType } from '../types';

interface ControlPanelProps {
    selectedKasina: KasinaType;
    onKasinaChange: (kasina: KasinaType) => void;
    speed: number;
    onSpeedChange: (speed: number) => void;
    isPlaying: boolean;
    onPlayPause: () => void;
    onReset: () => void;
    onOpenSpeedCustomizer: () => void;
    realKshanasPerSec: number;
}

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.648c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.718-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
  </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-4.518a.75.75 0 0 0-.75.75v4.518l1.903-1.903a.75.75 0 0 0-1.06-1.061l-1.904 1.903a5.997 5.997 0 0 0-9.22 3.192.75.75 0 0 0 1.413.53A4.498 4.498 0 0 1 12 6.75a4.5 4.5 0 0 1 4.5 4.5a.75.75 0 0 0 1.5 0A6 6 0 0 0 6.39 6.391a.75.75 0 0 0-.992 1.06l1.353 1.353a.75.75 0 0 0 1.06 1.06l-1.903-1.903a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" />
    </svg>
);


const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a.563.563 0 0 0-.16.375l-.83 3.32a.563.563 0 0 0 .64.64l3.32-.83a.563.563 0 0 0 .375-.16l12.15-12.15Z" />
    </svg>
);


export const ControlPanel: React.FC<ControlPanelProps> = ({ 
    selectedKasina, onKasinaChange, speed, onSpeedChange, isPlaying, onPlayPause, onReset, onOpenSpeedCustomizer, realKshanasPerSec
}) => {
    const slowdownFactor = realKshanasPerSec / speed;

    return (
        <div className="bg-slate-800/50 p-4 rounded-2xl shadow-lg border border-slate-700 flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex flex-col w-full md:w-auto">
                <label htmlFor="kasina-select" className="text-sm font-medium text-slate-400 mb-1">
                    Meditation Object
                </label>
                <select 
                    id="kasina-select"
                    value={selectedKasina}
                    onChange={(e) => onKasinaChange(e.target.value as KasinaType)}
                    className="bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                    {KASINA_TYPES.map(kasina => (
                        <option key={kasina} value={kasina}>{kasina}</option>
                    ))}
                </select>
            </div>
            
            <div className="flex flex-col w-full md:flex-1">
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor="speed-slider" className="text-sm font-medium text-slate-400">
                        Simulation Speed
                    </label>
                    <span className="text-sm font-mono bg-slate-700 px-2 py-0.5 rounded text-cyan-400">{speed.toFixed(1)} kshanas/sec</span>
                </div>
                <input 
                    id="speed-slider"
                    type="range"
                    min="1"
                    max="100"
                    step="0.5"
                    value={speed}
                    onChange={(e) => onSpeedChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                 <div className="text-right text-xs text-slate-500 mt-1 pr-1" title={`This simulation is ${slowdownFactor.toLocaleString()} times slower than the theoretical speed of consciousness.`}>
                    Real-time slowdown: {slowdownFactor.toExponential(1)}x
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={onPlayPause}
                    className="p-3 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                 <button 
                    onClick={onReset}
                    className="p-3 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                    aria-label="Reset Simulation"
                    title="Reset Simulation"
                >
                    <ResetIcon />
                </button>
                 <button 
                    onClick={onOpenSpeedCustomizer}
                    className="p-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    aria-label="Customize Speed"
                    title="Customize Speed"
                >
                    <EditIcon />
                </button>
            </div>
        </div>
    );
};