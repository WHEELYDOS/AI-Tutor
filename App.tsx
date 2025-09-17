import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdvisorPage from './pages/AdvisorPage';
import TutorPage from './pages/TutorPage';
import RoadmapPage from './pages/RoadmapPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import type { User } from './types';

export type Page = 'home' | 'advisor' | 'tutor' | 'roadmap' | 'login' | 'signup';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for logged-in user in localStorage on initial load
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem('currentUser');
            }
        }
    }, []);

    const navigate = (p: Page) => setPage(p);

    const handleAuthSuccess = (user: User) => {
        const userToStore = { name: user.name, email: user.email };
        setCurrentUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        navigate('home');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
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
                return <LoginPage onNavigate={navigate} onAuthSuccess={handleAuthSuccess} />;
            case 'signup':
                return <SignupPage onNavigate={navigate} onAuthSuccess={handleAuthSuccess} />;
            case 'home':
            default:
                return <HomePage onNavigate={navigate} />;
        }
    }

    return (
        <div className="min-h-screen font-sans">
            <Header onNavigate={navigate} currentUser={currentUser} onLogout={handleLogout} />
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

export default App;