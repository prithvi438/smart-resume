"use client";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { FileSignature } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Resume Builder – SmartResume</title>
        <meta name="description" content="Create and download professional resumes for free with SmartResume Resume Builder." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1D4ED8" />
        <meta property="og:title" content="SmartResume Resume Builder" />
        <meta property="og:description" content="Build your professional resume in minutes, for free." />
        <meta property="og:image" content="/resume-preview.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#ffffff", color: "#0F172A" }}>
        {/* Hero Section */}
        <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          {/* Text Content */}
          <div style={{ flex: "1 1 500px" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem", lineHeight: "1.2" }}>
              Build a <span style={{ color: "#1D4ED8" }}>Professional Resume</span><br /> in Minutes
            </h1>
            <p style={{ fontSize: "1.125rem", color: "#334155", marginBottom: "1.5rem" }}>
              Design your resume effortlessly with our smart builder. Free, fast, and customizable.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                // CHANGED: The route is now '/resume-builder'
                onClick={() => router.push("/resume-builder")}
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e40af'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
              >
                Start Building
              </button>
              <button
                // CHANGED: The route is now '/resume-builder?sample=true' for consistency
                onClick={() => router.push("/resume-builder?sample=true")}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#1D4ED8",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  border: "2px solid #1D4ED8",
                  cursor: "pointer",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#EFF6FF'; e.currentTarget.style.color = '#1e40af'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#1D4ED8'; }}
              >
                Try a Sample
              </button>
            </div>
          </div>

          {/* Image Preview */}
          <div style={{ flex: "1 1 400px", position: "relative", textAlign: "center" }}>
            <img
              src="/resume-preview.png" // Make sure this image exists in your `public` folder
              alt="Resume preview"
              style={{
                maxWidth: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-16px",
                left: "-16px",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "50%",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <FileSignature style={{ width: "24px", height: "24px", color: "#1D4ED8" }} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ backgroundColor: "#E0F2FE", padding: "4rem 2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
              Why Use SmartResume Builder?
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
              {[
                {
                  title: "Free & Unlimited",
                  desc: "No signup required. Build as many resumes as you want.",
                },
                {
                  title: "Simple to Use",
                  desc: "Just fill out a form, preview, and download in PDF format.",
                },
                {
                  title: "Professional Design",
                  desc: "Clean and modern templates that employers love.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #bae6fd",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    textAlign: "left",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#1D4ED8", marginBottom: "0.5rem" }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: "#334155", fontSize: "1rem" }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "2rem", fontSize: "0.875rem", color: "#64748B" }}>
          &copy; {new Date().getFullYear()} SmartResume | Resume Builder App
        </footer>
      </div>
    </>
  );
}