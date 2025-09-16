import React from 'react';
import type { Roadmap, RoadmapNode } from '../types';

interface RoadmapDisplayProps {
    roadmap: Roadmap;
}

interface NodeProps {
    node: RoadmapNode;
    isRoot?: boolean;
}

const getNodeColor = (type: RoadmapNode['type']) => {
    switch (type) {
        case 'core':
            return 'bg-yellow-100 border-yellow-400 text-yellow-900';
        case 'tool':
            return 'bg-blue-100 border-blue-400 text-blue-900';
        case 'elective':
            return 'bg-white border-gray-400 text-gray-800';
        default:
            return 'bg-gray-100 border-gray-400 text-gray-800';
    }
};

const Node: React.FC<NodeProps> = ({ node, isRoot = false }) => {
    const hasChildren = node.children && node.children.length > 0;
    const nodeColorClasses = getNodeColor(node.type);

    const NodeContent = (
        <div className={`p-3 rounded-lg border-2 shadow-sm relative ${nodeColorClasses} ${isRoot ? 'inline-block p-4 shadow-md' : ''}`}>
             <div className="flex-grow">
                 <h4 className={`font-bold ${isRoot ? 'text-lg' : ''}`}>{node.title}</h4>
                 <p className="text-sm mt-1">{node.description}</p>
             </div>
        </div>
    );

    return (
        <div>
            {NodeContent}
            {hasChildren && (
                 <ul className={`pl-8 pt-6 relative border-l-2 border-blue-300 mt-4 ${isRoot ? 'ml-6' : ''}`}>
                    {node.children.map((child) => (
                        <li key={child.id} className="relative mb-6 last:mb-0">
                             <span className="absolute -left-[33px] top-6 w-8 h-px bg-blue-300" aria-hidden="true"></span>
                            <Node node={child} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


const RoadmapDisplay: React.FC<RoadmapDisplayProps> = ({ roadmap }) => {
    return (
        <div className="w-full animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-[#26667F]">{roadmap.title}</h2>
            <p className="text-[#124170]/70 mb-8">{roadmap.description}</p>
            <div className="overflow-x-auto pb-4">
                 <Node
                    node={roadmap.root}
                    isRoot
                />
            </div>
        </div>
    );
};

export default RoadmapDisplay;