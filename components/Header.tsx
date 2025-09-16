import React from 'react';

interface HeaderProps {
    onNavigate: (page: 'home' | 'advisor' | 'tutor' | 'roadmap') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const NavButton: React.FC<{ page: 'advisor' | 'tutor' | 'roadmap', children: React.ReactNode }> = ({ page, children }) => (
        <button
            onClick={() => onNavigate(page)}
            className="text-[#124170]/80 hover:bg-[#67C090]/20 hover:text-[#124170] px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
            {children}
        </button>
    );
    
    return (
        <header className="bg-white/30 backdrop-blur-sm border-b border-[#67C090]/50 sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-8 py-3 flex items-center">
                <div className="flex-1">
                    <button
                        onClick={() => onNavigate('home')}
                        className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-[#26667F] rounded-lg p-1 -m-1 transition-opacity hover:opacity-80"
                        aria-label="Go to homepage"
                    >
                         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#26667F]">
                            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                            <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                        <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#124170]">
                            AI Hub
                        </h1>
                    </button>
                </div>
                <nav className="flex items-center space-x-1 md:space-x-2">
                    <NavButton page="advisor">Career Advisor</NavButton>
                    <NavButton page="tutor">AI Tutor</NavButton>
                    <NavButton page="roadmap">Roadmaps</NavButton>
                </nav>
                <div className="flex-1">
                    {/* Spacer div */}
                </div>
            </div>
        </header>
    );
};

export default Header;