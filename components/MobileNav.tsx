
import React, { useEffect, useState } from 'react';
import type { Tab, Language } from '../types';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    tabs: { id: Tab; label: Record<Language, string> }[];
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, tabs, activeTab, setActiveTab }) => {
    
    // A simple way to get language, ideally from context
    const [language] = useState<Language>('en');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    
    if (!isOpen) {
        return null;
    }

    const handleSelectTab = (tabId: Tab) => {
        setActiveTab(tabId);
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-slate-900/95 z-50 flex flex-col p-6 animate-citta-arise"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-cyan-400">Sections</h2>
                 <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-white"
                    aria-label="Close navigation menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <nav className="flex-grow overflow-y-auto">
                <ul className="space-y-2">
                    {tabs.map(tab => (
                        <li key={tab.id}>
                            <button
                                onClick={() => handleSelectTab(tab.id)}
                                className={`w-full text-left text-xl font-semibold p-4 rounded-lg transition-colors
                                    ${activeTab === tab.id 
                                        ? 'bg-cyan-500/20 text-cyan-300' 
                                        : 'text-slate-300 hover:bg-slate-800'}`
                                }
                                aria-current={activeTab === tab.id}
                            >
                                {tab.label[language] || tab.label['en']}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
