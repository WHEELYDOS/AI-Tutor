import React from 'react';

interface HomePageProps {
    onNavigate: (page: 'advisor' | 'tutor' | 'roadmap') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const FeatureCard: React.FC<{
        title: string;
        description: string;
        buttonText: string;
        onClick: () => void;
        icon: React.ReactNode;
    }> = ({ title, description, buttonText, onClick, icon }) => (
        <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 flex flex-col items-center text-center border border-[#67C090]/60 shadow-xl shadow-[#67C090]/20 transition-transform transform hover:-translate-y-2">
            <div className="text-[#26667F] mb-4">{icon}</div>
            <h2 className="text-2xl font-bold text-[#124170]">{title}</h2>
            <p className="mt-2 text-[#124170]/70 flex-grow">{description}</p>
            <button
                onClick={onClick}
                className="mt-6 rounded-md bg-[#26667F] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#26667F] transition-transform"
            >
                {buttonText}
            </button>
        </div>
    );

    return (
        <div className="relative isolate min-h-[calc(100vh-65px)] flex items-center justify-center overflow-hidden px-4">
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-[#DDF4E7] via-[#DDF4E7] to-[#67C090]/20"
                aria-hidden="true"
            />
            <div className="animate-fade-in py-16 sm:py-24 text-center">
                <div className="mb-6">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#26667F] mx-auto">
                        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                        <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                        <path d="M12 12V22" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                        <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-[#124170] sm:text-6xl">
                    Your Personal AI Hub
                </h1>
                <p className="mt-6 text-lg leading-8 text-[#124170]/80 max-w-2xl mx-auto">
                    Whether you're planning your future career, mastering a new subject, or visualizing a learning path, our AI tools are here to help.
                </p>
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <FeatureCard
                        title="AI Career Advisor"
                        description="Get a personalized career roadmap, skill analysis, and salary insights tailored for the job market."
                        buttonText="Chart Your Career"
                        onClick={() => onNavigate('advisor')}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>}
                    />
                    <FeatureCard
                        title="AI Tutor"
                        description="Master any subject with a conversational AI that can explain complex topics and test your knowledge."
                        buttonText="Start Learning"
                        onClick={() => onNavigate('tutor')}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="m15 5 3 3"/></svg>}
                    />
                    <FeatureCard
                        title="Roadmap Generator"
                        description="Visualize your learning journey. Choose a pre-made path or generate a custom roadmap for any skill."
                        buttonText="Visualize a Path"
                        onClick={() => onNavigate('roadmap')}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8a6 6 0 0 0-6 6h-1a4 4 0 0 0-4-4 4 4 0 0 0-4 4v2"/><path d="M12.5 15a2.5 2.5 0 0 1 5 0v0a2.5 2.5 0 0 1-5 0v0Z"/></svg>}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;