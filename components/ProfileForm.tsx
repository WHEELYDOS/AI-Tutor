import React, { useState, useRef } from 'react';
import type { StudentProfile } from '../types';

interface ProfileFormProps {
    onSubmit: (profile: StudentProfile, resumeFile: { name: string; data: string; mimeType: string; } | null) => void;
    isLoading: boolean;
}

const GetFileIcon: React.FC<{ extension?: string }> = ({ extension }) => {
    switch (extension) {
        case 'pdf':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M10.4 18.1h.4c.5 0 .9-.4.9-.9v-4.3c0-.5-.4-.9-.9-.9h-2.1c-.5 0-.9.4-.9.9v.4c0 .5.4.9.9.9h.4" /><path d="M14.2 12.2h.5c.5 0 .9.4.9.9v4.3c0 .5-.4.9-.9.9h-.5" /><path d="M17.6 15.6c.5 0 .9.4.9.9v.9c0 .5-.4.9-.9.9h-2.1c-.5 0-.9-.4-.9-.9v-4.3c0-.5.4-.9.9-.9h.4" />
                </svg>
            );
        case 'docx':
        case 'doc':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M12.5 15.5h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1z" /><path d="M17.5 15.5h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z" /><path d="M8.5 12.5h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
                </svg>
            );
        case 'txt':
             return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
             );
        case 'jpg':
        case 'jpeg':
        case 'png':
             return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                </svg>
             );
        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
            );
    }
}


