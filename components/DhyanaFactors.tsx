
import React, { useState, useMemo } from 'react';
import { DHYANA_STAGES } from '../constants';

interface DhyanaFactorsProps {
    currentTime: number;
    totalDuration: number;
}

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

const FACTORS_METADATA = {
    concentration: { name: 'Concentration', pali: 'Samādhi', fromColor: 'from-emerald-500', toColor: 'to-green-500', description: 'Overall stability and focus of the mind.' },
    vitakka: { name: 'Initial Application', pali: 'Vitakka (විතක්ක)', fromColor: 'from-cyan-500', toColor: 'to-sky-400', description: 'Directs the mind onto the meditation object. Counteracts Sloth & Torpor.' },
    vicara: { name: 'Sustained Application', pali: 'Vicāra (විචාර)', fromColor: 'from-sky-500', toColor: 'to-blue-400', description: 'Keeps the mind anchored to the object. Counteracts Doubt.' },
    piti: { name: 'Rapture', pali: 'Pīti (පීති)', fromColor: 'from-blue-500', toColor: 'to-indigo-400', description: 'Joyful interest and zest in the object. Counteracts Ill-Will.' },
    sukha: { name: 'Happiness', pali: 'Sukha (සුඛ)', fromColor: 'from-indigo-500', toColor: 'to-violet-400', description: 'A pleasant, blissful feeling. Counteracts Restlessness & Worry.' },
    upekkha: { name: 'Equanimity', pali: 'Upekkhā (උපෙක්ඛා)', fromColor: 'from-violet-500', toColor: 'to-purple-400', description: 'Neutral, balanced feeling, transcending joy. Replaces Sukha in the highest state.' },
    ekaggata: { name: 'One-Pointedness', pali: 'Ekaggatā (එකග්ගතා)', fromColor: 'from-purple-500', toColor: 'to-fuchsia-400', description: 'Unification of mind on a single object. Counteracts Sensual Desire.' },
};

const FactorBar: React.FC<{ label: string; pali: string; value: number; fromColor: string; toColor: string; description: string; }> = ({ label, pali, value, fromColor, toColor, description }) => (
    <div className="flex flex-col gap-1" title={description}>
        <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium text-slate-300">{label}</span>
            <span className="text-xs text-slate-400">{pali}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div 
                className={`bg-gradient-to-r ${fromColor} ${toColor} h-2.5 rounded-full transition-all duration-500 ease-out`} 
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);


export const DhyanaFactors: React.FC<DhyanaFactorsProps> = ({ currentTime, totalDuration }) => {
    const [isOpen, setIsOpen] = useState(true);

    const currentFactors = useMemo(() => {
        const currentMinutes = (currentTime / totalDuration) * 45;
        
        const endIdx = DHYANA_STAGES.findIndex(stage => stage.time >= currentMinutes);
        if (endIdx === -1) return DHYANA_STAGES[DHYANA_STAGES.length - 1].factors;
        if (endIdx === 0) return DHYANA_STAGES[0].factors;
        
        const startIdx = endIdx - 1;
        const startStage = DHYANA_STAGES[startIdx];
        const endStage = DHYANA_STAGES[endIdx];

        const progress = (currentMinutes - startStage.time) / (endStage.time - startStage.time);

        const interpolatedFactors: { [key: string]: number } = {};
        for (const key in startStage.factors) {
            const startValue = startStage.factors[key as keyof typeof startStage.factors];
            const endValue = endStage.factors[key as keyof typeof endStage.factors];
            interpolatedFactors[key] = startValue + progress * (endValue - startValue);
        }
        
        return interpolatedFactors;

    }, [currentTime, totalDuration]);

    // Map Ekaggata's range [10, 100] to Concentration's range [10, 90]
    const concentrationValue = 10 + ((currentFactors.ekaggata - 10) / 90) * 80;


    const factorsToDisplay = Object.entries(FACTORS_METADATA)
        .filter(([key]) => key !== 'concentration')
        .map(([key, meta]) => ({
            key,
            ...meta,
            value: currentFactors[key]
        }));


    return (
        <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 h-full flex flex-col">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left">
                <h2 className="text-xl font-bold text-slate-300">Dhyāna Factors (ධ්‍යාන අංග)</h2>
                <div className={`transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-180' : ''}`}>
                    <ChevronDown />
                </div>
            </button>
            {isOpen && (
                 <div className="px-6 pb-6 pt-2 flex-grow flex flex-col gap-4">
                    <div>
                         <FactorBar
                            label={FACTORS_METADATA.concentration.name}
                            pali={FACTORS_METADATA.concentration.pali}
                            value={concentrationValue}
                            fromColor={FACTORS_METADATA.concentration.fromColor}
                            toColor={FACTORS_METADATA.concentration.toColor}
                            description={FACTORS_METADATA.concentration.description}
                        />
                    </div>
                    <div className="border-t border-slate-700 pt-4 flex-grow flex flex-col gap-3">
                        {factorsToDisplay.map(factor => (
                            <FactorBar 
                                key={factor.key}
                                label={factor.name}
                                pali={factor.pali}
                                value={factor.value}
                                fromColor={factor.fromColor}
                                toColor={factor.toColor}
                                description={factor.description}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
