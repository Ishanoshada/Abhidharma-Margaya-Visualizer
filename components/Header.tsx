import React from 'react';

export const Header: React.FC = () => (
    <header className="bg-slate-900 border-b border-slate-700 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                The Path of Abhidhamma
            </h1>
            <p className="text-slate-400 mt-1">Visualizing the Path of Consciousness</p>
        </div>
    </header>
);