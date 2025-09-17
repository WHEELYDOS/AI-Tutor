export interface StudentProfile {
    name: string;
    educationLevel: string;
    grades: string;
    techSkills: string;
    interests: string;
    location: string;
    careerGoals: string;
}

export interface SkillGap {
    skill: string;
    reason: string;
}

export interface RoadmapStep {
    duration: string;
    milestone: string;
    details: string[];
}

export interface CareerRecommendation {
    careerPath: string;
    reasoning: string;
    skillGapAnalysis: SkillGap[];
    learningRoadmap: RoadmapStep[];
    salaryProspects: {
        range: string;
        growth: string;
    };
    certifications: string[];
    marketAdvice: string;
    resumeSuggestions?: string[];
}

export interface CareerRecommendationResponse {
    recommendations: CareerRecommendation[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

// Types for Roadmap Generator
export interface RoadmapNode {
    id: number;
    title: string;
    description: string;
    type: 'core' | 'elective' | 'tool';
    children: RoadmapNode[];
}

export interface Roadmap {
    title: string;
    description: string;
    root: RoadmapNode;
}

// Type for User Authentication
export interface User {
    name: string;
    email: string;
    password?: string;
}