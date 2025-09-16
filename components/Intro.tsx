import React from 'react';

const Intro: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#26667F] mb-4">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M12 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-3xl font-bold text-[#124170] mb-2">Unlock Your Career Potential</h2>
            <p className="text-lg text-[#124170]/70 max-w-2xl">
                Fill out your profile on the left, and our advanced AI will analyze your skills, interests, and goals to generate a personalized career roadmap tailored to the Indian job market.
            </p>
        </div>
    );
};

export default Intro;