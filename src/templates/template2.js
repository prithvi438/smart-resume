"use client";

// No more imports for useState or useEffect
// The component now accepts a 'data' object as a prop.
export default function Template2({ data }) {

  const handlePrint = () => {
    window.print();
  };

  // If the 'data' prop hasn't been passed yet, display a loading message.
  if (!data) {
    return (
      <div style={{
          width: '8.5in',
          minHeight: '11in',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f4f4f4',
          fontFamily: "'Georgia', serif"
      }}>
          <p style={{ textAlign: "center", padding: "2rem" }}>Loading Preview...</p>
      </div>
    );
  }

  // The component now renders the data received from props.
  return (
    <>
      <style>{`
        /* All CSS styles remain exactly the same */
        body {
          margin: 0;
          padding: 0;
          background: #f4f4f4;
          font-family: 'Georgia', serif;
        }

        @media print {
          body {
            background: white !important;
          }
          .no-print {
            display: none;
          }
          .resume-container {
            margin: 0;
            box-shadow: none;
            border-radius: 0;
            width: 100%;
          }
        }
        
        .controls-wrapper {
          text-align: center;
          padding: 20px 0;
          background-color: #2c3e50;
        }

        .print-button {
          background-color: #e74c3c;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        
        .print-button:hover {
          background-color: #c0392b;
        }

        .resume-container {
          display: flex;
          width: 8.5in;
          min-height: 11in;
          margin: 40px auto;
          background: #fff;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .sidebar {
          background-color: #2c3e50;
          color: #fff;
          width: 35%;
          padding: 40px 25px;
          display: flex;
          flex-direction: column;
        }
        
        .profile-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .profile-header h1 {
          font-size: 32px;
          margin: 0;
          color: #e74c3c;
        }
        .profile-header h2 {
          font-size: 18px;
          font-weight: 300;
          margin: 5px 0 0 0;
          color: #ecf0f1;
        }
        
        .sidebar-section {
          margin-bottom: 25px;
        }
        .sidebar-title {
          font-size: 18px;
          font-weight: bold;
          color: #e74c3c;
          border-bottom: 1px solid #7f8c8d;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .contact-list, .skills-list, .tools-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 14px;
        }
        .contact-list li, .skills-list li, .tools-list li {
          margin-bottom: 10px;
          word-wrap: break-word; /* Helps with long links */
        }
         .contact-list a {
            color: #ecf0f1;
            text-decoration: none;
        }
         .contact-list a:hover {
            text-decoration: underline;
        }
        
        .main-content {
          width: 65%;
          padding: 40px 30px;
          color: #34495e;
        }
        .main-section {
          margin-bottom: 30px;
        }
        .main-title {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        
        .summary-text {
            font-size: 16px;
            line-height: 1.6;
            font-style: italic;
        }
        
        .job-item {
          margin-bottom: 25px;
        }
        .job-title {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
        .job-details {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #e74c3c;
          font-weight: bold;
          margin: 5px 0 10px 0;
        }
        .job-duties {
            padding-left: 18px;
            margin: 0;
        }
         .job-duties li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        .edu-item {
            margin-bottom: 10px;
        }
        .edu-item h3 {
            font-size: 18px;
            margin: 0;
        }
        .edu-item p {
            margin: 5px 0;
            font-size: 14px;
            color: #e74c3c;
            font-weight: bold;
        }
      `}</style>

      <div className="no-print controls-wrapper">
        <button onClick={handlePrint} className="print-button">
          🖨️ Print / Save as PDF
        </button>
      </div>
      
      <div className="resume-container">
        <aside className="sidebar">
          <div className="profile-header">
            <h1>{data.fullName}</h1>
            <h2>{data.jobTitle}</h2>
          </div>
          
          <div className="sidebar-section">
            <h3 className="sidebar-title">Contact</h3>
            <ul className="contact-list">
              {data.email && <li>{data.email}</li>}
              {data.phone && <li>{data.phone}</li>}
              {/* Use data.website for the portfolio link */}
              {data.website && <li><a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer">{data.website}</a></li>}
              {data.linkedin && <li><a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer">{data.linkedin}</a></li>}
            </ul>
          </div>

          {data.skills && data.skills.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Skills</h3>
              <ul className="skills-list">
                {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </div>
          )}
          
           {/* 'tools' is not in the editor data, so this section might not appear.
               You can add a 'tools' field to your editor form if you want to use it. */}
           {data.tools && data.tools.length > 0 && (
             <div className="sidebar-section">
              <h3 className="sidebar-title">Tools</h3>
              <ul className="tools-list">
                {data.tools.map((tool, i) => <li key={i}>{tool}</li>)}
              </ul>
            </div>
           )}
        </aside>

        <main className="main-content">
          {data.summary && (
            <section className="main-section">
              <h2 className="main-title">Profile</h2>
              <p className="summary-text">{data.summary}</p>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section className="main-section">
              <h2 className="main-title">Experience</h2>
              {data.experience.map((job, i) => (
                <div key={i} className="job-item">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-details">
                    <span>{job.company}</span>
                    <span>{job.period}</span>
                  </div>
                  {job.duties && job.duties.length > 0 && (
                    <ul className="job-duties">
                      {job.duties.map((duty, j) => <li key={j}>{duty}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
          
           {data.projects && data.projects.length > 0 && (
            <section className="main-section">
              <h2 className="main-title">Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} className="job-item">
                  <h3 className="job-title">{proj.name}</h3>
                  <p>{proj.description}</p>
                </div>
              ))}
            </section>
           )}

          {data.education && data.education.length > 0 && (
            <section className="main-section">
              <h2 className="main-title">Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="edu-item">
                  <h3>{edu.degree}</h3>
                  <p>{edu.institution} / {edu.period}</p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </>
  );
}