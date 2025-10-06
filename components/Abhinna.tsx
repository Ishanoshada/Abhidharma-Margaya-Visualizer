
import React, { useState, useEffect, useCallback } from 'react';
import { StoryDisplay } from './StoryDisplay';
import { ExplanationModal } from './ExplanationModal';
import { CittaLog } from './CittaLog';
import { CITTAS, ABHINNA_EXAMPLES } from '../constants';
import { EXPLANATIONS } from '../explanations';
import type { Language, CittaInstance, AbhinnaScenario } from '../types';

const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.648c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.718-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" /></svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-4.518a.75.75 0 0 0-.75.75v4.518l1.903-1.903a.75.75 0 0 0-1.06-1.061l-1.904 1.903a5.997 5.997 0 0 0-9.22 3.192.75.75 0 0 0 1.413.53A4.498 4.498 0 0 1 12 6.75a4.5 4.5 0 0 1 4.5 4.5a.75.75 0 0 0 1.5 0A6 6 0 0 0 6.39 6.391a.75.75 0 0 0-.992 1.06l1.353 1.353a.75.75 0 0 0 1.06 1.06l-1.903-1.903a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" /></svg>
);

const InfoButton: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <button onClick={onClick} className="ml-3 text-xs bg-slate-700 text-red-400 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse" title="What is this?">
        What is this?
    </button>
);

const initialStory: Record<Language, string> = {
    en: 'Select a higher knowledge (Abhiññā) scenario to begin.',
    si: 'ආරම්භ කිරීමට අභිඤ්ඤා අවස්ථාවක් තෝරන්න.',
    ta: 'தொடங்குவதற்கு ஒரு உயர் அறிவு (அபிஞ்ஞா) காட்சியினைத் தேர்ந்தெடுக்கவும்.',
    hi: 'शुरू करने के लिए एक उच्च ज्ञान (अभिज्ञा) परिदृश्य चुनें।',
};