const InputField: React.FC<{
    name: keyof StudentProfile;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}> = ({ name, label, value, onChange, onFocus }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-[#124170]/70 mb-1">{label}</label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150"
            required
        />
    </div>
);

const initialProfileData: StudentProfile = {
    name: 'Aarav Sharma',
    educationLevel: 'Bachelor of Technology in Computer Science',
    grades: '8.5 CGPA',
    techSkills: 'Python, JavaScript, React, SQL',
    interests: 'Data Science, Web Development, Artificial Intelligence',
    location: 'Bangalore',
    careerGoals: 'To become a machine learning engineer at a top tech company.'
};


const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading }) => {
    const [profile, setProfile] = useState<StudentProfile>(initialProfileData);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [fileInfo, setFileInfo] = useState<{ message: string; color: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = e.currentTarget.name as keyof StudentProfile;
        // If the current value is the same as the initial example, clear it
        if (profile[fieldName] === initialProfileData[fieldName]) {
            setProfile(prev => ({ ...prev, [fieldName]: '' }));
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResumeFile(file);
            const extension = file.name.split('.').pop()?.toLowerCase();
            let info = { message: '', color: 'text-[#124170]/80' };

            switch (extension) {
                case 'txt':
                    info.message = 'The AI will analyze the text content of this file.';
                    break;
                case 'pdf':
                case 'docx':
                    info.message = 'The AI will analyze the full content and layout of this document.';
                    break;
                case 'jpg':
                case 'jpeg':
                case 'png':
                    info.message = 'The AI will perform a visual analysis of this image.';
                    break;
                case 'doc':
                    info.message = 'Warning: .doc files are not fully supported. Please convert to DOCX or PDF for best results.';
                    info.color = 'text-yellow-700 font-medium';
                    break;
                default:
                    info.message = 'Unsupported file type. Please upload a supported format.';
                    info.color = 'text-red-600 font-medium';
                    break;
            }
            setFileInfo(info);
        } else {
            setResumeFile(null);
            setFileInfo(null);
        }
    };

    const handleRemoveFile = () => {
        setResumeFile(null);
        setFileInfo(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset file input
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resumeFile) {
            onSubmit(profile, null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            const fileContent = loadEvent.target?.result as string;
            
            if (resumeFile.type === 'text/plain') {
                onSubmit(profile, {
                    name: resumeFile.name,
                    data: fileContent,
                    mimeType: resumeFile.type,
                });
            } else {
                // For other files, it's a base64 encoded data URL. We need to strip the prefix.
                const base64Data = fileContent.split(',')[1];
                onSubmit(profile, {
                    name: resumeFile.name,
                    data: base64Data,
                    mimeType: resumeFile.type,
                });
            }
        };

        reader.onerror = (error) => {
            console.error("Error reading file:", error);
            setFileInfo({ message: 'Error reading file. Please try again.', color: 'text-red-600 font-medium'});
        };
        
        // Use readAsText for plain text files, and readAsDataURL for all others
        // to get a base64 string.
        if (resumeFile.type === 'text/plain') {
            reader.readAsText(resumeFile);
        } else {
            reader.readAsDataURL(resumeFile);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-4 text-[#26667F]">Your Profile</h2>
            <p className="text-[#124170]/70 mb-6">Enter your details and upload a resume to get personalized career advice.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField name="name" label="Full Name" value={profile.name} onChange={handleChange} onFocus={handleFocus} />
                <InputField name="educationLevel" label="Education Level" value={profile.educationLevel} onChange={handleChange} onFocus={handleFocus} />
                <InputField name="grades" label="Grades / CGPA" value={profile.grades} onChange={handleChange} onFocus={handleFocus} />
                <InputField name="techSkills" label="Technical Skills (comma-separated)" value={profile.techSkills} onChange={handleChange} onFocus={handleFocus} />
                <InputField name="interests" label="Interests (comma-separated)" value={profile.interests} onChange={handleChange} onFocus={handleFocus} />
                <InputField name="location" label="Current Location" value={profile.location} onChange={handleChange} onFocus={handleFocus} />
                
                <div>
                    <label htmlFor="careerGoals" className="block text-sm font-medium text-[#124170]/70 mb-1">Career Goals</label>
                    <textarea
                        id="careerGoals"
                        name="careerGoals"
                        value={profile.careerGoals}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        rows={3}
                        className="w-full bg-[#DDF4E7] border border-[#67C090] rounded-md shadow-sm py-2 px-3 text-[#124170] focus:outline-none focus:ring-2 focus:ring-[#26667F] transition duration-150"
                        required
                    />
                </div>
                
                <div className="relative flex items-center">
                    <div className="flex-grow border-t border-[#67C090]/50"></div>
                    <span className="flex-shrink mx-4 text-xs font-semibold uppercase text-[#124170]/60">Or</span>
                    <div className="flex-grow border-t border-[#67C090]/50"></div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-center text-[#124170]/70 mb-2">
                        Get richer feedback by uploading your resume
                    </label>
                    <div className="mt-1">
                        {!resumeFile ? (
                            <label htmlFor="file-upload" className="relative flex justify-center w-full px-6 py-4 text-center bg-[#DDF4E7] border border-[#67C090] rounded-md cursor-pointer hover:border-[#26667F] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#26667F] transition-colors">
                                <div className="flex items-center text-sm text-[#26667F]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    <span className="font-semibold">Attach your resume</span>
                                </div>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} ref={fileInputRef} accept=".txt,.pdf,.docx,.doc,.jpg,.jpeg,.png" />
                            </label>
                        ) : (
                            <div className="space-y-2">
                                <div className="w-full bg-white border border-[#67C090] rounded-md p-2 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center space-x-2 overflow-hidden">
                                        <div className="flex-shrink-0">
                                            <GetFileIcon extension={resumeFile.name.split('.').pop()?.toLowerCase()} />
                                        </div>
                                        <div className="text-sm overflow-hidden">
                                            <p className="font-medium text-[#124170] truncate">{resumeFile.name}</p>
                                            <p className="text-xs text-[#124170]/60">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="flex-shrink-0 text-gray-400 hover:text-red-500 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#26667F] transition-colors"
                                        aria-label="Remove file"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                                {fileInfo && (
                                    <p className={`text-xs text-center ${fileInfo.color}`}>{fileInfo.message}</p>
                                )}
                            </div>
                        )}
                    </div>
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