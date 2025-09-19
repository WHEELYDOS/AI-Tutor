import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { Roadmap } from '../types';
import RoadmapSidebar from '../components/RoadmapSidebar';
import RoadmapDisplay from '../components/RoadmapDisplay';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { premadeRoadmaps } from '../data/premadeRoadmaps';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getGeneratedRoadmap = async (topic: string): Promise<Roadmap> => {
    const prompt = `
        Create a detailed, structured learning roadmap for the topic: "${topic}".
        The response must be a single, valid JSON object that strictly adheres to the provided schema. 
        Do not include any markdown formatting like \`\`\`json.

        The roadmap should have a clear title and a brief description.
        It must start with a single "root" node.
        Each node must have an id (integer), title, description, a type ('core', 'elective', 'tool'), and an array of children nodes.
        'core' is for fundamental concepts.
        'elective' is for optional but recommended topics or alternative paths.
        'tool' is for specific software, libraries, or frameworks.
        The structure must be hierarchical. Keep the roadmap concise but comprehensive, with a depth of 3-5 levels.
        Generate a unique ID for each node.
    `;
    
    // The previous schema was invalid because a nested `children` property of type `ARRAY` was missing its `items` definition.
    // This updated schema defines the structure for the root node and its direct children.
    // To avoid schema recursion, the `children` property is omitted from the definition of the items inside the root's `children` array.
    // The model is expected to generate the deeper hierarchical structure based on the explicit instructions in the prompt.
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            root: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    type: { type: Type.STRING },
                    children: {
                        type: Type.ARRAY,
                        items: { // This defines a "node"
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.INTEGER },
                                title: { type: Type.STRING },
                                description: { type: Type.STRING },
                                type: { type: Type.STRING },
                                // We also expect children here, but defining them in the schema causes recursion issues.
                                // By omitting the 'children' property from this part of the schema, we break the recursion.
                                // The prompt instructs the model to create a nested structure, and the client-side type can handle it.
                            },
                             // Since 'children' is not in properties here, it cannot be in required.
                            required: ["id", "title", "description", "type"],
                        },
                    },
                },
                // The root node itself is required to have children.
                required: ["id", "title", "description", "type", "children"],
            },
        },
        required: ["title", "description", "root"],
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.3,
            }
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        return parsedResponse as Roadmap;

    } catch (error) {
        console.error("Error calling Gemini API for roadmap:", error);
        throw new Error("Failed to generate the roadmap from the AI model. It might be an issue with the response structure.");
    }
}


const RoadmapPage: React.FC = () => {
    const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap | null>(premadeRoadmaps[0]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectRoadmap = (roadmap: Roadmap) => {
        setError(null);
        setCurrentRoadmap(roadmap);
    }

    const handleGenerateRoadmap = async (topic: string) => {
        if (!topic.trim()) return;
        setIsLoading(true);
        setError(null);
        setCurrentRoadmap(null);
        try {
            const result = await getGeneratedRoadmap(topic);
            setCurrentRoadmap(result);
        } catch (err) {
            setError('Failed to generate the roadmap. Please try a different topic or try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto p-4 md:p-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <RoadmapSidebar
                        premade={premadeRoadmaps}
                        onSelect={handleSelectRoadmap}
                        onGenerate={handleGenerateRoadmap}
                        isLoading={isLoading}
                        activeRoadmapTitle={currentRoadmap?.title}
                    />
                </div>
                <div className="lg:col-span-3">
                     <div className="bg-white rounded-xl shadow-2xl p-6 min-h-[calc(100vh-150px)] flex flex-col justify-center">
                        {isLoading && <Loader />}
                        {error && <ErrorMessage message={error} />}
                        {currentRoadmap && !isLoading && !error && <RoadmapDisplay roadmap={currentRoadmap} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapPage;