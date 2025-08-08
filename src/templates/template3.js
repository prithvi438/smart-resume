"use client";

// No more imports for useState or useEffect

// The component now accepts a 'data' object as a prop.
export default function Template3({ data }) {

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
          backgroundColor: '#f8f8f8',
          fontFamily: "'Garamond', 'Times New Roman', serif"
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
          background-color: #f8f8f8;
          font-family: 'Garamond', 'Times New Roman', serif;
          font-size: 12pt;
        }

        @media print {
          body {
            background-color: #fff !important;
          }
          .no-print {
            display: none;
          }
          .resume {
            margin: 0 auto;
            border: none;
            box-shadow: none;
            border-radius: 0;
            width: 100%;
            height: 100%;
          }
        }
        
        .controls-wrapper {
          text-align: center;
          padding: 20px 0;
          background-color: #fff;
          border-bottom: 1px solid #ddd;
        }
        
        .print-button {
          background-color: #4CAF50; /* Green */
          color: white;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          font-family: Arial, sans-serif;
          font-size: 16px;
          transition: opacity 0.3s;
        }
        
        .print-button:hover {
          opacity: 0.8;
        }

        .resume {
          width: 8.5in;
          min-height: 11in;
          margin: 40px auto;
          background: #fff;
          padding: 60px 80px;
          box-sizing: border-box;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
          border-top: 5px solid #4CAF50;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .header h1 {
          font-size: 28pt;
          margin: 0;
          font-weight: 600;
          letter-spacing: 2px;
        }
        .header .contact-info {
          margin-top: 15px;
          font-size: 11pt;
          color: #555;
          word-wrap: break-word; /* Helps prevent long links from breaking layout */
        }
        .header .contact-info a {
            color: #4CAF50;
            text-decoration: none;
        }
        .header .contact-info a:hover {
            text-decoration: underline;
        }
        .header .contact-info span.separator {
            margin: 0 10px;
        }

        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 14pt;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #4CAF50;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        
        .summary-text {
            line-height: 1.6;
            margin: 0;
        }

        .entry {
            margin-bottom: 20px;
        }
        .entry-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 2px;
        }
        .entry-title {
            font-size: 12pt;
            font-weight: bold;
            color: #333;
        }
        .entry-date {
            font-size: 11pt;
            font-style: italic;
            color: #666;
        }
        .entry-subtitle {
            font-size: 12pt;
            font-style: italic;
            color: #555;
            margin: 0;
        }
        .entry-notes, .entry-description {
            line-height: 1.5;
            margin-top: 5px;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: 150px 1fr;
            gap: 10px 15px;
        }
        .skill-category {
            font-weight: bold;
            text-align: right;
            color: #333;
        }
      `}</style>
      
      <div className="no-print controls-wrapper">
        <button onClick={handlePrint} className="print-button">
          🖨️ Print / Save as PDF
        </button>
      </div>

      <div className="resume">
        <header className="header">
          <h1>{data.fullName}</h1>
          <div className="contact-info">
            {data.email && <a href={`mailto:${data.email}`}>{data.email}</a>}
            {data.phone && <><span className="separator">•</span><span>{data.phone}</span></>}
            {data.website && <><span className="separator">•</span><a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer">{data.website}</a></>}
            {data.linkedin && <><span className="separator">•</span><a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer">{data.linkedin}</a></>}
          </div>
        </header>

        {data.summary && (
          <section className="section">
            <h2 className="section-title">Summary</h2>
            <p className="summary-text">{data.summary}</p>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="section">
            <h2 className="section-title">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="entry">
                <div className="entry-header">
                  <p className="entry-title">{edu.degree}</p>
                  <p className="entry-date">{edu.period}</p>
                </div>
                <p className="entry-subtitle">{edu.institution}</p>
                {edu.notes && <p className="entry-notes">{edu.notes}</p>}
              </div>
            ))}
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className="section">
            <h2 className="section-title">Projects</h2>
            {data.projects.map((proj, i) => (
               <div key={i} className="entry">
                <div className="entry-header">
                  <p className="entry-title">{proj.name}</p>
                  {/* Note: `proj.period` is not in the editor form, can be added if needed */}
                  {proj.period && <p className="entry-date">{proj.period}</p>}
                </div>
                <p className="entry-description">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Note: This skills section is different. The editor uses a simple array of strings.
            This template expects an object. You'll need a new form section in the editor
            if you want to support this categorized skills format.
            For now, it will render the simple string array. */}
        {data.skills && data.skills.length > 0 && (
          <section className="section">
            <h2 className="section-title">Technical Skills</h2>
            <p>{data.skills.join(', ')}</p>
          </section>
        )}

        {/* The 'publications' field is also unique to this template.
            It needs its own form section in the editor to be populated. */}
        {data.publications && data.publications.length > 0 && (
          <section className="section">
              <h2 className="section-title">Publications</h2>
               {data.publications.map((pub, i) => (
               <div key={i} className="entry">
                <div className="entry-header">
                  <p className="entry-title">&quot;{pub.title}&quot;</p>
                  <p className="entry-date">{pub.year}</p>
                </div>
                <p className="entry-subtitle">{pub.journal}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
}