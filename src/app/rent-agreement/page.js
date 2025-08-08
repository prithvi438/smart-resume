"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RentAgreement() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    agreementDate: "",
    leaser: {
      name: "",
      fatherName: "",
      caste: "",
      religion: "",
      village: "",
      phone: "",
      policeStation: "",
      district: "",
      aadhar: "",
    },
    lessee: {
      name: "",
      fatherName: "",
      caste: "",
      religion: "",
      village: "",
      phone: "",
      policeStation: "",
      district: "",
      aadhar: "",
    },
    rentPeriod: "",
    startDate: "",
    endDate: "",
    monthlyRent: "",
    propertyDetails: {
      mouja: "",
      khataNo: "",
      plotNo: "",
      thana: "",
      thanaNo: "",
      area: "",
      businessType: "",
    },
  });

  const fieldLabels = {
    agreementDate: "Agreement Date (समझौते की तारीख)",
    name: "Name (नाम)",
    fatherName: "Father's Name (पिता का नाम)",
    caste: "Caste (जाति)",
    religion: "Religion (धर्म)",
    village: "Village (गांव)",
    phone: "Phone Number (फोन नंबर)",
    policeStation: "Police Station (थाना)",
    district: "District (जिला)",
    aadhar: "Aadhar Number (आधार संख्या)",
    rentPeriod: "Lease Period (किराया अवधि - महीनों में)",
    startDate: "Start Date (प्रारंभ तिथि)",
    endDate: "End Date (समाप्ति तिथि)",
    monthlyRent: "Monthly Rent (मासिक किराया)",
    mouja: "Mouja (मौजा)",
    khataNo: "Khata Number (खाता संख्या)",
    plotNo: "Plot Number (प्लॉट संख्या)",
    thana: "Thana (थाना)",
    thanaNo: "Thana Number (थाना संख्या)",
    area: "Area in Sq Ft (क्षेत्रफल - वर्ग फीट में)",
    businessType: "Business Type (व्यवसाय का प्रकार)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  };

  const labelStyle = {
    marginBottom: "6px",
    fontWeight: "500",
    display: "block",
  };

  const sectionStyle = {
    marginBottom: "30px",
  };

  const handleChange = (e, section, field) => {
    const value = e.target.value;
    setFormData((prev) => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const validateForm = () => {
    if (!formData.agreementDate) return false;
    for (const person of ["leaser", "lessee"]) {
      for (const key in formData[person]) {
        if (!formData[person][key]) return false;
      }
    }
    for (const key of ["rentPeriod", "startDate", "endDate", "monthlyRent"]) {
      if (!formData[key]) return false;
    }
    for (const key in formData.propertyDetails) {
      if (!formData.propertyDetails[key]) return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("कृपया सभी फ़ील्ड भरें। (Please fill all required fields.)");
      return;
    }
    localStorage.setItem("rentAgreementData", JSON.stringify(formData));
    router.push("/rent-agreement/preview");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0fdf4", color: "#14532d", fontFamily: "Segoe UI, Roboto, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "30px", textAlign: "center" }}>
          एकरारनामा ( किरायानामा )
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={sectionStyle}>
            <label style={labelStyle}>{fieldLabels.agreementDate}</label>
            <input type="date" value={formData.agreementDate} onChange={(e) => handleChange(e, null, "agreementDate")} style={inputStyle} />
          </div>

          {/* Leaser */}
          <div style={sectionStyle}>
            <h2>प्रथम पक्ष (लेसर)</h2>
            {Object.keys(formData.leaser).map((field) => (
              <div key={field} style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>{fieldLabels[field]}</label>
                <input type="text" value={formData.leaser[field]} onChange={(e) => handleChange(e, "leaser", field)} style={inputStyle} />
              </div>
            ))}
          </div>

          {/* Lessee */}
          <div style={sectionStyle}>
            <h2>द्वितीय पक्ष (लेसी)</h2>
            {Object.keys(formData.lessee).map((field) => (
              <div key={field} style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>{fieldLabels[field]}</label>
                <input type="text" value={formData.lessee[field]} onChange={(e) => handleChange(e, "lessee", field)} style={inputStyle} />
              </div>
            ))}
          </div>

          {/* Lease Info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", ...sectionStyle }}>
            {["rentPeriod", "startDate", "endDate", "monthlyRent"].map((field) => (
              <div key={field}>
                <label style={labelStyle}>{fieldLabels[field]}</label>
                <input type={field.includes("Date") ? "date" : "number"} value={formData[field]} onChange={(e) => handleChange(e, null, field)} style={inputStyle} />
              </div>
            ))}
          </div>

          {/* Property Details */}
          <div style={sectionStyle}>
            <h2>सम्पत्ति का विवरण</h2>
            {Object.keys(formData.propertyDetails).map((field) => (
              <div key={field} style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>{fieldLabels[field]}</label>
                <input type="text" value={formData.propertyDetails[field]} onChange={(e) => handleChange(e, "propertyDetails", field)} style={inputStyle} />
              </div>
            ))}
          </div>

          <button type="submit" style={{ marginTop: "24px", backgroundColor: "#15803d", color: "#fff", padding: "12px 24px", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
            Generate Agreement
          </button>
        </form>
      </div>
    </div>
  );
}