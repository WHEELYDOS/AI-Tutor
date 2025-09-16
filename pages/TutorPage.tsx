import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';
import ErrorMessage from '../components/ErrorMessage';

const TutorPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: "You are a friendly and encouraging AI tutor. Your goal is to explain complex topics in a simple and easy-to-understand way. Use analogies, examples, and break down information into small chunks. After explaining a concept, ask a follow-up question to check for understanding. Format your responses using simple markdown like **bold** for emphasis and bullet points (* item) for lists.",
                    },
                });
                setMessages([{ role: 'model', text: 'Hello! I am your personal AI Tutor. What subject would you like to explore today?' }]);
            } catch (e) {
                console.error(e);
                setError("Failed to initialize the AI Tutor. Please check the console for details.");
            }
        };
        initChat();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            if (!chatRef.current) {
                throw new Error("Chat not initialized");
            }

            const stream = await chatRef.current.sendMessageStream({ message: input });
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }
        } catch (err) {
            console.error(err);
            setError("Sorry, I encountered an error. Please try again.");
            // Remove the empty model message on error
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };
    
    // A simple markdown-to-HTML converter
    const renderText = (text: string) => {
        const html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>')     // Italics - for bullet points
            .replace(/^\* (.*$)/gm, '<ul class="list-disc list-inside ml-4"><li>$1</li></ul>') // Bullets
            .replace(/\n/g, '<br />');
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };


    return (
        <div className="container mx-auto max-w-3xl p-4 animate-fade-in">
            <div className="bg-white/80 rounded-xl shadow-2xl flex flex-col h-[calc(100vh-120px)]">
                <div className="flex-grow p-6 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-lg px-4 py-2 ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-model'}`}>
                                {renderText(msg.text)}
                                {isLoading && msg.role === 'model' && index === messages.length - 1 && <span className="blinking-cursor" />}
                            </div>
                        </div>
                    ))}
                    {error && <ErrorMessage message={error} />}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t border-[#67C090]">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about..."
                            disabled={isLoading}
                            className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-[#26667F] text-white p-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#26667F] transition duration-200 disabled:bg-[#67C090] disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Send message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TutorPage;