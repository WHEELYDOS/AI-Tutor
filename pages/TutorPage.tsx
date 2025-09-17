// Fix: Add type definitions for the browser's SpeechRecognition API to resolve TypeScript errors.
interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onstart: () => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: { new(): SpeechRecognition };
    webkitSpeechRecognition: { new(): SpeechRecognition };
  }
}


import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, Content } from "@google/genai";
import type { ChatMessage } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import ChatHistorySidebar from '../components/ChatHistorySidebar';

const INITIAL_MESSAGE: ChatMessage = { role: 'model', text: 'Hello! I am your personal AI Tutor. What subject would you like to explore today?' };

// Helper to create a new chat instance with context from a previous session
const createNewChatInstance = (ai: GoogleGenAI, history: ChatMessage[] = []): Chat => {
    // Transform app's message format to the SDK's format.
    // Exclude the initial "Hello!" message from the model, as it's a UI prompt
    // and not part of the actual conversation history for the AI.
    const chatHistory: Content[] = history.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    return ai.chats.create({
        model: 'gemini-2.5-flash',
        history: chatHistory,
        config: {
            systemInstruction: "You are a friendly and encouraging AI tutor. Your goal is to explain complex topics in a simple and easy-to-understand way. Use analogies, examples, and break down information into small chunks. After explaining a concept, ask a follow-up question to check for understanding. Format your responses using simple markdown like **bold** for emphasis, bullet points (* item) for lists, and code blocks (```) for code snippets.",
        },
    });
};

