
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { Timeline } from './components/Timeline';
import { DhyanaGraph } from './components/DhyanaGraph';
import { DhyanaFactors } from './components/DhyanaFactors';
import { CittaLog } from './components/CittaLog';
import { MeditationLog } from './components/MeditationLog';
import { SpeedCustomizer } from './components/SpeedCustomizer';
import { TimeScrubber } from './components/TimeScrubber';
import { Panchaskandha } from './components/Panchaskandha';
import { Dream } from './components/Dream';
import { Abhinna } from './components/Abhinna';
import { Maranasanna } from './components/Maranasanna';
import { Punabbhava } from './components/Punabbhava';
import { Foundation } from './components/Foundation';
import { SuvisiPratyaya } from './components/SuvisiPratyaya';
import { Arpana } from './components/Arpana';
import { Paticcasamuppada } from './components/Paticcasamuppada';
import { MasterDashboard } from './components/MasterDashboard';
import { ExplanationModal } from './components/ExplanationModal';
import { MobileNav } from './components/MobileNav'; 
import { KASINA_DATA, VITHI_AVG_KSHANAS, REAL_KSHANAS_PER_SEC, vithiKasinaSequence, DHYANA_STAGES, TABS } from './constants';
import { KASINA_TYPES, type KasinaType, type CittaInstance, VithiStep, type Tab, type Language } from './types';
import { EXPLANATIONS } from './explanations';

