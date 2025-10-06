import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import type { ExplanationContent } from '../explanations';

interface ExplanationModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: ExplanationContent;
}

const LANGUAGES: { id: Language; name: string }[] = [
    { id: 'en', name: 'English' },
    { id: 'si', name: 'සිංහල' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'hi', name: 'हिन्दी' },
];

export const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, onClose, content }) => {
    const [selectedLang, setSelectedLang] = useState<Language>('en');

    useEffect(() => {
        if (!isOpen) {
            // Reset to English when closed for consistent experience
            setTimeout(() => setSelectedLang('en'), 300); 
        }
    }, [isOpen]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-citta-arise" 
            onClick={onClose}
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="explanation-title"
        >
            <div 
                className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-3xl flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <header className="p-6 border-b border-slate-700 flex justify-between items-start">
                    <div>
                        <h2 id="explanation-title" className="text-2xl font-bold text-cyan-400">{content.title[selectedLang]}</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </header>

                <nav className="p-4 border-b border-slate-700">
                    <div className="flex items-center justify-center gap-2 sm:gap-4" role="tablist" aria-label="Language selection">
                        {LANGUAGES.map(lang => (
                             <button
                                key={lang.id}
                                onClick={() => setSelectedLang(lang.id)}
                                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 ${selectedLang === lang.id ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                                role="tab"
                                aria-selected={selectedLang === lang.id}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </nav>

                <main className="p-6 flex-grow overflow-y-auto text-slate-300 leading-relaxed">
                   <div dangerouslySetInnerHTML={{ __html: content.body[selectedLang] }} />
                </main>

                <footer className="p-4 bg-slate-800/50 border-t border-slate-700 flex justify-end">
                    <button onClick={onClose} className="px-5 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-semibold transition-colors">
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};