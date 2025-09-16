import React, { useState } from 'react';
import type { Roadmap } from '../types';

interface RoadmapSidebarProps {
    premade: Roadmap[];
    onSelect: (roadmap: Roadmap) => void;
    onGenerate: (topic: string) => void;
    isLoading: boolean;
    activeRoadmapTitle?: string;
}

const RoadmapSidebar: React.FC<RoadmapSidebarProps> = ({ premade, onSelect, onGenerate, isLoading, activeRoadmapTitle }) => {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(topic);
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24 space-y-8">
            <div>
                <h2 className="text-xl font-bold mb-4 text-[#26667F]">Generate a Roadmap</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-[#124170]/70 mb-1">
                            Enter a skill or topic
                        </label>
                        <input
                            type="text"
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Learn Quantum Computing"
                            className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !topic.trim()}
                        className="w-full bg-[#26667F] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#26667F] transition duration-200 ease-in-out disabled:bg-[#67C090] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : 'Generate with AI'}
                    </button>
                </form>
            </div>
            
            <div>
                <h2 className="text-xl font-bold mb-4 text-[#26667F]">Popular Roadmaps</h2>
                <ul className="space-y-2">
                    {premade.map(roadmap => (
                        <li key={roadmap.title}>
                            <button
                                onClick={() => onSelect(roadmap)}
                                disabled={isLoading}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${
                                    activeRoadmapTitle === roadmap.title ? 'bg-[#26667F] text-white' : 'text-[#124170] hover:bg-[#67C090]/20'
                                }`}
                            >
                                {roadmap.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoadmapSidebar;
