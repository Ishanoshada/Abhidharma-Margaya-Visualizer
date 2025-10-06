import React from 'react';

interface StoryDisplayProps {
    text: string;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ text }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-inner border border-slate-700 min-h-[100px] flex items-center justify-center">
            <p className="text-slate-300 italic text-lg text-center animate-citta-arise" key={text}>
                "{text}"
            </p>
        </div>
    );
};