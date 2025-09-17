import React, { useState } from 'react';
import type { Page } from '../App';

interface LoginPageProps {
    onNavigate: (page: Page) => void;
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic
        console.log('Logging in with:', { email, password });
        onLogin();
    };

    return (
        <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="bg-white/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-[#67C090]/60">
                    <h2 className="text-3xl font-bold text-center text-[#124170] mb-6">Welcome Back!</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#124170]/70 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150"
                                required
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#124170]/70 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150"
                                required
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#26667F] text-white font-bold py-3 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#26667F] transition duration-200 ease-in-out"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center text-sm text-[#124170]/70 mt-6">
                        Don't have an account?{' '}
                        <button onClick={() => onNavigate('signup')} className="font-medium text-[#26667F] hover:underline focus:outline-none focus:ring-2 focus:ring-[#26667F] rounded">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
