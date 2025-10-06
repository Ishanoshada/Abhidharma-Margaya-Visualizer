import React, { useState, useEffect } from 'react';

interface SpeedCustomizerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (settings: {
        kshanasPerSec: number;
        realKshanasPerSec: number;
        vithiAvgKshanas: number;
        tickInterval: number;
    }) => void;
    currentSettings: {
        kshanasPerSec: number;
        realKshanasPerSec: number;
        vithiAvgKshanas: number;
        tickInterval: number;
    };
}

const FormRow: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-center border-b border-slate-700 py-4">
        <div>
            <label className="font-semibold text-slate-300">{label}</label>
            <p className="text-sm text-slate-400">{description}</p>
        </div>
        {children}
    </div>
);


export const SpeedCustomizer: React.FC<SpeedCustomizerProps> = ({ isOpen, onClose, onSave, currentSettings }) => {
    const [settings, setSettings] = useState(currentSettings);

    useEffect(() => {
        if (isOpen) {
            setSettings(currentSettings);
        }
    }, [isOpen, currentSettings]);

    if (!isOpen) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: Number(value) }));
    };

    const handleSave = () => {
        onSave(settings);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-700">
                    <h3 className="text-2xl font-bold text-purple-400">Customize Simulation Speed</h3>
                    <p className="text-slate-400 mt-1">Adjust the core timing parameters of the visualization.</p>
                </div>
                <div className="p-6 flex-grow overflow-y-auto">
                    <form>
                        <FormRow label="Simulation Speed" description="How many mind-moments (kshanas) are animated per second of real time.">
                             <input
                                type="number"
                                name="kshanasPerSec"
                                value={settings.kshanasPerSec}
                                onChange={handleChange}
                                className="w-full bg-slate-900 text-slate-300 font-mono text-sm p-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </FormRow>
                        <FormRow label='"Real" Kshanas/sec' description="The baseline speed of consciousness for the slowdown calculation (in trillions).">
                             <input
                                type="number"
                                name="realKshanasPerSec"
                                value={settings.realKshanasPerSec}
                                onChange={handleChange}
                                className="w-full bg-slate-900 text-slate-300 font-mono text-sm p-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </FormRow>
                         <FormRow label="Avg. Vīthi Duration" description="The average number of kshanas per vīthi, used for the Dhyāna graph progression.">
                             <input
                                type="number"
                                name="vithiAvgKshanas"
                                value={settings.vithiAvgKshanas}
                                onChange={handleChange}
                                className="w-full bg-slate-900 text-slate-300 font-mono text-sm p-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </FormRow>
                        <FormRow label="Tick Interval (ms)" description="Advanced: The update frequency of the simulation engine (lower is smoother but more demanding).">
                             <input
                                type="number"
                                name="tickInterval"
                                value={settings.tickInterval}
                                onChange={handleChange}
                                className="w-full bg-slate-900 text-slate-300 font-mono text-sm p-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </FormRow>
                    </form>
                </div>
                <div className="p-4 bg-slate-800/50 border-t border-slate-700 flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors">
                        Save and Apply
                    </button>
                </div>
            </div>
        </div>
    );
};
