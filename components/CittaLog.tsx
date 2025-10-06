
import React from 'react';
import type { CittaInstance } from '../types';
import { CETASIKAS } from '../constants';

interface CittaLogProps {
    cittaHistory: CittaInstance[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

const CittaRow: React.FC<{ instance: CittaInstance }> = ({ instance }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const { citta, label } = instance;
    const cetasikaList = citta.cetasikas.map(id => CETASIKAS[id]).filter(Boolean);

    return (
        <>
            <tr onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer hover:bg-slate-700/50 border-b border-slate-700">
                <td className="p-3">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${citta.type}`}></div>
                        <span className="font-medium">{citta.pali}</span>
                    </div>
                </td>
                <td className="p-3 text-slate-400">{label}</td>
                <td className="p-3 text-slate-400">{citta.type}</td>
                <td className="p-3">
                     <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${citta.vedana}`}></div>
                        <span className="text-slate-400">{citta.vedana}</span>
                    </div>
                </td>
                <td className="p-3 text-slate-400">{cetasikaList.length}</td>
                <td className="p-3 text-right">
                    <div className={`transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown />
                    </div>
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-slate-800">
                    <td colSpan={6} className="p-4">
                        <h4 className="font-semibold text-slate-300 mb-2">Associated Cetasikas:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 text-sm">
                            {cetasikaList.map(c => (
                                <div key={c.id} className="flex items-center gap-2">
                                   <span className="text-cyan-400 w-28">{c.pali}</span>
                                   <span className="text-slate-400">{c.name}</span>
                                </div>
                            ))}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};


export const CittaLog: React.FC<CittaLogProps> = ({ cittaHistory, isOpen, setIsOpen }) => {
    return (
        <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left">
                <h2 className="text-xl font-bold text-slate-300">Citta Log (චිත්ත සටහන)</h2>
                <div className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                </div>
            </button>
            {isOpen && (
                 <div className="overflow-x-auto p-4 pt-0">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
                            <tr>
                                <th className="p-3">Citta</th>
                                <th className="p-3">Label</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Feeling</th>
                                <th className="p-3">Cetasikas</th>
                                <th className="p-3 w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cittaHistory.map(instance => (
                                <CittaRow key={instance.id} instance={instance} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
