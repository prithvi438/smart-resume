"use client";

// No more imports for useState or useEffect are needed.

// The component now accepts a 'data' object as a prop.
export default function Template1({ data }) {

  const handlePrint = () => {
    // The print function remains the same.
    window.print();
  };

  // If the 'data' prop hasn't been passed yet (e.g., during initial load),
  // display a loading message. This prevents errors.
  if (!data) {
    return (
      <div style={{
          width: '8.5in',
          minHeight: '11in',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f2f5',
          fontFamily: "'Helvetica Neue', Arial, sans-serif"
      }}>
          <p style={{ textAlign: "center", padding: "2rem" }}>Loading Preview...</p>
      </div>
    );
  }

  // The rest of the component's JSX remains the same,
  // but it now renders the data received from props.
  return (
    <>
      <style>{`
        /* CSS styles remain exactly the same */
        body {
          margin: 0;
          padding: 0;
          background: #f0f2f5;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }

        @media print {
          body {
            background: white !important;
          }
          .no-print {
            display: none;
          }
          .resume-wrapper {
            box-shadow: none !important;
            margin: 0;
            border-radius: 0;
          }
          .resume-page {
            width: 100%;
            height: 100%;
            page-break-after: always;
          }
        }

        .controls-wrapper {
          text-align: center;
          padding: 20px 0;
          background: #333;
        }

        .print-button {
          background-color: #007bff;
          color: #fff;
          padding: 12px 25px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: background-color 0.3s ease;
        }

        .print-button:hover {
          background-color: #0056b3;
        }

        .resume-wrapper {
          width: 8.5in;
          min-height: 11in;
          margin: 40px auto;
          background: #fff;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          color: #333;
        }

        .resume-page {
          padding: 40px;
        }

        .header {
          text-align: center;
          border-bottom: 2px solid #007bff;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: 42px;
          margin: 0;
          color: #007bff;
        }
        .header h2 {
          font-size: 20px;
          margin: 5px 0;
          color: #555;
          font-weight: 400;
        }
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
          font-size: 14px;
        }
        .contact-info a {
            color: #007bff;
            text-decoration: none;
        }
         .contact-info a:hover {
            text-decoration: underline;
        }

        .section {
          margin-bottom: 25px;
        }

        .section-title {
          font-size: 22px;
          font-weight: bold;
          color: #007bff;
          border-bottom: 1px solid #eee;
          padding-bottom: 8px;
          margin-bottom: 15px;
        }
        
        .summary p {
            font-size: 16px;
            line-height: 1.6;
        }

        .experience-item, .education-item, .project-item {
          margin-bottom: 20px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .item-header h3 {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
        .item-header p {
          font-size: 16px;
          font-style: italic;
          color: #666;
          margin: 0;
        }
        .item-subheader {
            font-size: 16px;
            font-weight: bold;
            color: #444;
            margin: 0 0 10px 0;
        }
        .duties {
            padding-left: 20px;
            margin: 0;
        }
        .duties li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 0;
            margin: 0;
            list-style: none;
        }
        .skills-list li {
            background-color: #eaf2ff;
            color: #0056b3;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 14px;
        }
      `}</style>

      {/* The print button is hidden on the final print output by the .no-print class */}
      <div className="no-print controls-wrapper">
        <button onClick={handlePrint} className="print-button">
          🖨️ Print / Save as PDF
        </button>
      </div>

      <div className="resume-wrapper">
        <div className="resume-page">
          <header className="header">
            <h1>{data.fullName}</h1>
            <h2>{data.jobTitle}</h2>
            <div className="contact-info">
              <span>{data.email}</span>
              {data.phone && <span>|</span>}
              <span>{data.phone}</span>
              {data.linkedin && <span>|</span>}
              {data.linkedin && <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer">{data.linkedin}</a>}
              {data.github && <span>|</span>}
              {data.github && <a href={`https://${data.github}`} target="_blank" rel="noopener noreferrer">{data.github}</a>}
            </div>
          </header>

          <section className="section summary">
            <h2 className="section-title">Summary</h2>
            <p>{data.summary}</p>
          </section>

          <section className="section">
            <h2 className="section-title">Work Experience</h2>
            {data.experience && data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="item-header">
                  <h3>{exp.title}</h3>
                  <p>{exp.period}</p>
                </div>
                <p className="item-subheader">{exp.company}</p>
                {exp.duties && (
                    <ul className="duties">
                        {exp.duties.map((duty, i) => <li key={i}>{duty}</li>)}
                    </ul>
                )}
              </div>
            ))}
          </section>
          
           <section className="section">
            <h2 className="section-title">Projects</h2>
            {data.projects && data.projects.map((proj, index) => (
              <div key={index} className="project-item">
                 <h3 className="item-subheader">{proj.name}</h3>
                 <p>{proj.description}</p>
              </div>
            ))}
          </section>

          <section className="section">
            <h2 className="section-title">Education</h2>
            {data.education && data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="item-header">
                  <h3>{edu.degree}</h3>
                  <p>{edu.period}</p>
                </div>
                <p className="item-subheader">{edu.institution}</p>
              </div>
            ))}
          </section>

          <section className="section">
            <h2 className="section-title">Skills</h2>
            {data.skills && (
                <ul className="skills-list">
                    {data.skills.map((skill, index) => <li key={index}>{skill}</li>)}
                </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
}