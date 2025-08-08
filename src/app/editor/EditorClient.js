// FILE: src/app/editor/EditorClient.js

"use client"; // This is CRITICAL. This file is a Client Component.

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Head from "next/head";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

// Import your template components
import Template1 from "../../templates/template1.js";
import Template2 from "../../templates/template2.js";
import Template3 from "../../templates/template3.js";

const initialResumeData = {
  fullName: "Your Name",
  jobTitle: "Your Job Title",
  email: "your.email@example.com",
  phone: "(555) 123-4567",
  website: "yourportfolio.com",
  linkedin: "linkedin.com/in/yourprofile",
  summary: "A brief professional summary about yourself...",
  experience: [ { title: "Job Title", company: "Company Name", period: "Jan 2022 - Present", duties: ["Responsibility #1"], }, ],
  education: [ { degree: "Degree", institution: "University Name", period: "2018 - 2022", notes: "" }, ],
  skills: ["Skill #1", "Skill #2", "Skill #3"],
  projects: [{ name: "Project Name", description: "A short description of the project." }]
};

export default function EditorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");

  const [resumeData, setResumeData] = useState(initialResumeData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleArrayChange = (section, index, e) => {
    const { name, value } = e.target;
    const updatedArray = [...resumeData[section]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setResumeData((prev) => ({ ...prev, [section]: updatedArray }));
  };

  const handleDutyChange = (expIndex, dutyIndex, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].duties[dutyIndex] = value;
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addDuty = (expIndex) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].duties.push("New responsibility");
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const removeDuty = (expIndex, dutyIndex) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[expIndex].duties.splice(dutyIndex, 1);
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addArrayItem = (section, newItem) => {
     setResumeData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
  };
  
  const removeArrayItem = (section, index) => {
    const updatedArray = [...resumeData[section]];
    updatedArray.splice(index, 1);
    setResumeData((prev) => ({...prev, [section]: updatedArray}));
  };

  const renderTemplate = () => {
    switch (templateId) {
      case "template1": return <Template1 data={resumeData} />;
      case "template2": return <Template2 data={resumeData} />;
      case "template3": return <Template3 data={resumeData} />;
      default: return <div>Loading Template...</div>;
    }
  };

  return (
    <>
      <Head><title>Resume Editor – SmartResume</title></Head>
      <style>{`
        .form-section { background-color: #ffffff; border-radius: 8px; margin-bottom: 1.5rem; padding: 1.5rem; border: 1px solid #e2e8f0; }
        .form-section h3 { font-size: 1.25rem; font-weight: 600; margin: 0 0 1.25rem 0; color: #111827; padding-bottom: 0.75rem; border-bottom: 1px solid #f3f4f6; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.5rem; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.65rem 0.75rem; border-radius: 6px; border: 1px solid #d1d5db; font-size: 1rem; color: #111827; }
        .array-item { border: 1px solid #e5e7eb; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; position: relative; }
        .add-btn { background-color: #dbeafe; color: #1e40af; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
        .remove-btn { position: absolute; top: 0.75rem; right: 0.75rem; background: #fee2e2; color: #b91c1c; border: none; border-radius: 50%; cursor: pointer; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; }
        @media print { .editor-sidebar { display: none !important; } .preview-pane { width: 100% !important; padding: 0 !important; } .preview-wrapper { transform: scale(1) !important; } }
      `}</style>
      <div style={{ display: "flex", height: "100vh" }}>
        <aside className="editor-sidebar" style={{ width: "450px", height: "100vh", overflowY: "auto", padding: "1.5rem", borderRight: "1px solid #E2E8F0", backgroundColor: '#ffffff' }}>
            <button onClick={() => router.back()} className="add-btn" style={{ marginBottom: '1.5rem', background: '#f3f4f6', color: '#4b5563' }}><ArrowLeft size={16} /> Back</button>
            <h2 style={{fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111827'}}>Edit Resume</h2>
            <div className="form-section">
                <h3>Personal Details</h3>
                <div className="form-group"><label>Full Name</label><input name="fullName" value={resumeData.fullName} onChange={handleInputChange} /></div>
                <div className="form-group"><label>Job Title</label><input name="jobTitle" value={resumeData.jobTitle} onChange={handleInputChange} /></div>
                <div className="form-group"><label>Email</label><input name="email" value={resumeData.email} onChange={handleInputChange} /></div>
                <div className="form-group"><label>Phone</label><input name="phone" value={resumeData.phone} onChange={handleInputChange} /></div>
                <div className="form-group"><label>Website</label><input name="website" value={resumeData.website} onChange={handleInputChange} /></div>
                <div className="form-group"><label>LinkedIn</label><input name="linkedin" value={resumeData.linkedin} onChange={handleInputChange} /></div>
            </div>
            <div className="form-section">
                <h3>Summary</h3>
                <textarea name="summary" value={resumeData.summary} onChange={handleInputChange} rows={5}></textarea>
            </div>
            {/* ... other form sections ... */}
        </aside>
        <main className="preview-pane" style={{ flex: 1, overflowY: "auto", padding: "2rem", backgroundColor: '#f8fafc' }}>
          <div className="preview-wrapper" style={{ margin: '0 auto', transform: 'scale(0.8)', transformOrigin: 'top center' }}>{renderTemplate()}</div>
        </main>
      </div>
    </>
  );
}