export const Abhinna: React.FC = () => {
    const [speed, setSpeed] = useState(1500); // Interval in ms
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [selectedExample, setSelectedExample] = useState<AbhinnaScenario | null>(null);
    const [currentStory, setCurrentStory] = useState<Record<Language, string>>(initialStory);
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [cittaHistory, setCittaHistory] = useState<CittaInstance[]>([]);
    const [isCittaLogOpen, setIsCittaLogOpen] = useState(false);

    useEffect(() => {
        if (!isPlaying || !selectedExample) return;

        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % selectedExample.steps.length;
                const currentStep = selectedExample.steps[nextIndex];
                
                setCurrentStory(currentStep.story);

                const newCittaInstance: CittaInstance = {
                    id: `${Date.now()}-${nextIndex}`,
                    citta: CITTAS[currentStep.cittaId],
                    startTime: Date.now(),
                    duration: 0,
                    label: currentStep.pali,
                };
                setCittaHistory(prev => [newCittaInstance, ...prev.slice(0, 199)]);

                return nextIndex;
            });
        }, speed);

        return () => clearInterval(intervalId);
    }, [speed, isPlaying, selectedExample]);

    const handleSelectExample = useCallback((example: AbhinnaScenario) => {
        setSelectedExample(example);
        setIsPlaying(false);
        setActiveIndex(0);
        setCurrentStory(example.initialStory);
        setCittaHistory([]);
        setIsCittaLogOpen(true);
    }, []);

    const handlePlayPause = useCallback(() => {
        if (selectedExample) {
            setIsPlaying(prev => !prev);
            if (!isPlaying) {
                if (cittaHistory.length === 0) {
                     const firstStep = selectedExample.steps[0];
                     const firstCitta: CittaInstance = {
                        id: `${Date.now()}-0`,
                        citta: CITTAS[firstStep.cittaId],
                        startTime: Date.now(),
                        duration: 0,
                        label: firstStep.pali,
                    };
                    setCittaHistory([firstCitta]);
                }
                setCurrentStory(selectedExample.steps[activeIndex].story);
            }
        }
    }, [selectedExample, isPlaying, activeIndex, cittaHistory]);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setActiveIndex(0);
        setCittaHistory([]);
        if (selectedExample) {
            setCurrentStory(selectedExample.initialStory);
        }
        setIsCittaLogOpen(false);
    }, [selectedExample]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(3025 - Number(e.target.value));
    };
    
    const activeSteps = selectedExample?.steps;

    return (
        <>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6">
                 <div className="pb-4 mb-6 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">Higher Knowledges (අභිඤ්ඤා)</h2>
                        <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <p className="text-slate-400 mt-1">Visualizing the mind-processes of supernormal abilities.</p>
                </div>

                <div className="space-y-6">
                     <div>
                        <h3 className="text-lg font-semibold text-slate-300 mb-3">1. Choose a Scenario:</h3>
                        <div className="flex flex-wrap gap-4">
                            {ABHINNA_EXAMPLES.map(example => (
                                <button
                                    key={example.id}
                                    onClick={() => handleSelectExample(example)}
                                    className={`px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
                                        ${selectedExample?.id === example.id 
                                            ? 'bg-cyan-600 border-cyan-500 text-white' 
                                            : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 text-slate-300'}`
                                    }
                                    aria-pressed={selectedExample?.id === example.id}
                                >
                                    {example.title[selectedLang] || example.title['en']}
                                </button>
                            ))}
                        </div>
                    </div>

                    <StoryDisplay text={currentStory[selectedLang] || currentStory['en']} />

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-slate-300 mb-4">2. Observe the Citta Vīthi Sequence:</h3>
                        <div className="flex flex-wrap justify-center gap-x-2 gap-y-4">
                           {activeSteps && activeSteps.map((step, index) => (
                               <React.Fragment key={index}>
                                    <div className="flex flex-col items-center gap-1 w-32">
                                        <div className={`
                                            w-24 h-12 rounded-lg transition-all duration-500 
                                            flex items-center justify-center text-center px-1
                                            shadow-md border
                                            ${isPlaying && activeIndex === index
                                                ? 'bg-purple-600 border-purple-400 shadow-purple-500/40 scale-110'
                                                : 'bg-slate-700 border-slate-600'
                                            }
                                        `}>
                                            <span className="font-semibold text-white text-sm">{step.pali}</span>
                                        </div>
                                    </div>
                                    {index < activeSteps.length - 1 && (
                                        <div className="flex items-center self-start mt-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500">
                                                <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                               </React.Fragment>
                           ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 mt-8 pt-6 border-t border-slate-700">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handlePlayPause}
                                className="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed"
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                                title={isPlaying ? 'Pause' : 'Play'}
                                disabled={!selectedExample}
                            >
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>
                            <button 
                                onClick={handleReset}
                                className="p-2 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-700 disabled:cursor-not-allowed"
                                aria-label="Reset"
                                title="Reset"
                                disabled={!selectedExample}
                            >
                                <ResetIcon />
                            </button>
                        </div>
                        <div className="flex-grow w-full md:w-auto flex items-center gap-4">
                            <label htmlFor="abhinna-speed-slider" className="text-sm font-medium text-slate-400 whitespace-nowrap">
                                Speed
                            </label>
                            <input
                                id="abhinna-speed-slider"
                                type="range"
                                min="25"
                                max="3000"
                                step="25"
                                value={3025 - speed}
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                aria-label="Animation speed"
                                disabled={!selectedExample}
                            />
                        </div>
                         <div className="flex items-center gap-2 pl-4 border-l border-slate-600" role="tablist" aria-label="Language selection">
                            {LANGUAGES.map(lang => (
                                 <button
                                    key={lang.id}
                                    onClick={() => setSelectedLang(lang.id)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${selectedLang === lang.id ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                                    role="tab"
                                    aria-selected={selectedLang === lang.id}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {selectedExample && <div className="mt-8"><CittaLog cittaHistory={cittaHistory} isOpen={isCittaLogOpen} setIsOpen={setIsCittaLogOpen} /></div>}

            <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.abhinna}
            />
        </>
    );
};
