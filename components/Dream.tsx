import React, { useState, useCallback } from 'react';
import { Timeline } from './Timeline';
import { CittaLog } from './CittaLog';
import { StoryDisplay } from './StoryDisplay';
import { ExplanationModal } from './ExplanationModal';
import { DREAM_SCENARIOS } from '../constants';
import type { DreamScenario, Language, CittaInstance } from '../types';
import { EXPLANATIONS } from '../explanations';

const PlayIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.648c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.718-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
  </svg>
);

const ResetIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-4.518a.75.75 0 0 0-.75.75v4.518l1.903-1.903a.75.75 0 0 0-1.06-1.061l-1.904 1.903a5.997 5.997 0 0 0-9.22 3.192.75.75 0 0 0 1.413.53A4.498 4.498 0 0 1 12 6.75a4.5 4.5 0 0 1 4.5 4.5a.75.75 0 0 0 1.5 0A6 6 0 0 0 6.39 6.391a.75.75 0 0 0-.992 1.06l1.353 1.353a.75.75 0 0 0 1.06 1.06l-1.903-1.903a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" />
    </svg>
);

const InfoButton: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <button onClick={onClick} className="ml-3 text-xs bg-slate-700 text-red-400 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse" title="What is this?">
        What is this?
    </button>
);

const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

const initialStory: Record<Language, string> = {
    en: 'Select a dream scenario to begin.',
    si: 'ආරම්භ කිරීමට සිහින අවස්ථාවක් තෝරන්න.',
    ta: 'தொடங்குவதற்கு ஒரு கனவுக் காட்சியைத் தேர்ந்தெடுக்கவும்.',
    hi: 'शुरू करने के लिए एक स्वप्न परिदृश्य चुनें।'
};

const playPrompt: Record<Language, string> = {
    en: 'Press play to start the dream sequence.',
    si: 'සිහින අනුපිළිවෙල ආරම්භ කිරීමට play බොත්තම ඔබන්න.',
    ta: 'கனவு காட்சியைத் தொடங்க ப்ளே பொத்தானை அழுத்தவும்.',
    hi: 'स्वप्न अनुक्रम शुरू करने के लिए प्ले बटन दबाएं।'
};

export const Dream: React.FC = () => {
    const [selectedDream, setSelectedDream] = useState<DreamScenario | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [cittaHistory, setCittaHistory] = useState<CittaInstance[]>([]);
    const [currentStory, setCurrentStory] = useState<Record<Language, string>>(initialStory);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [speed, setSpeed] = useState<number>(7);
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [isCittaLogOpen, setIsCittaLogOpen] = useState(false);

    const handleSelectDream = useCallback((dream: DreamScenario) => {
        setSelectedDream(dream);
        setIsPlaying(false);
        setCittaHistory([]);
        setCurrentStory(dream.vithi[0]?.story || playPrompt);
        setIsCittaLogOpen(true);
    }, []);

    const handlePlayPause = useCallback(() => {
        if (selectedDream) {
            setIsPlaying(prev => !prev);
        }
    }, [selectedDream]);

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setCittaHistory([]);
        if (selectedDream) {
           setCurrentStory(selectedDream.vithi[0]?.story || playPrompt);
        }
        setIsCittaLogOpen(false);
    }, [selectedDream]);

    const handleCittaSpawn = useCallback((instance: CittaInstance) => {
        setCittaHistory(prev => [instance, ...prev.slice(0, 199)]);
    }, []);

    const handleStoryUpdate = useCallback((story: Record<Language, string>) => {
        setCurrentStory(story);
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6">
                <div className="pb-4 mb-6 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">Dream State (සිහින අවස්ථාව)</h2>
                        <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <p className="text-slate-400 mt-1">Visualizing mind-door processes during dream states.</p>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-300 mb-3">1. Choose a Dream Scenario:</h3>
                        <div className="flex flex-wrap gap-4">
                            {DREAM_SCENARIOS.map(dream => (
                                <button
                                    key={dream.id}
                                    onClick={() => handleSelectDream(dream)}
                                    className={`px-4 py-2 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
                                        ${selectedDream?.id === dream.id 
                                            ? 'bg-cyan-600 border-cyan-500 text-white' 
                                            : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500 text-slate-300'}`
                                    }
                                    aria-pressed={selectedDream?.id === dream.id}
                                >
                                    {dream.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <StoryDisplay text={currentStory[selectedLang] || currentStory['en']} />

                    <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row items-center gap-6">
                         <div className="flex-shrink-0">
                            <h3 className="text-lg font-semibold text-slate-300 mb-2 md:mb-0">2. Control Animation:</h3>
                         </div>
                         <div className="flex items-center gap-3">
                            <button 
                                onClick={handlePlayPause}
                                className="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed"
                                aria-label={isPlaying ? 'Pause Dream' : 'Play Dream'}
                                disabled={!selectedDream}
                            >
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>
                            <button 
                                onClick={handleReset}
                                className="p-2 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:bg-slate-700 disabled:cursor-not-allowed"
                                aria-label="Reset Dream"
                                disabled={!selectedDream}
                            >
                                <ResetIcon />
                            </button>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="dream-speed-slider" className="text-sm font-medium text-slate-400">Animation Speed</label>
                                <span className="text-sm font-mono bg-slate-700 px-2 py-0.5 rounded text-cyan-400">{speed.toFixed(1)} k/s</span>
                            </div>
                            <input 
                                id="dream-speed-slider"
                                type="range"
                                min="1" max="20" step="0.5"
                                value={speed}
                                onChange={(e) => setSpeed(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:bg-slate-800"
                                disabled={!selectedDream}
                            />
                        </div>
                         <div className="flex items-center gap-2" role="tablist" aria-label="Language selection">
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

                    {selectedDream && (
                        <div>
                             <h3 className="text-lg font-semibold text-slate-300 mb-4">3. Observe the Citta Vīthi:</h3>
                            <Timeline
                                key={selectedDream.id}
                                isPlaying={isPlaying}
                                vithi={selectedDream.vithi}
                                speed={speed}
                                onCittaSpawn={handleCittaSpawn}
                                onStoryUpdate={handleStoryUpdate}
                                allowDistractions={false}
                            />
                        </div>
                    )}
                </div>
            </div>
            
            {selectedDream && <CittaLog cittaHistory={cittaHistory} isOpen={isCittaLogOpen} setIsOpen={setIsCittaLogOpen} />}

            <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.dreamVithi}
            />
        </div>
    );
};