const TutorPage: React.FC = () => {
    const [history, setHistory] = useState<ChatMessage[][]>([]);
    const [currentChat, setCurrentChat] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
    const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
    
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeechApiSupported, setIsSpeechApiSupported] = useState(false);
    
    const aiRef = useRef<GoogleGenAI | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        try {
            aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatRef.current = createNewChatInstance(aiRef.current);
        } catch (e) {
            console.error(e);
            setError("Failed to initialize the AI Tutor. Please check the console for details.");
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechApiSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[event.results.length - 1][0].transcript.trim();
                setInput(transcript);
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error("Speech recognition error", event.error);
                setError(`Mic Error: ${event.error}. Please ensure microphone permission is granted.`);
                setIsRecording(false);
            };
            
            recognition.onstart = () => {
                setIsRecording(true);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognitionRef.current = recognition;
        } else {
            setIsSpeechApiSupported(false);
            console.log("Speech recognition not supported by this browser.");
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [currentChat]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const chatBeforeUserMessage = [...currentChat];
        const userMessage: ChatMessage = { role: 'user', text: input };
        const chatWithUserMsg = [...chatBeforeUserMessage, userMessage];
        
        // Optimistically update UI with user's message and a placeholder for the model's response
        setCurrentChat([...chatWithUserMsg, { role: 'model', text: '' }]);
        setInput('');
        setIsLoading(true);
        setError(null);
        
        try {
            const stream = await chatRef.current.sendMessageStream({ message: input });
            
            let modelResponseText = '';
            for await (const chunk of stream) {
                modelResponseText += chunk.text;
                // Update the model's placeholder in real-time as the stream comes in
                setCurrentChat([...chatWithUserMsg, { role: 'model', text: modelResponseText }]);
            }

            // FIX: Explicitly type `finalChat` to prevent TypeScript from widening the `role`
            // property to `string`, which caused assignment errors with `ChatMessage[]`.
            const finalChat: ChatMessage[] = [...chatWithUserMsg, { role: 'model', text: modelResponseText }];

            // Update the main history state
            if (activeChatIndex === null) {
                // This is a new chat, add it to history
                setHistory(prevHistory => {
                    const newHistory = [...prevHistory, finalChat];
                    setActiveChatIndex(newHistory.length - 1); // Set the new chat as active
                    return newHistory;
                });
            } else {
                // This is an existing chat, update it
                setHistory(prevHistory => {
                    const newHistory = [...prevHistory];
                    newHistory[activeChatIndex] = finalChat;
                    return newHistory;
                });
            }

        } catch (err) {
            console.error(err);
            setError("Sorry, I encountered an error. Please try again.");
            // Roll back the optimistic UI update on failure
            setCurrentChat(chatBeforeUserMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleNewChat = () => {
        if (isLoading) return;
        setActiveChatIndex(null);
        setCurrentChat([INITIAL_MESSAGE]);
        if (aiRef.current) {
            chatRef.current = createNewChatInstance(aiRef.current);
        }
    };

    const handleSelectChat = (index: number) => {
        if (isLoading) return;
        setActiveChatIndex(index);
        const selectedChat = history[index];
        setCurrentChat(selectedChat);
        if (aiRef.current) {
            // Re-create the chat instance with the history of the selected conversation
            chatRef.current = createNewChatInstance(aiRef.current, selectedChat);
        }
    };

    const handleMicClick = () => {
        if (!recognitionRef.current || isLoading) return;
        
        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            setInput('');
            setError(null);
            recognitionRef.current.start();
        }
    };

    // A more elegant markdown-to-HTML converter
    const renderText = (text: string) => {
        const blocks = text.split(/\n\s*\n/);
    
        const formatInline = (str: string) => str
            .replace(/</g, '&lt;').replace(/>/g, '&gt;') // Basic XSS protection
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>');
    
        const html = blocks.map(block => {
            if (!block.trim()) return '';
    
            // Code blocks
            if (block.startsWith('```')) {
                const codeContent = block.replace(/^```.*\n|```$/g, '').trim();
                const escapedCode = codeContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return `<pre><code>${escapedCode}</code></pre>`;
            }
    
            // Tables
            const lines = block.trim().split('\n');
            if (lines.length >= 2 && lines[1].match(/^\|?[-|:\s]+$/)) {
                const parseRow = (rowString: string): string[] => 
                    rowString.replace(/^\||\|$/g, '').split('|').map(s => s.trim());
                
                const headerCells = parseRow(lines[0]);
                const bodyRows = lines.slice(2);

                const thead = `<thead><tr>${headerCells.map(cell => `<th>${formatInline(cell)}</th>`).join('')}</tr></thead>`;
                
                let tbody = '';
                if (bodyRows.length > 0) {
                    tbody = `<tbody>${bodyRows.map(row => {
                        const bodyCells = parseRow(row);
                        return `<tr>${headerCells.map((_, i) => `<td>${formatInline(bodyCells[i] || '')}</td>`).join('')}</tr>`;
                    }).join('')}</tbody>`;
                }
    
                return `<table>${thead}${tbody}</table>`;
            }

            // Blockquotes
            if (block.startsWith('> ')) {
                const quoteContent = block.split('\n').map(line => line.replace(/^>\s?/, '')).join('<br />');
                return `<blockquote>${formatInline(quoteContent)}</blockquote>`;
            }

            // Headings
            if (block.startsWith('# ')) return `<h3>${formatInline(block.substring(2))}</h3>`;
            if (block.startsWith('## ')) return `<h4>${formatInline(block.substring(3))}</h4>`;
            
            // Unordered lists
            if (block.trim().startsWith('* ')) {
                const items = block.split('\n').map(line => `<li>${formatInline(line.trim().substring(2))}</li>`).join('');
                return `<ul>${items}</ul>`;
            }
    
            // Ordered lists
            if (/^\d+\.\s/.test(block.trim())) {
                const items = block.split('\n').map(line => `<li>${formatInline(line.trim().replace(/^\d+\.\s/, ''))}</li>`).join('');
                return `<ol>${items}</ol>`;
            }
            
            // Paragraphs
            return `<p>${formatInline(block).replace(/\n/g, '<br />')}</p>`;
    
        }).join('');
        
        return <div className="prose-like" dangerouslySetInnerHTML={{ __html: html }} />;
    };


    return (
        <div className="container mx-auto max-w-5xl h-[calc(100vh-100px)] p-4 animate-fade-in">
            <div className="bg-white/80 rounded-xl shadow-2xl flex h-full">
                <div className="w-1/4 min-w-[200px]">
                    <ChatHistorySidebar
                        history={history}
                        onNewChat={handleNewChat}
                        onSelectChat={handleSelectChat}
                        activeChatIndex={activeChatIndex}
                    />
                </div>

                <div className="flex-grow flex flex-col h-full">
                    <div className="flex-grow p-6 overflow-y-auto space-y-4">
                        {currentChat.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-lg px-4 py-3 ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-model'}`}>
                                    {renderText(msg.text)}
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
                                placeholder={isRecording ? "Listening..." : "Ask me anything about..."}
                                disabled={isLoading}
                                className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150 disabled:opacity-50"
                            />
                             <button
                                type="button"
                                onClick={handleMicClick}
                                disabled={isLoading || !isSpeechApiSupported}
                                className={`flex-shrink-0 p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#26667F] disabled:bg-[#67C090] disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isRecording
                                        ? 'bg-red-500 text-white animate-pulse'
                                        : 'bg-[#DDF4E7] text-[#26667F] hover:bg-[#c6ebd9]'
                                }`}
                                aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
                                title={isSpeechApiSupported ? (isRecording ? 'Stop recording' : 'Start voice input') : 'Voice input not supported by your browser'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                                    <path d="M17 11h-1c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92z"/>
                                </svg>
                            </button>
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
        </div>
    );
};

export default TutorPage;