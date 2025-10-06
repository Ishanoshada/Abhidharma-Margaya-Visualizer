
import React, { useState, useMemo } from 'react';
import type { KasinaType } from '../types';

interface MeditationLogProps {
    currentTime: number; // in milliseconds
    totalDuration: number; // in milliseconds
    selectedKasina: KasinaType;
}

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

const LOG_ENTRIES = [
    { time: 0, text: "The session begins. The mind settles, focusing on the concept of {kasina}." },
    { time: 1, text: "Initial distractions arise, but the focus gently returns to the object of meditation." },
    { time: 5, text: "Access concentration is achieved. The meditation object becomes clearer and more stable in the mind's eye." },
    { time: 10, text: "The first Dhyāna arises. A state of pleasant sensation (Pīti) and happiness (Sukha) pervades the mind, accompanied by initial and sustained thought (Vitakka-Vicāra)." },
    { time: 20, text: "Concentration deepens within the first Dhyāna. The mind remains absorbed with the object." },
    { time: 25, text: "The mind transitions to the second Dhyāna. Initial and sustained thought fade away, leaving profound inner tranquility and one-pointedness." },
    { time: 30, text: "Stability in the second Dhyāna is cultivated. Rapture and happiness remain strong." },
    { time: 35, text: "Rapture (Pīti) fades, leading to the third Dhyāna. A more subtle, equanimous happiness (Sukha) remains with mindfulness." },
    { time: 40, text: "The fourth Dhyāna is attained. Even happiness is relinquished, giving way to pure equanimity (Upekkhā) and one-pointedness." },
    { time: 45, text: "The session concludes. The mind gently withdraws from the deep state of concentration." },
];

export const MeditationLog: React.FC<MeditationLogProps> = ({ currentTime, totalDuration, selectedKasina }) => {
    const [isOpen, setIsOpen] = useState(true); // Default to open
    const currentMinutes = (currentTime / totalDuration) * 45;

    const visibleLogs = useMemo(() => {
        const logs = LOG_ENTRIES
            .filter(entry => currentMinutes >= entry.time)
            .map(entry => ({
                ...entry,
                text: entry.text.replace('{kasina}', selectedKasina)
            }));

        // The final log entry should only show when the time is at the end
        if (currentTime < totalDuration && logs.length > 0 && logs[logs.length-1].time === 45) {
            logs.pop();
        }

        return logs.reverse(); // Show latest first
    }, [currentMinutes, selectedKasina, totalDuration, currentTime]);

    return (
        <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left">
                <h2 className="text-xl font-bold text-slate-300">Meditation Journey (භාවනා ගමන)</h2>
                <div className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                </div>
            </button>
            {isOpen && (
                 <div className="px-4 pb-4">
                    <div className="max-h-60 overflow-y-auto space-y-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                       {visibleLogs.length > 0 ? visibleLogs.map(log => (
                           <div key={log.time} className="flex items-start gap-3 animate-citta-arise">
                               <div className="w-16 text-right font-mono text-xs text-cyan-400 pt-1 flex-shrink-0">
                                   {log.time.toString().padStart(2, '0')}:00 min
                               </div>
                               <div className="border-l-2 border-slate-600 pl-3">
                                   <p className="text-sm text-slate-300">{log.text}</p>
                               </div>
                           </div>
                       )) : (
                            <p className="text-sm text-slate-500 text-center p-4">The meditation journey will be logged here as you progress. Press play to begin.</p>
                       )}
                    </div>
                </div>
            )}
        </div>
    );
};
