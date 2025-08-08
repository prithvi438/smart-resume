"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { ArrowRight } from "lucide-react";

// IMPORTANT: Make sure the paths to your template components are correct.
import Template1 from "../../templates/template1.js";
import Template2 from "../../templates/template2.js";
import Template3 from "../../templates/template3.js";

// ADD THIS: Create a sample data object for previews.
// You can copy this from the original Template1.js file.
const previewData = {
  fullName: "Alex Doe",
  jobTitle: "Senior Software Engineer",
  email: "alex.doe@email.com",
  phone: "+1 (555) 123-4567",
  linkedin: "linkedin.com/in/alexdoe",
  github: "github.com/alexdoe",
  summary:
    "Innovative Senior Software Engineer with over 8 years of experience in developing and deploying robust web applications...",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      period: "Jan 2022 - Present",
      duties: ["Lead a team of 5 engineers...", "Architect and implement microservices..."],
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Technology",
      period: "2016 - 2018",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "AWS", "Docker"],
  projects: [
      {
          name: "Project Insight",
          description: "A real-time data analytics dashboard built with React and D3.js..."
      }
  ]
};


export default function ResumeBuilderPage() {
  const router = useRouter();

  // The only change is inside this array, where we pass the 'previewData'.
  const templates = [
    {
      id: "template1",
      name: "Chronos - The Professional",
      description: "A clean, professional design perfect for experienced individuals.",
      // CHANGED: Pass the previewData object as a prop
      component: <Template1 data={previewData} />,
    },
    {
      id: "template2",
      name: "Nova - The Creative",
      description: "A stylish, modern template for designers and creative roles.",
      // CHANGED: Pass the previewData object as a prop
      component: <Template2 data={previewData} />,
    },
    {
      id: "template3",
      name: "Minima - The Minimalist",
      description: "An elegant, text-focused layout for academics and recent graduates.",
      // CHANGED: Pass the previewData object as a prop
      component: <Template3 data={previewData} />,
    },
  ];

  const handleSelectTemplate = (templateId) => {
    router.push(`/editor?template=${templateId}`);
  };

  return (
    <>
      <Head>
        <title>Choose a Template – SmartResume</title>
        <meta name="description" content="Select a professional resume template to start building your resume." />
        <meta name="theme-color" content="#1D4ED8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#F8FAFC" }}>
        {/* Header Section */}
        <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
              Choose Your Template
            </h1>
            <p style={{ fontSize: "1.125rem", color: "#475569" }}>
              Select a design that best fits your career and personal style. You can customize it in the next step.
            </p>
          </div>
        </header>

        {/* Templates Grid Section (No changes here) */}
        <main style={{ padding: "4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2.5rem"
          }}>
            {templates.map((template) => (
              <div
                key={template.id}
                style={{
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden"
                }}
              >
                <div style={{ padding: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1D4ED8", margin: "0 0 0.5rem 0" }}>
                    {template.name}
                  </h2>
                  <p style={{ fontSize: "1rem", color: "#475569", margin: 0, minHeight: "40px" }}>
                    {template.description}
                  </p>
                </div>

                <div style={{
                  height: "400px",
                  overflow: "hidden",
                  borderTop: "1px solid #E2E8F0",
                  borderBottom: "1px solid #E2E8F0",
                  backgroundColor: "#F8FAFC",
                  cursor: "pointer"
                }}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <div style={{
                    transform: "scale(0.35)",
                    transformOrigin: "top left",
                    width: "285.7%",
                    height: "285.7%",
                  }}>
                    {template.component}
                  </div>
                </div>

                <div style={{ marginTop: "auto", padding: "1.5rem" }}>
                  <button
                    onClick={() => handleSelectTemplate(template.id)}
                    style={{
                      backgroundColor: "#1D4ED8",
                      color: "white",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: 500,
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                  >
                    Use This Template
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "2rem", fontSize: "0.875rem", color: "#64748B", backgroundColor: "#ffffff", borderTop: "1px solid #E2E8F0" }}>
          &copy; {new Date().getFullYear()} SmartResume | Resume Builder App
        </footer>
      </div>
    </>
  );
}