import React, { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { CITTAS, DISTRACTION_VITHI } from '../constants';
import type { CittaInstance, VithiStep, Language } from '../types';

interface TimelineProps {
    isPlaying: boolean;
    vithi: VithiStep[];
    speed: number; // kshanas (ක්ශන) per second
    onCittaSpawn: (instance: CittaInstance) => void;
    onStoryUpdate?: (story: Record<Language, string>) => void;
    allowDistractions?: boolean;
}

const TIMELINE_LENGTH = 17; // How many boxes to show

const CittaVisual: React.FC<{ instance: CittaInstance | null, isHighlighted: boolean }> = ({ instance, isHighlighted }) => {
    if (!instance) {
        return <div className="w-full h-full"></div>;
    }
    const { citta, label } = instance;
    const typeColor = `bg-${citta.type}`;
    const vedanaColor = `bg-${citta.vedana}`;

    return (
        <div 
            key={instance.id}
            className={`w-full h-full flex flex-col items-center justify-center transition-all duration-200 ${isHighlighted ? 'animate-citta-arise' : ''}`}
        >
            <div className={`relative w-12 h-12 flex items-center justify-center text-xs text-center p-1`}>
                <div className={`absolute inset-0 rounded-full ${typeColor} opacity-50`}></div>
                <div className={`absolute inset-1 rounded-full ${vedanaColor} opacity-70`}></div>
                <div className={`absolute inset-2 rounded-full ${citta.hasPanna ? 'bg-slate-700' : 'bg-slate-800'}`}></div>
                {citta.hasPanna && <div className="absolute inset-2 rounded-full border border-cyan-400 animate-pulse"></div>}

                <div className="relative z-10 flex flex-col">
                    <span className="font-bold text-white text-[9px]">{citta.pali}</span>
                </div>
            </div>
            <span className="text-slate-400 text-[10px] mt-1 truncate w-full px-1 text-center">{label}</span>
        </div>
    );
};

export const Timeline: React.FC<TimelineProps> = ({ isPlaying, vithi, speed, onCittaSpawn, onStoryUpdate, allowDistractions }) => {
    const vithiStepRef = useRef(0);
    const vithiDurationProgRef = useRef(0);
    const lastSpawnTimeRef = useRef(performance.now());
    const animationFrameRef = useRef<number | undefined>(undefined);
    
    const [timelineCittas, setTimelineCittas] = useState<(CittaInstance | null)[]>(Array(TIMELINE_LENGTH).fill(null));
    const [currentVithiType, setCurrentVithiType] = useState<'main' | 'distraction'>('main');

    const currentVithi = useMemo(() => {
        return currentVithiType === 'main' ? vithi : DISTRACTION_VITHI;
    }, [currentVithiType, vithi]);
    
    useEffect(() => {
        vithiStepRef.current = 0;
        vithiDurationProgRef.current = 0;
    }, [currentVithi]);

    const stopAnimation = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = undefined;
        }
    }, []);

    const animate = useCallback((timestamp: number) => {
        const timePerKshana = 1000 / speed;
        const timeSinceLastTick = timestamp - lastSpawnTimeRef.current;
        
        if (timeSinceLastTick >= timePerKshana) {
            const kshanasToSpawn = Math.floor(timeSinceLastTick / timePerKshana);
            let nextTimeline = [...timelineCittas];

            for (let i = 0; i < kshanasToSpawn; i++) {
                 // Check if we need to start a new step
                if (vithiDurationProgRef.current === 0) {
                    const currentStep = currentVithi[vithiStepRef.current];
                    if (onStoryUpdate && currentStep.story) {
                        onStoryUpdate(currentStep.story);
                    }
                }
                
                const currentStep = currentVithi[vithiStepRef.current];
                
                const newCitta: CittaInstance = {
                    id: `${timestamp}-${vithiStepRef.current}-${i}-${Math.random()}`,
                    citta: CITTAS[currentStep.cittaId],
                    startTime: timestamp,
                    duration: 0,
                    label: currentStep.label,
                };
                
                onCittaSpawn(newCitta);
                
                nextTimeline = [...nextTimeline.slice(1), newCitta];

                vithiDurationProgRef.current++;
                if (vithiDurationProgRef.current >= currentStep.duration) {
                    const nextStepIndex = vithiStepRef.current + 1;
                    if (nextStepIndex >= currentVithi.length) {
                        if (allowDistractions && currentVithiType === 'main' && Math.random() < 0.25) {
                            setCurrentVithiType('distraction');
                        } else {
                            setCurrentVithiType('main');
                        }
                        vithiStepRef.current = 0;
                    } else {
                        vithiStepRef.current = nextStepIndex;
                    }
                    vithiDurationProgRef.current = 0;
                }
            }
            
            setTimelineCittas(nextTimeline);
            lastSpawnTimeRef.current += kshanasToSpawn * timePerKshana;
        }

        animationFrameRef.current = requestAnimationFrame(animate);

    }, [speed, currentVithi, onCittaSpawn, currentVithiType, timelineCittas, allowDistractions, onStoryUpdate]);

    useEffect(() => {
        if (isPlaying) {
            lastSpawnTimeRef.current = performance.now();
            animationFrameRef.current = requestAnimationFrame(animate);
        } else {
            stopAnimation();
        }
        return () => stopAnimation();
    }, [isPlaying, animate, stopAnimation]);
    
    return (
        <div className="flex justify-center items-center h-40">
            <div 
                className="w-full grid gap-1 p-2 bg-slate-800/50 rounded-lg border border-slate-700"
                style={{ gridTemplateColumns: `repeat(${TIMELINE_LENGTH}, minmax(0, 1fr))` }}
            >
                {timelineCittas.map((instance, index) => {
                    const isHighlighted = index === TIMELINE_LENGTH - 1;
                    return (
                         <div 
                            key={instance ? `${instance.id}-${index}` : index} 
                            className={`h-28 rounded-md transition-colors duration-300 flex items-center justify-center
                                ${isHighlighted ? 'bg-slate-700/60 ring-2 ring-cyan-500/50' : 'bg-slate-800/30'}`}
                        >
                           <CittaVisual instance={instance} isHighlighted={isHighlighted} />
                         </div>
                    )
                })}
            </div>
        </div>
    );
};