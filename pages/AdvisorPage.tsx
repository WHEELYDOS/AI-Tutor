import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { StudentProfile, CareerRecommendationResponse } from '../types';
import ProfileForm from '../components/ProfileForm';
import ResultsDisplay from '../components/ResultsDisplay';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Intro from '../components/Intro';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getCareerRecommendations = async (profile: StudentProfile): Promise<CareerRecommendationResponse> => {
    const prompt = `
        Analyze this Indian student profile and provide personalized career recommendations.
        The response must be a single, valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.

        Student Profile:
        - Name: ${profile.name}
        - Education: ${profile.educationLevel}
        - Academic Performance: ${profile.grades}
        - Technical Skills: ${profile.techSkills}
        - Interests: ${profile.interests}
        - Location: ${profile.location}
        - Career Goals: ${profile.careerGoals}

        Indian Job Market Context:
        - Focus on emerging sectors: IT, Digital Marketing, Data Science, Renewable Energy, FinTech.
        - Consider regional opportunities and growth hubs (e.g., Bangalore for IT, Mumbai for Finance, Hyderabad for Pharma/IT).
        - Factor in skill demand trends for the next 5 years.

        Provide a detailed analysis for exactly 3 career paths, including:
        1. careerPath: The name of the career path.
        2. reasoning: A detailed explanation of why this path is suitable for the student, referencing their profile and the Indian market context.
        3. skillGapAnalysis: A list of 2-3 crucial skills the student is missing. For each, provide the skill and the reason it's important.
        4. learningRoadmap: A 3-step learning roadmap with a clear duration, milestone, and a few actionable details for each step.
        5. salaryProspects: Expected salary range for a fresher and the growth potential in the Indian market (in INR).
        6. certifications: A list of 2-3 relevant and recognized certifications.
        7. marketAdvice: A concise, actionable piece of advice specific to succeeding in this career in India.
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            recommendations: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        careerPath: { type: Type.STRING, description: "The name of the recommended career path." },
                        reasoning: { type: Type.STRING, description: "Detailed reasoning for the recommendation, linking the student's profile to market demands." },
                        skillGapAnalysis: {
                            type: Type.ARRAY,
                            description: "List of skills the student needs to acquire.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    skill: { type: Type.STRING, description: "The specific skill to learn." },
                                    reason: { type: Type.STRING, description: "Why this skill is important for the career path." },
                                },
                                required: ["skill", "reason"],
                            },
                        },
                        learningRoadmap: {
                            type: Type.ARRAY,
                            description: "A step-by-step plan to acquire the necessary skills.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    duration: { type: Type.STRING, description: "Estimated time for this step (e.g., '0-6 Months')." },
                                    milestone: { type: Type.STRING, description: "The main goal of this step (e.g., 'Foundations')." },
                                    details: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific actions to take in this step." },
                                },
                                required: ["duration", "milestone", "details"],
                            },
                        },
                        salaryProspects: {
                            type: Type.OBJECT,
                            description: "Salary expectations for this career in India.",
                            properties: {
                                range: { type: Type.STRING, description: "Salary range for an entry-level position (in INR)." },
                                growth: { type: Type.STRING, description: "Potential for salary growth over time." },
                            },
                            required: ["range", "growth"],
                        },
                        certifications: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of valuable certifications." },
                        marketAdvice: { type: Type.STRING, description: "Specific advice for breaking into the Indian job market for this role." },
                    },
                    required: ["careerPath", "reasoning", "skillGapAnalysis", "learningRoadmap", "salaryProspects", "certifications", "marketAdvice"],
                },
            },
        },
        required: ["recommendations"],
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            }
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        if (!parsedResponse.recommendations || !Array.isArray(parsedResponse.recommendations)) {
            throw new Error("Invalid response structure from AI model.");
        }
        
        return parsedResponse as CareerRecommendationResponse;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to fetch career recommendations from the AI model.");
    }
};

const AdvisorPage: React.FC = () => {
    const [recommendations, setRecommendations] = useState<CareerRecommendationResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleProfileSubmit = async (profile: StudentProfile) => {
        setIsLoading(true);
        setError(null);
        setRecommendations(null);
        try {
            const result = await getCareerRecommendations(profile);
            setRecommendations(result);
        } catch (err) {
            setError('Failed to get career recommendations. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <ProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-2xl p-6 min-h-[400px] flex flex-col justify-center">
                        {isLoading && <Loader />}
                        {error && <ErrorMessage message={error} />}
                        {!isLoading && !error && !recommendations && <Intro />}
                        {recommendations && <ResultsDisplay data={recommendations} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvisorPage;