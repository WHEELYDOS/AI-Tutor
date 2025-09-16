import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdvisorPage from './pages/AdvisorPage';
import TutorPage from './pages/TutorPage';
import RoadmapPage from './pages/RoadmapPage';

const App: React.FC = () => {
    const [page, setPage] = useState<'home' | 'advisor' | 'tutor' | 'roadmap'>('home');

    const navigate = (p: 'home' | 'advisor' | 'tutor' | 'roadmap') => setPage(p);

    const renderPage = () => {
        switch (page) {
            case 'advisor':
                return <AdvisorPage />;
            case 'tutor':
                return <TutorPage />;
            case 'roadmap':
                return <RoadmapPage />;
            case 'home':
            default:
                return <HomePage onNavigate={navigate} />;
        }
    }

    return (
        <div className="min-h-screen font-sans">
            <Header onNavigate={navigate} />
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

export default App;