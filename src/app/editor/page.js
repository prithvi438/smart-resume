"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Head from "next/head";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

// Import your modified template components
import Template1 from "../../templates/template1.js";
import Template2 from "../../templates/template2.js";
import Template3 from "../../templates/template3.js";


// Initial data structure for a new resume
const initialResumeData = {
  fullName: "Your Name",
  jobTitle: "Your Job Title",
  email: "your.email@example.com",
  phone: "(555) 123-4567",
  website: "yourportfolio.com",
  linkedin: "linkedin.com/in/yourprofile",
  summary: "A brief professional summary about yourself, your skills, and your career goals. Keep it concise and impactful.",
  experience: [
    {
      title: "Job Title",
      company: "Company Name",
      period: "Jan 2022 - Present",
      duties: ["Responsibility or accomplishment #1", "Responsibility or accomplishment #2"],
    },
  ],
  education: [
    {
      degree: "Degree or Certificate",
      institution: "University or Institution Name",
      period: "2018 - 2022",
      notes: "Relevant coursework or honors."
    },
  ],
  skills: ["Skill #1", "Skill #2", "Skill #3"],
  projects: [{
      name: "Project Name",
      description: "A short description of the project, its purpose, and the technologies used."
  }]
};

export default function EditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");

  const [resumeData, setResumeData] = useState(initialResumeData);

  // --- All handler functions (handleInputChange, etc.) remain the same ---
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
  }

  const addArrayItem = (section, newItem) => {
     setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };
  
  const removeArrayItem = (section, index) => {
    const updatedArray = [...resumeData[section]];
    updatedArray.splice(index, 1);
    setResumeData((prev) => ({...prev, [section]: updatedArray}));
  };

  const renderTemplate = () => {
    switch (templateId) {
      case "template1":
        return <Template1 data={resumeData} />;
      case "template2":
        return <Template2 data={resumeData} />;
      case "template3":
        return <Template3 data={resumeData} />;
      default:
        return <div style={{textAlign: 'center', padding: '2rem'}}>Template not found or selected.</div>;
    }
  };


  return (
    <>
      <Head>
        <title>Resume Editor – SmartResume</title>
      </Head>
      <style>{`
        /* General styles (no changes here) */
        .form-section {
          background-color: #ffffff;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
        }
        .form-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1.25rem 0;
          color: #111827;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.65rem 0.75rem;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          font-size: 1rem;
          color: #111827;
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 1px #2563eb;
        }
        .array-item {
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          position: relative;
        }
        .add-btn {
           background-color: #dbeafe;
           color: #1e40af;
           border: none;
           padding: 0.5rem 1rem;
           border-radius: 6px;
           cursor: pointer;
           font-weight: 500;
           display: flex;
           align-items: center;
           gap: 0.5rem;
        }
        .remove-btn {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: #fee2e2;
            color: #b91c1c;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }
        .remove-btn:hover {
            background: #fecaca;
        }

        /* --- NEW: Print-specific styles --- */
        @media print {
          /* Hide the entire form sidebar when printing */
          .editor-sidebar {
            display: none !important;
          }

          /* Make the preview pane take up the entire page */
          .preview-pane {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
          }
          
          /* Reset the scaling on the preview wrapper */
          .preview-wrapper {
             transform: scale(1) !important;
             margin: 0 !important;
             box-shadow: none !important;
          }

          /* Ensure the body itself has no margins in the print output */
           body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #fff !important;
          }
        }
      `}</style>
      
      <div style={{ display: "flex", height: "100vh", backgroundColor: "#F8FAFC" }}>
        {/* LEFT SIDE: FORM -- ADDED className="editor-sidebar" */}
        <aside className="editor-sidebar" style={{ width: "450px", height: "100vh", overflowY: "auto", padding: "1.5rem", borderRight: "1px solid #E2E8F0", backgroundColor: '#ffffff' }}>
            <button
              onClick={() => router.back()}
              className="add-btn"
              style={{ marginBottom: '1.5rem', background: '#f3f4f6', color: '#4b5563' }}
            >
                <ArrowLeft size={16} /> Back to Templates
            </button>
            
            <h2 style={{fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111827'}}>Edit Your Resume</h2>

            {/* ALL FORM SECTIONS REMAIN THE SAME */}
            {/* Personal Details */}
            <div className="form-section">
                <h3>Personal Details</h3>
                 <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input id="fullName" name="fullName" value={resumeData.fullName} onChange={handleInputChange} />
                </div>
                 <div className="form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input id="jobTitle" name="jobTitle" value={resumeData.jobTitle} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={resumeData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" value={resumeData.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website / Portfolio</label>
                    <input id="website" name="website" value={resumeData.website} onChange={handleInputChange} />
                </div>
                 <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn Profile</label>
                    <input id="linkedin" name="linkedin" value={resumeData.linkedin} onChange={handleInputChange} />
                </div>
            </div>
            
            {/* Summary */}
            <div className="form-section">
                <h3>Professional Summary</h3>
                <div className="form-group">
                    <textarea name="summary" value={resumeData.summary} onChange={handleInputChange} rows={5}></textarea>
                </div>
            </div>
            
            {/* Experience */}
            <div className="form-section">
                <h3>Work Experience</h3>
                {resumeData.experience.map((exp, index) => (
                    <div key={index} className="array-item">
                         <button onClick={() => removeArrayItem('experience', index)} className="remove-btn"><Trash2 size={16}/></button>
                         <div className="form-group">
                            <label>Job Title</label>
                            <input name="title" value={exp.title} onChange={(e) => handleArrayChange('experience', index, e)} />
                         </div>
                         <div className="form-group">
                            <label>Company</label>
                            <input name="company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, e)} />
                         </div>
                         <div className="form-group">
                            <label>Period</label>
                            <input name="period" value={exp.period} onChange={(e) => handleArrayChange('experience', index, e)} />
                         </div>
                         <label className="form-group">Responsibilities / Achievements</label>
                         {exp.duties.map((duty, dutyIndex) => (
                           <div key={dutyIndex} style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem'}}>
                              <input value={duty} onChange={(e) => handleDutyChange(index, dutyIndex, e.target.value)} style={{flex: 1}} />
                              <button onClick={() => removeDuty(index, dutyIndex)} className="remove-btn" style={{position: 'static', width: '38px', height: '38px'}}><Trash2 size={14}/></button>
                           </div>
                         ))}
                         <button onClick={() => addDuty(index)} className="add-btn" style={{fontSize: '0.875rem', padding: '0.25rem 0.75rem', marginTop: '0.5rem'}}>Add Responsibility</button>
                    </div>
                ))}
                <button onClick={() => addArrayItem('experience', {title: 'New Job', company: 'Company', period: '', duties: ['']})} className="add-btn">
                    <Plus size={16} /> Add Experience
                </button>
            </div>

             {/* Education */}
            <div className="form-section">
                <h3>Education</h3>
                {resumeData.education.map((edu, index) => (
                    <div key={index} className="array-item">
                         <button onClick={() => removeArrayItem('education', index)} className="remove-btn"><Trash2 size={16}/></button>
                         <div className="form-group">
                            <label>Degree / Certificate</label>
                            <input name="degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} />
                         </div>
                         <div className="form-group">
                            <label>Institution</label>
                            <input name="institution" value={edu.institution} onChange={(e) => handleArrayChange('education', index, e)} />
                         </div>
                         <div className="form-group">
                            <label>Period</label>
                            <input name="period" value={edu.period} onChange={(e) => handleArrayChange('education', index, e)} />
                         </div>
                         <div className="form-group">
                            <label>Notes (Optional)</label>
                            <input name="notes" value={edu.notes} onChange={(e) => handleArrayChange('education', index, e)} />
                         </div>
                    </div>
                ))}
                <button onClick={() => addArrayItem('education', {degree: 'Degree', institution: 'University', period: '', notes: ''})} className="add-btn">
                    <Plus size={16} /> Add Education
                </button>
            </div>
        </aside>

        {/* RIGHT SIDE: LIVE PREVIEW -- ADDED className="preview-pane" */}
        <main className="preview-pane" style={{ flex: 1, height: "100vh", overflowY: "auto", padding: "2rem", backgroundColor: '#f8fafc' }}>
            {/* ADDED className="preview-wrapper" to the div below */}
            <div className="preview-wrapper" style={{ margin: '0 auto', transform: 'scale(0.8)', transformOrigin: 'top center' }}>
                {renderTemplate()}
            </div>
        </main>
      </div>
    </>
  );
}