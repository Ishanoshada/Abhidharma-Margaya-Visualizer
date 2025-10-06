import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const graphData = [
    { time: 0, level: 0, label: "Start" },
    { time: 5, level: 0.5, label: "Access Concentration" },
    { time: 10, level: 1, label: "First Dhyāna" },
    { time: 15, level: 2, label: "Second Dhyāna" },
    { time: 25, level: 3, label: "Third Dhyāna" },
    { time: 35, level: 4, label: "Fourth Dhyāna" },
    { time: 45, level: 5, label: "Fifth Dhyāna" },
];

interface DhyanaGraphProps {
    currentTime: number;
    totalDuration: number;
}

export const DhyanaGraph: React.FC<DhyanaGraphProps> = ({ currentTime, totalDuration }) => {
    const currentProgress = (currentTime / totalDuration) * 45; // in minutes

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={graphData}
                    margin={{
                        top: 5, right: 30, left: 0, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis 
                        dataKey="time" 
                        type="number" 
                        domain={[0, 45]}
                        label={{ value: 'Time (minutes)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                        tick={{ fill: '#94a3b8' }}
                        stroke="#64748b"
                    />
                    <YAxis 
                        label={{ value: 'Dhyāna Level', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                        domain={[0, 5]}
                        tick={{ fill: '#94a3b8' }}
                        stroke="#64748b"
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                            borderColor: '#475569',
                            color: '#e2e8f0' 
                        }} 
                    />
                    <Line 
                        type="monotone" 
                        dataKey="level" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#a78bfa' }}
                        activeDot={{ r: 8, fill: '#c4b5fd' }}
                    />
                    <ReferenceLine 
                        x={currentProgress} 
                        stroke="#34d399" 
                        strokeWidth={2} 
                        label={{ value: "Current", position: "top", fill: "#34d399" }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};