const TabButton: React.FC<{ tabId: Tab; currentTab: Tab; onClick: (tabId: Tab) => void; children: React.ReactNode }> = ({ tabId, currentTab, onClick, children }) => (
    <button 
        onClick={() => onClick(tabId)}
        className={`px-4 lg:px-6 py-3 text-base md:text-lg font-medium transition-colors focus:outline-none whitespace-nowrap ${currentTab === tabId ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
        aria-selected={currentTab === tabId}
        role="tab"
    >
        {children}
    </button>
);

const InfoButton: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <button onClick={onClick} className="ml-3 text-xs bg-slate-700 text-red-400 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse" title="What is this?">
        What is this?
    </button>
);

const App: React.FC = () => {
    const [selectedKasina, setSelectedKasina] = useState<KasinaType>(KASINA_TYPES[0]);
    
    // Speed and simulation parameters
    const [kshanasPerSec, setKshanasPerSec] = useState<number>(75.0); 
    const [realKshanasPerSec, setRealKshanasPerSec] = useState(REAL_KSHANAS_PER_SEC);
    const [vithiAvgKshanas, setVithiAvgKshanas] = useState(VITHI_AVG_KSHANAS);
    const [tickInterval, setTickInterval] = useState(100); // ms per tick

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [cittaHistory, setCittaHistory] = useState<CittaInstance[]>([]);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isSpeedCustomizerOpen, setIsSpeedCustomizerOpen] = useState(false);
    const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
    const [isCittaLogOpen, setIsCittaLogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('foundation');
    
    // Fullscreen State
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    // UI Visibility State
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const [isFooterClosed, setIsFooterClosed] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isNavButtonVisible, setIsNavButtonVisible] = useState(true);
    const lastScrollY = useRef(0);

    const timelineRef = useRef<HTMLDivElement>(null);
    const cittaLogRef = useRef<HTMLDivElement>(null);
    const totalDuration = 45 * 60 * 1000; // 45 minutes in ms

     // Effect for detecting mobile/desktop view
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            if (mobile !== isMobileView) {
                 setIsMobileView(mobile);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileView]);

    // Effect for mobile nav button scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            if (!isMobileView) return; // Only run on mobile

            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsNavButtonVisible(false); // Scrolling Down
            } else {
                setIsNavButtonVisible(true); // Scrolling Up
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileView]);
    
    useEffect(() => {
        if (isMobileView && isFooterClosed) {
            setIsNavButtonVisible(true);
        }
    }, [isFooterClosed, isMobileView]);

    const getCurrentJhanaForTime = (time: number): string => {
        const currentMinutes = (time / totalDuration) * 45;
        if (currentMinutes < 15) return 'jhana1';
        if (currentMinutes < 25) return 'jhana2';
        if (currentMinutes < 35) return 'jhana3';
        if (currentMinutes < 45) return 'jhana4';
        return 'jhana5';
    };

    const handleKasinaChange = (kasina: KasinaType) => {
        setSelectedKasina(kasina);
        handleReset();
    };

    const handleSpeedChange = (newSpeed: number) => {
        setKshanasPerSec(newSpeed);
    };

    const handlePlayPause = useCallback(() => {
        setIsPlaying(prev => {
            if (!prev && activeTab === 'visualization') {
                setTimeout(() => {
                    timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1000);
                setTimeout(() => {
                    setIsCittaLogOpen(true);
                    setTimeout(() => {
                        cittaLogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }, 5000);
            }
            return !prev;
        });
    }, [activeTab]);
    
    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setCittaHistory([]);
        setIsCittaLogOpen(false);
    }, []);

    const handleTimeChange = (newTime: number) => {
        if (isPlaying) {
            setIsPlaying(false);
        }
        setCurrentTime(newTime);
    };

    const handleSaveSpeedSettings = (settings: { 
        kshanasPerSec: number; 
        realKshanasPerSec: number; 
        vithiAvgKshanas: number; 
        tickInterval: number; 
    }) => {
        setKshanasPerSec(settings.kshanasPerSec);
        setRealKshanasPerSec(settings.realKshanasPerSec);
        setVithiAvgKshanas(settings.vithiAvgKshanas);
        setTickInterval(settings.tickInterval);
        setIsSpeedCustomizerOpen(false);
    };

    const handleCittaSpawn = useCallback((instance: CittaInstance) => {
        setCittaHistory(prev => [instance, ...prev.slice(0, 199)]);
    }, []);

    useEffect(() => {
        if (!isPlaying || activeTab !== 'visualization') {
            return;
        }

        const intervalId = setInterval(() => {
            setCurrentTime(prevTime => {
                const simulationSpeedMultiplier = kshanasPerSec / vithiAvgKshanas;
                const meditationTimePassedMs = tickInterval * simulationSpeedMultiplier;

                const newTime = prevTime + meditationTimePassedMs;
                if (newTime >= totalDuration) {
                    setIsPlaying(false);
                    return totalDuration;
                }
                return newTime;
            });
        }, tickInterval); 

        return () => clearInterval(intervalId);
    }, [isPlaying, totalDuration, kshanasPerSec, tickInterval, vithiAvgKshanas, activeTab]);
    
    const currentJhanaId = getCurrentJhanaForTime(currentTime);
    const kasinaDetails = KASINA_DATA[selectedKasina];
    const kusalaCittaId = kasinaDetails.vithi[4].cittaId; 
    const activeVithi = vithiKasinaSequence(kusalaCittaId, currentJhanaId);
    const [language] = useState<Language>('en'); 

    return (
        <div className={`min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col ${isFullscreen ? 'overflow-hidden' : ''}`}>
            {!isFullscreen && <Header />}
            <main className={`flex-grow flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 overflow-auto' : 'container mx-auto p-4 md:p-6 lg:p-8'}`}>
                
                {/* Fullscreen Toggle Button - Hidden when Master Dashboard is active */}
                {activeTab !== 'masterDashboard' && (
                    <button 
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className={`fixed top-4 right-4 z-[60] p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full border border-slate-600 shadow-xl transition-all ${isFullscreen ? 'opacity-100' : 'opacity-40 hover:opacity-100 md:top-24 md:right-8'}`}
                        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullscreen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                        )}
                    </button>
                )}

                {/* Desktop Tab Navigation */}
                {!isFullscreen && (
                    <div className="hidden md:flex flex-wrap justify-center md:justify-start border-b border-slate-700 mb-8" role="tablist" aria-label="Main navigation">
                        {TABS.map(tab => (
                            <TabButton key={tab.id} tabId={tab.id} currentTab={activeTab} onClick={setActiveTab}>
                                {tab.label[language] || tab.label['en']}
                            </TabButton>
                        ))}
                    </div>
                )}

                 {/* Mobile Welcome Message */}
                {!isFullscreen && (
                    <div className="md:hidden text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-300">Welcome</h2>
                        <p className="text-slate-400">Select a section from the menu below</p>
                    </div>
                )}
                
                <div className={`flex flex-col gap-8 ${isFullscreen ? 'p-4 md:p-8' : ''}`}>
                    {activeTab === 'foundation' && (
                        <Foundation setActiveTab={setActiveTab} />
                    )}

                    {activeTab === 'visualization' && (
                        <>
                            <ControlPanel 
                                selectedKasina={selectedKasina}
                                onKasinaChange={handleKasinaChange}
                                speed={kshanasPerSec}
                                onSpeedChange={handleSpeedChange}
                                isPlaying={isPlaying}
                                onPlayPause={handlePlayPause}
                                onReset={handleReset}
                                onOpenSpeedCustomizer={() => setIsSpeedCustomizerOpen(true)}
                                realKshanasPerSec={realKshanasPerSec}
                            />
                            <div ref={timelineRef} className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl border border-slate-700 flex-grow flex flex-col gap-6 scroll-mt-24">
                                <div className="flex items-center">
                                    <h2 className="text-2xl font-bold text-cyan-400">Citta Vīthi Visualization (චිත්ත වීථි දෘශ්‍යකරණය)</h2>
                                    <InfoButton onClick={() => setIsExplanationModalOpen(true)} />
                                </div>
                                <p className="text-slate-400 -mt-4 mb-2 text-sm">
                                    This is an attempt to understand how Citta Vīthis operate with meditation objects.<br/>
                                    (මෙය භාවනා අරමුණු ඔස්සේ චිත්ත වීථි ක්‍රියාත්මක වන ආකාරය තේරුම් ගැනීමට දරන උත්සාහයකි.)
                                </p>
                                <Timeline 
                                  isPlaying={isPlaying}
                                  vithi={activeVithi}
                                  speed={kshanasPerSec}
                                  onCittaSpawn={handleCittaSpawn}
                                  key={`${selectedKasina}-${currentJhanaId}`}
                                  allowDistractions={true}
                                />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl border border-slate-700">
                                     <h2 className="text-2xl font-bold text-purple-400 mb-4">Dhyāna Progression (ධ්‍යාන ප්‍රගතිය)</h2>
                                    <DhyanaGraph currentTime={currentTime} totalDuration={totalDuration} />
                                    <TimeScrubber
                                        currentTime={currentTime}
                                        totalDuration={totalDuration}
                                        onTimeChange={handleTimeChange}
                                    />
                                </div>
                                <DhyanaFactors currentTime={currentTime} totalDuration={totalDuration} />
                            </div>
                            <MeditationLog 
                                currentTime={currentTime}
                                totalDuration={totalDuration}
                                selectedKasina={selectedKasina}
                            />
                            <div ref={cittaLogRef} className="scroll-mt-4">
                                <CittaLog 
                                    cittaHistory={cittaHistory}
                                    isOpen={isCittaLogOpen}
                                    setIsOpen={setIsCittaLogOpen}
                                />
                            </div>
                        </>
                    )}

                    {activeTab === 'masterDashboard' && (
                        <MasterDashboard 
                            language={language} 
                            isFullscreen={false} 
                        />
                    )}

                    {activeTab === 'arpana' && (
                        <Arpana />
                    )}

                    {activeTab === 'panchaskandha' && (
                        <Panchaskandha />
                    )}

                    {activeTab === 'paticcasamuppada' && (
                        <Paticcasamuppada />
                    )}

                    {activeTab === 'suvisiPratyaya' && (
                        <SuvisiPratyaya />
                    )}

                    {activeTab === 'dream' && (
                        <Dream />
                    )}

                    {activeTab === 'abhinna' && (
                        <Abhinna />
                    )}

                    {activeTab === 'maranasanna' && (
                        <Maranasanna />
                    )}

                    {activeTab === 'punabbhava' && (
                        <Punabbhava />
                    )}
                </div>
            </main>

             <SpeedCustomizer
                isOpen={isSpeedCustomizerOpen}
                onClose={() => setIsSpeedCustomizerOpen(false)}
                onSave={handleSaveSpeedSettings}
                currentSettings={{
                    kshanasPerSec,
                    realKshanasPerSec,
                    vithiAvgKshanas,
                    tickInterval
                }}
            />
            <ExplanationModal
                isOpen={isExplanationModalOpen}
                onClose={() => setIsExplanationModalOpen(false)}
                content={EXPLANATIONS.cittaVithi}
            />

            {/* Mobile Navigation */}
             {!isFullscreen && (
                <button
                    onClick={() => setIsMobileNavOpen(true)}
                    className={`md:hidden fixed bottom-6 right-6 z-40 w-16 h-16 bg-cyan-600 text-white rounded-full shadow-lg flex items-center justify-center
                            transform transition-transform duration-300 ease-in-out hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900
                            ${isNavButtonVisible ? 'translate-y-0' : 'translate-y-24'}`}
                    aria-label="Open navigation menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
             )}
            <MobileNav 
                isOpen={isMobileNavOpen}
                onClose={() => setIsMobileNavOpen(false)}
                tabs={TABS}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {!isFooterClosed && !isFullscreen && (
                 <footer className="relative bg-slate-900 border-t border-slate-700 p-4 text-center text-slate-500 text-sm">
                    <div className="container mx-auto flex flex-col justify-center items-center gap-2 relative">
                        <button 
                            onClick={() => setIsFooterClosed(true)} 
                            className="absolute top-0 right-0 -mt-2 -mr-2 text-slate-500 hover:text-white transition-colors"
                            aria-label="Close footer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 1 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 1 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                        <div className="flex justify-center items-center gap-x-4 md:gap-x-6 gap-y-2 flex-wrap">
                            <span className="font-semibold text-slate-400 hidden md:inline">References:</span>
                            <a href="https://pitaka.lk/books/abhidharma-margaya/index.html" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Abhidharma Mārgaya</a>
                            <a href="https://pitaka.lk/books/abhidharmaye-mulika-karunu/index.html" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Fundamental Principles of Abhidhamma</a>
                            <span className="hidden md:inline text-slate-600">|</span>
                            <a href="https://www.ishanoshada.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">By Ishan Oshada</a>
                            <a href="https://github.com/ishanoshada/abhidharma-margaya-visualizer" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub Repo</a>
                        </div>
                         <p className="text-xs text-slate-600 max-w-3xl px-4">
                            This presents data as seen through the wisdom of the Gautama Buddha and structured by the Buddha. Errors may exist in the presentation. Please refer to the original Tipiṭaka sources if necessary.
                        </p>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default App;
