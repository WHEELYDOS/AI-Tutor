import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdvisorPage from './pages/AdvisorPage';
import TutorPage from './pages/TutorPage';
import RoadmapPage from './pages/RoadmapPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

export type Page = 'home' | 'advisor' | 'tutor' | 'roadmap' | 'login' | 'signup';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = (p: Page) => setPage(p);

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('home');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('home');
    };

    const renderPage = () => {
        switch (page) {
            case 'advisor':
                return <AdvisorPage />;
            case 'tutor':
                return <TutorPage />;
            case 'roadmap':
                return <RoadmapPage />;
            case 'login':
                return <LoginPage onNavigate={navigate} onLogin={handleLogin} />;
            case 'signup':
                return <SignupPage onNavigate={navigate} onLogin={handleLogin} />;
            case 'home':
            default:
                return <HomePage onNavigate={navigate} />;
        }
    }

    return (
        <div className="min-h-screen font-sans">
            <Header onNavigate={navigate} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

export default App;
