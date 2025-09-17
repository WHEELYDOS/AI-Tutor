import React from 'react';
import type { ChatMessage } from '../types';

interface ChatHistorySidebarProps {
    history: ChatMessage[][];
    onNewChat: () => void;
    onSelectChat: (index: number) => void;
    activeChatIndex: number | null;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({ history, onNewChat, onSelectChat, activeChatIndex }) => {
    return (
        <div className="bg-white/30 backdrop-blur-sm border-r border-[#67C090]/50 flex flex-col h-full p-2">
            <button
                onClick={onNewChat}
                className="w-full flex items-center justify-center space-x-2 bg-[#26667F] text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#26667F] transition duration-200 mb-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>New Chat</span>
            </button>
            <h2 className="text-sm font-bold text-[#124170] px-2 mb-2 uppercase tracking-wider">History</h2>
            <div className="flex-grow overflow-y-auto pr-1">
                <ul className="space-y-1">
                    {history.map((chat, index) => {
                        const firstUserMessage = chat.find(msg => msg.role === 'user')?.text;
                        const title = firstUserMessage ? (firstUserMessage.length > 25 ? firstUserMessage.substring(0, 25) + '...' : firstUserMessage) : 'Chat';
                        
                        return (
                            <li key={index}>
                                <button
                                    onClick={() => onSelectChat(index)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeChatIndex === index
                                            ? 'bg-[#26667F]/20 text-[#124170] font-semibold'
                                            : 'text-[#124170]/80 hover:bg-[#67C090]/20'
                                    }`}
                                >
                                    {title}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ChatHistorySidebar;