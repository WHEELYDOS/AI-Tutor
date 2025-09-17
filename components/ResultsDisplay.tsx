import React, { useState } from 'react';
import type { CareerRecommendationResponse, CareerRecommendation, RoadmapStep } from '../types';

const ResultsDisplay: React.FC<{ data: CareerRecommendationResponse }> = ({ data }) => {
    return (
        <div className="w-full animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-[#26667F]">Your AI-Powered Career Roadmap</h2>
            <p className="text-[#124170]/70 mb-6">Here are the top career paths recommended for you based on your profile.</p>
            <div className="space-y-6">
                {data.recommendations.map((rec, index) => (
                    <CareerCard key={index} recommendation={rec} />
                ))}
            </div>
        </div>
    );
};

const CareerCard: React.FC<{ recommendation: CareerRecommendation }> = ({ recommendation }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-5 flex justify-between items-center hover:bg-[#67C090]/10 focus:outline-none"
            >
                <div>
                    <h3 className="text-xl font-bold text-[#124170]">{recommendation.careerPath}</h3>
                    <p className="text-sm text-[#26667F]">{recommendation.salaryProspects.range}</p>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            {isOpen && (
                 <div className="p-5 border-t border-[#67C090]/30 animate-fade-in-down space-y-6">
                    <p className="text-[#124170]/80">{recommendation.reasoning}</p>
                    
                    <Section title="Skill Gap Analysis">
                        <ul className="list-disc list-inside space-y-2 text-[#124170]/80">
                            {recommendation.skillGapAnalysis.map((gap, i) => (
                                <li key={i}><strong>{gap.skill}:</strong> {gap.reason}</li>
                            ))}
                        </ul>
                    </Section>
                    
                    <Section title="Learning Roadmap">
                        <div className="relative border-l-2 border-[#26667F] pl-6 space-y-8">
                            {recommendation.learningRoadmap.map((step, i) => <RoadmapItem key={i} step={step} />)}
                        </div>
                    </Section>

                    {recommendation.resumeSuggestions && recommendation.resumeSuggestions.length > 0 && (
                        <Section title="Resume Feedback">
                            <ul className="list-disc list-inside space-y-2 text-[#124170]/80">
                                {recommendation.resumeSuggestions.map((suggestion, i) => (
                                    <li key={i}>{suggestion}</li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    <Section title="Key Certifications">
                         <div className="flex flex-wrap gap-2">
                             {recommendation.certifications.map((cert, i) => (
                                <span key={i} className="bg-[#26667F]/20 text-[#26667F] text-xs font-semibold px-2.5 py-1 rounded-full">{cert}</span>
                            ))}
                        </div>
                    </Section>
                    
                    <Section title="Advice for the Indian Market">
                        <p className="text-[#124170]/80 italic">"{recommendation.marketAdvice}"</p>
                    </Section>
                 </div>
            )}
        </div>
    );
};

const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div>
        <h4 className="text-lg font-semibold text-[#26667F] mb-3">{title}</h4>
        {children}
    </div>
);

const RoadmapItem: React.FC<{step: RoadmapStep}> = ({ step }) => (
    <div className="relative">
        <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-[#26667F] ring-4 ring-white"></div>
        <p className="font-semibold text-[#124170]">{step.milestone} <span className="text-sm font-normal text-[#124170]/70 ml-2">({step.duration})</span></p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-[#124170]/70">
            {step.details.map((detail, i) => <li key={i}>{detail}</li>)}
        </ul>
    </div>
);

export default ResultsDisplay;