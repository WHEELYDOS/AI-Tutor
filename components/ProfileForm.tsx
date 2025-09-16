import React, { useState } from 'react';
import type { StudentProfile } from '../types';

interface ProfileFormProps {
    onSubmit: (profile: StudentProfile) => void;
    isLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading }) => {
    const [profile, setProfile] = useState<StudentProfile>({
        name: 'Aarav Sharma',
        educationLevel: 'Bachelor of Technology in Computer Science',
        grades: '8.5 CGPA',
        techSkills: 'Python, JavaScript, React, SQL',
        interests: 'Data Science, Web Development, Artificial Intelligence',
        location: 'Bangalore',
        careerGoals: 'To become a machine learning engineer at a top tech company.'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(profile);
    };
    
    const InputField: React.FC<{name: keyof StudentProfile, label: string}> = ({ name, label }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-[#124170]/70 mb-1">{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={profile[name]}
                onChange={handleChange}
                className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150"
                required
            />
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-4 text-[#26667F]">Your Profile</h2>
            <p className="text-[#124170]/70 mb-6">Enter your details to get personalized career advice from our AI.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField name="name" label="Full Name" />
                <InputField name="educationLevel" label="Education Level" />
                <InputField name="grades" label="Grades / CGPA" />
                <InputField name="techSkills" label="Technical Skills (comma-separated)" />
                <InputField name="interests" label="Interests (comma-separated)" />
                <InputField name="location" label="Current Location" />
                
                <div>
                    <label htmlFor="careerGoals" className="block text-sm font-medium text-[#124170]/70 mb-1">Career Goals</label>
                    <textarea
                        id="careerGoals"
                        name="careerGoals"
                        value={profile.careerGoals}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150"
                        required
                    />
                </div>
                
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#26667F] text-white font-bold py-3 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#26667F] transition duration-200 ease-in-out disabled:bg-[#67C090] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : 'Get AI Recommendations'}
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;