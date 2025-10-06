
import React, { useState, useEffect, useCallback } from 'react';
import type { Language, CittaInstance, ArpanaScenario } from '../types';
import { ExplanationModal } from './ExplanationModal';
import { ARPANA_DATA, CITTAS } from '../constants';
import { EXPLANATIONS } from '../explanations';
import { StoryDisplay } from './StoryDisplay';
import { CittaLog } from './CittaLog';

// ICONS
const PlayIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.648c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.718-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg> );
const PauseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3zm7.5 0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" /></svg> );
const ResetIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-4.518a.75.75 0 0 0-.75.75v4.518l1.903-1.903a.75.75 0 0 0-1.06-1.061l-1.904 1.903a5.997 5.997 0 0 0-9.22 3.192.75.75 0 0 0 1.413.53A4.498 4.498 0 0 1 12 6.75a4.5 4.5 0 0 1 4.5 4.5a.75.75 0 0 0 1.5 0A6 6 0 0 0 6.39 6.391a.75.75 0 0 0-.992 1.06l1.353 1.353a.75.75 0 0 0 1.06 1.06l-1.903-1.903a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" /></svg> );
const InfoButton: React.FC<{onClick: () => void}> = ({ onClick }) => ( <button onClick={onClick} className="ml-3 text-xs bg-slate-700 text-red-400 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse" title="What is this?">What is this?</button> );

const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

const initialStory: Record<Language, string> = {
    en: 'Select a scenario to visualize the path to absorption and enlightenment.',
    si: 'ධ්‍යාන සහ නිර්වාණ මාර්ගය දෘශ්‍යමාන කිරීමට අවස්ථාවක් තෝරන්න.',
    ta: 'உறிஞ்சுதல் மற்றும் அறிவொளிக்கான பாதையைக் காட்சிப்படுத்த ஒரு காட்சியினைத் தேர்ந்தெடுக்கவும்.',
    hi: 'अवशोषण और ज्ञानोदय के मार्ग की कल्पना करने के लिए एक परिदृश्य चुनें।',
};

// FIX: Added 'ta' and 'hi' properties to conform to Record<Language, string> type.
const FETTERS = [
  { id: 'sakkaya-ditthi', name: { si: 'සක්කාය දිට්ඨි', en: 'Self-illusion', ta: 'Self-illusion', hi: 'Self-illusion' } },
  { id: 'vicikiccha', name: { si: 'විචිකිච්ඡා', en: 'Doubt', ta: 'Doubt', hi: 'Doubt' } },
  { id: 'silabbata', name: { si: 'සීලබ්බත පරාමාස', en: 'Clinging to Rites', ta: 'Clinging to Rites', hi: 'Clinging to Rites' } },
  { id: 'kama-raga', name: { si: 'කාම රාග', en: 'Sensual Desire', ta: 'Sensual Desire', hi: 'Sensual Desire' } },
  { id: 'vyapada', name: { si: 'ව්‍යාපාද', en: 'Ill Will', ta: 'Ill Will', hi: 'Ill Will' } },
  { id: 'rupa-raga', name: { si: 'රූප රාග', en: 'Craving for Form', ta: 'Craving for Form', hi: 'Craving for Form' } },
  { id: 'arupa-raga', name: { si: 'අරූප රාග', en: 'Craving for Formless', ta: 'Craving for Formless', hi: 'Craving for Formless' } },
  { id: 'mana', name: { si: 'මානය', en: 'Conceit', ta: 'Conceit', hi: 'Conceit' } },
  { id: 'uddhacca', name: { si: 'උද්දච්ච', en: 'Restlessness', ta: 'Restlessness', hi: 'Restlessness' } },
  { id: 'avijja', name: { si: 'අවිජ්ජා', en: 'Ignorance', ta: 'Ignorance', hi: 'Ignorance' } },
];

type PathId = 'sotapatti' | 'sakadagami' | 'anagami' | 'arahatta';

const PATHS: { id: PathId, name: Record<Language, string>, citta: string, eradicates: string[], weakens: string[] }[] = [
  { id: 'sotapatti', name: { si: 'සෝතාපත්ති', en: 'Stream-Entry' }, citta: 'Sotāpatti-magga', eradicates: ['sakkaya-ditthi', 'vicikiccha', 'silabbata'], weakens: [] },
  { id: 'sakadagami', name: { si: 'සකදාගාමී', en: 'Once-Return' }, citta: 'Sakadāgāmi-magga', eradicates: [], weakens: ['kama-raga', 'vyapada'] },
  { id: 'anagami', name: { si: 'අනාගාමී', en: 'Non-Return' }, citta: 'Anāgāmi-magga', eradicates: ['kama-raga', 'vyapada'], weakens: [] },
  { id: 'arahatta', name: { si: 'අරහත්', en: 'Arahantship' }, citta: 'Arahatta-magga', eradicates: ['rupa-raga', 'arupa-raga', 'mana', 'uddhacca', 'avijja'], weakens: [] },
];

const initialNibbanaStory: Record<Language, string> = {
    en: 'Select a path to see which fetters are eradicated.',
    si: 'ප්‍රහාණය වන සංයෝජන බැලීමට මාර්ගයක් තෝරන්න.',
    ta: 'Select a path to see which fetters are eradicated.',
    hi: 'Select a path to see which fetters are eradicated.',
};

export const Arpana: React.FC = () => {
    // State for Vithi visualization
    const [speed, setSpeed] = useState(1500);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [selectedScenario, setSelectedScenario] = useState<ArpanaScenario | null>(null);
    const [selectedPractitioner, setSelectedPractitioner] = useState<'dandhabhinna' | 'khippabhinna'>('dandhabhinna');
    const [currentStory, setCurrentStory] = useState<Record<Language, string>>(initialStory);
    const [selectedLang, setSelectedLang] = useState<Language>('en');
    const [cittaHistory, setCittaHistory] = useState<CittaInstance[]>([]);
    const [isCittaLogOpen, setIsCittaLogOpen] = useState(false);

    // New state for Nibbana animation
    const [selectedPath, setSelectedPath] = useState<PathId | null>(null);
    const [isNibbanaPlaying, setIsNibbanaPlaying] = useState(false);
    const [shatteredFetters, setShatteredFetters] = useState<Set<string>>(new Set());
    const [weakenedFetters, setWeakenedFetters] = useState<Set<string>>(new Set());
    const [activeFetter, setActiveFetter] = useState<string | null>(null);
    const [nibbanaSpeed, setNibbanaSpeed] = useState(1000);
    const [nibbanaStory, setNibbanaStory] = useState<Record<Language, string>>(initialNibbanaStory);

    const activeSteps = selectedScenario?.practitionerTypes.find(p => p.id === selectedPractitioner)?.steps;

    const resetState = useCallback((scenario: ArpanaScenario | null) => {
        setIsPlaying(false);
        setActiveIndex(0);
        setCittaHistory([]);
        setIsCittaLogOpen(!!scenario);
        setCurrentStory(scenario ? scenario.practitionerTypes.find(p => p.id === selectedPractitioner)!.steps[0].story : initialStory);
    }, [selectedPractitioner]);
    
    // Nibbana animation logic
    useEffect(() => {
        if (!isNibbanaPlaying || !selectedPath) return;

        const pathData = PATHS.find(p => p.id === selectedPath);
        if (!pathData) return;

        const fettersToAnimate = [...pathData.eradicates, ...pathData.weakens];
        let currentIndex = -1; // Start with Magga Citta

        const animateNext = () => {
            if (currentIndex < fettersToAnimate.length) {
                if (currentIndex === -1) {
                    // FIX: Added 'ta' and 'hi' properties to conform to Record<Language, string> type.
                    setNibbanaStory({en: `The ${pathData.citta} consciousness arises, targeting the defilements...`, si: `${pathData.citta} චිත්තය පහළ වී, කෙලෙස් ප්‍රහාණය කිරීම අරඹයි...`, ta: `The ${pathData.citta} consciousness arises, targeting the defilements...`, hi: `The ${pathData.citta} consciousness arises, targeting the defilements...`});
                    setActiveFetter(pathData.citta);
                } else {
                    const fetterId = fettersToAnimate[currentIndex];
                    const fetter = FETTERS.find(f => f.id === fetterId)!;
                    const isWeakened = pathData.weakens.includes(fetterId);
                    // FIX: Added 'ta' and 'hi' properties to conform to Record<Language, string> type.
                    setNibbanaStory({en: `${isWeakened ? 'Weakening' : 'Eradicating'} the fetter of ${fetter.name.en}...`, si: `${getTranslation(fetter.name)} නම් සංයෝජනය ${isWeakened ? 'දුර්වල' : 'ප්‍රහාණය'} කරමින්...`, ta: `${isWeakened ? 'Weakening' : 'Eradicating'} the fetter of ${fetter.name.en}...`, hi: `${isWeakened ? 'Weakening' : 'Eradicating'} the fetter of ${fetter.name.en}...`});
                    setActiveFetter(fetterId);
                }

                setTimeout(() => {
                    if (currentIndex > -1) {
                        const fetterId = fettersToAnimate[currentIndex];
                        if (pathData.eradicates.includes(fetterId)) {
                            setShatteredFetters(prev => new Set(prev).add(fetterId));
                        } else {
                            setWeakenedFetters(prev => new Set(prev).add(fetterId));
                        }
                    }
                    currentIndex++;
                    animateNext();
                }, nibbanaSpeed);

            } else {
                // Animation finished
                setIsNibbanaPlaying(false);
                setActiveFetter(null);
                 // FIX: Added 'ta' and 'hi' properties to conform to Record<Language, string> type.
                 setNibbanaStory({en: 'The path is complete. The corresponding fetters have been dealt with.', si: 'මාර්ගය සම්පූර්ණයි. අදාළ සංයෝජන ධර්මයන් ප්‍රහාණය කරන ලදී.', ta: 'The path is complete. The corresponding fetters have been dealt with.', hi: 'The path is complete. The corresponding fetters have been dealt with.'});
            }
        };

        animateNext();

    }, [isNibbanaPlaying, selectedPath, nibbanaSpeed]);

    const handleSelectPath = (pathId: PathId) => {
        setIsNibbanaPlaying(false);
        setActiveFetter(null);
        setSelectedPath(pathId);
        const path = PATHS.find(p => p.id === pathId);
        if (path) {
            // FIX: Added 'ta' and 'hi' properties to conform to Record<Language, string> type.
            const story = {
                en: `This path ${path.eradicates.length > 0 ? `eradicates ${path.eradicates.length} fetter(s)` : ''}${path.eradicates.length > 0 && path.weakens.length > 0 ? ' and ' : ''}${path.weakens.length > 0 ? `weakens ${path.weakens.length} fetter(s)` : ''}. Press play.`,
                si: `මෙම මාර්ගයෙන් සංයෝජන ${path.eradicates.length}ක් ප්‍රහාණය කරන අතර, සංයෝජන ${path.weakens.length}ක් දුර්වල කරයි. Play බොත්තම ඔබන්න.`,
                ta: `This path ${path.eradicates.length > 0 ? `eradicates ${path.eradicates.length} fetter(s)` : ''}${path.eradicates.length > 0 && path.weakens.length > 0 ? ' and ' : ''}${path.weakens.length > 0 ? `weakens ${path.weakens.length} fetter(s)` : ''}. Press play.`,
                hi: `This path ${path.eradicates.length > 0 ? `eradicates ${path.eradicates.length} fetter(s)` : ''}${path.eradicates.length > 0 && path.weakens.length > 0 ? ' and ' : ''}${path.weakens.length > 0 ? `weakens ${path.weakens.length} fetter(s)` : ''}. Press play.`,
            };
            setNibbanaStory(story);
        }
    };
    
    const handleResetNibbana = () => {
        setIsNibbanaPlaying(false);
        setShatteredFetters(new Set());
        setWeakenedFetters(new Set());
        setActiveFetter(null);
        setSelectedPath(null);
        setNibbanaStory(initialNibbanaStory);
    };


    useEffect(() => {
        if (!isPlaying || !activeSteps) return;

        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => {
                const activeStep = activeSteps[prevIndex];
                const duration = activeStep.duration || 1;
                
                if (prevIndex >= activeSteps.length - 1) {
                    setIsPlaying(false);
                    return prevIndex;
                }
                const nextIndex = prevIndex + 1;
                const currentStep = activeSteps[nextIndex];
                
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
    }, [speed, isPlaying, activeSteps]);


    const handleSelectScenario = useCallback((scenarioId: string) => {
        const scenario = ARPANA_DATA.find(s => s.id === scenarioId) || null;
        setSelectedScenario(scenario);
        resetState(scenario);
    }, [resetState]);

    const handleSelectPractitioner = useCallback((practitionerId: 'dandhabhinna' | 'khippabhinna') => {
        setSelectedPractitioner(practitionerId);
        resetState(selectedScenario);
    }, [selectedScenario, resetState]);


    const handlePlayPause = useCallback(() => {
        if (selectedScenario) {
            setIsPlaying(prev => !prev);
            if (!isPlaying) {
                // If at the end, reset before playing again
                if (activeIndex >= (activeSteps?.length || 0) - 1) {
                    resetState(selectedScenario);
                    setTimeout(() => setIsPlaying(true), 100); // Start playing after reset
                } else if (cittaHistory.length === 0) { // If starting from fresh
                    const firstStep = activeSteps![0];
                     const firstCitta: CittaInstance = {
                        id: `${Date.now()}-0`,
                        citta: CITTAS[firstStep.cittaId],
                        startTime: Date.now(),
                        duration: 0,
                        label: firstStep.pali,
                    };
                    setCittaHistory([firstCitta]);
                    setCurrentStory(firstStep.story);
                }
            }
        }
    }, [selectedScenario, isPlaying, activeIndex, activeSteps, cittaHistory, resetState]);

    const handleReset = useCallback(() => {
        resetState(selectedScenario);
    }, [selectedScenario, resetState]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(3025 - Number(e.target.value));
    };
    
    const getTranslation = (obj: Record<Language, string>) => obj[selectedLang] || obj['en'];

    return (
        <>
            <style>{`
                @keyframes shatter {
                    0% { transform: scale(1) rotate(0deg); opacity: 1; }
                    100% { transform: scale(1.5) rotate(10deg); opacity: 0; }
                }
                .shattering {
                    animation: shatter 0.5s ease-out forwards;
                }
            `}</style>
            <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 p-6 flex flex-col gap-8">
                 <div className="pb-4 border-b border-slate-700">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-bold text-cyan-400">Arpaṇa Vīthi (අර්පණ වීථි)</h2>
                        <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                    </div>
                    <p className="text-slate-400 mt-1">From Meditative Absorption to the Path of Nirvāna.</p>
                </div>
                
                {/* --- CONTROLS --- */}
                <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-700 space-y-4">
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex items-center gap-2" role="tablist">
                            {LANGUAGES.map(lang => (
                                <button key={lang.id} onClick={() => setSelectedLang(lang.id)} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${selectedLang === lang.id ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`} role="tab" aria-selected={selectedLang === lang.id}>
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div className="space-y-4 pt-4 border-t border-slate-700">
                        <div className="flex flex-wrap gap-4 items-center">
                            <label className="text-lg font-semibold text-slate-300">1. Select Process:</label>
                            {ARPANA_DATA.map(scenario => (
                                <button key={scenario.id} onClick={() => handleSelectScenario(scenario.id)} className={`px-4 py-2 rounded-lg border-2 transition-colors ${selectedScenario?.id === scenario.id ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}>
                                    {getTranslation(scenario.title)}
                                </button>
                            ))}
                        </div>
                        {selectedScenario && (
                             <div className="flex flex-wrap gap-4 items-center">
                                <label className="text-lg font-semibold text-slate-300">2. Select Practitioner:</label>
                                {selectedScenario.practitionerTypes.map(pt => (
                                    <button key={pt.id} onClick={() => handleSelectPractitioner(pt.id)} className={`px-4 py-2 rounded-lg border-2 transition-colors ${selectedPractitioner === pt.id ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}>
                                        {getTranslation(pt.name)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 pt-4 border-t border-slate-700">
                        <div className="flex items-center gap-3">
                            <button onClick={handlePlayPause} className="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed" disabled={!selectedScenario}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                            <button onClick={handleReset} className="p-2 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all shadow-lg disabled:bg-slate-700 disabled:cursor-not-allowed" disabled={!selectedScenario}><ResetIcon /></button>
                        </div>
                        <div className="flex-grow w-full md:w-auto flex items-center gap-4">
                            <label htmlFor="arpana-speed-slider" className="text-sm font-medium text-slate-400">Speed</label>
                            <input id="arpana-speed-slider" type="range" min="25" max="3000" step="25" value={3025 - speed} onChange={handleSliderChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" disabled={!selectedScenario} />
                        </div>
                    </div>
                </div>

                <StoryDisplay text={getTranslation(currentStory)} />
                
                {/* --- VITHI VISUALIZATION --- */}
                {activeSteps && (
                    <div className="mt-2">
                        <h3 className="text-lg font-semibold text-slate-300 mb-4">Observe the Citta Vīthi Sequence:</h3>
                        <div className="flex flex-wrap justify-center gap-x-1 gap-y-4">
                           {activeSteps.map((step, index) => (
                               <React.Fragment key={index}>
                                    <div className="flex flex-col items-center gap-1 w-28 text-center">
                                        <div className={`
                                            w-24 h-12 rounded-lg transition-all duration-300 
                                            flex items-center justify-center px-1
                                            shadow-md border
                                            ${isPlaying && activeIndex === index
                                                ? 'bg-purple-600 border-purple-400 shadow-purple-500/40 scale-110'
                                                : 'bg-slate-700 border-slate-600'
                                            }
                                        `}>
                                            <span className="font-semibold text-white text-[13px] leading-tight">{step.pali}</span>
                                        </div>
                                         {step.duration && step.duration > 1 && <span className="text-xs text-slate-500">({step.duration} times)</span>}
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
                )}

                 {/* --- NIBBANA ANIMATION SECTION --- */}
                <div className="pt-8 border-t border-slate-700">
                     <h2 className="text-3xl font-bold text-cyan-400 mb-4">Eradication of Fetters (සංයෝජන ප්‍රහාණය)</h2>
                     <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-700 space-y-4">
                        <div className="flex flex-wrap gap-4 items-center">
                            <label className="text-lg font-semibold text-slate-300">1. Select Path:</label>
                            {PATHS.map(path => (
                                <button key={path.id} onClick={() => handleSelectPath(path.id)} className={`px-4 py-2 rounded-lg border-2 transition-colors ${selectedPath === path.id ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}>
                                    {getTranslation(path.name)}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 pt-4 border-t border-slate-700">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setIsNibbanaPlaying(p => !p)} className="p-2 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-all shadow-lg disabled:bg-slate-600" disabled={!selectedPath || isNibbanaPlaying}>{isNibbanaPlaying ? <PauseIcon /> : <PlayIcon />}</button>
                                <button onClick={handleResetNibbana} className="p-2 bg-slate-600 hover:bg-slate-500 rounded-full text-white transition-all shadow-lg"><ResetIcon /></button>
                            </div>
                            <div className="flex-grow w-full md:w-auto flex items-center gap-4">
                                <label htmlFor="nibbana-speed-slider" className="text-sm font-medium text-slate-400">Speed</label>
                                <input id="nibbana-speed-slider" type="range" min="200" max="2000" step="100" value={nibbanaSpeed} onChange={e => setNibbanaSpeed(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <StoryDisplay text={getTranslation(nibbanaStory)} />

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="flex flex-col items-center">
                             <h3 className="text-lg font-semibold text-slate-300 mb-4">The 10 Fetters (Saṃyojana)</h3>
                            <div className="space-y-2 w-full max-w-sm">
                                {FETTERS.map((fetter, i) => {
                                    const isShattered = shatteredFetters.has(fetter.id);
                                    const isWeakened = weakenedFetters.has(fetter.id);
                                    const isActivelyAnimating = activeFetter === fetter.id;
                                    
                                    let statusClass = "bg-slate-700/50 border-slate-600";
                                    if(isShattered) statusClass = "bg-slate-800 border-slate-700 text-slate-500 line-through";
                                    else if(isWeakened) statusClass = "bg-yellow-900/50 border-yellow-700 text-yellow-400";
                                    
                                    if(isActivelyAnimating) statusClass = `border-red-500 bg-red-900/50 animate-pulse`;

                                    return (
                                        <div key={fetter.id} className={`p-3 rounded-lg text-sm transition-all duration-500 border ${statusClass}`}>
                                            <span className="font-mono text-xs mr-2 text-slate-500">{(i + 1).toString().padStart(2, '0')}</span>
                                            <span>{getTranslation(fetter.name)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                         <div className="flex flex-col items-center">
                             <h3 className="text-lg font-semibold text-slate-300 mb-4">Path Consciousness</h3>
                             <div className={`p-4 rounded-lg text-center transition-all duration-300 border w-48 h-24 flex items-center justify-center ${activeFetter && PATHS.some(p => p.citta === activeFetter) ? 'bg-purple-600 border-purple-400 scale-110 shadow-lg' : 'bg-slate-700/50 border-slate-600'}`}>
                                 <span className="text-xl font-bold">{selectedPath ? PATHS.find(p=>p.id === selectedPath)?.citta : 'Magga Citta'}</span>
                            </div>
                            <div className="w-1.5 h-16 bg-gradient-to-b from-purple-500 to-transparent mt-2"></div>
                            <div className="w-32 h-32 rounded-full border-2 border-purple-400/50 flex items-center justify-center nibbana-glow">
                                <span className="text-2xl font-bold text-purple-300">Nibbāna</span>
                            </div>
                         </div>
                    </div>
                </div>

            </div>
            
            {selectedScenario && <div className="mt-8"><CittaLog cittaHistory={cittaHistory} isOpen={isCittaLogOpen} setIsOpen={setIsCittaLogOpen} /></div>}
            
            <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.arpanaVithi}
            />
        </>
    );
};
