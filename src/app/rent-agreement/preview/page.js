"use client";
import { useEffect, useState } from "react";

export default function RentPreview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("rentAgreementData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!data)
    return <p style={{ textAlign: "center", padding: "2rem" }}>डेटा लोड हो रहा है...</p>;

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(to bottom, #d1fae5, #ffffff);
        }

        @media print {
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }

          .no-print {
            display: none;
          }

          .page {
            width: 210mm;
            min-height: 280mm; /* Safe height */
            max-height: 280mm;
            margin: 0 auto;
            page-break-after: always;
            box-sizing: border-box;
            padding: 20mm 15mm; /* Slightly reduced */
            background: white !important;
            box-shadow: none !important;
            overflow: hidden;
          }

          .page:last-child {
            page-break-after: auto;
          }
        }

        .wrapper {
          min-height: 100vh;
          background: linear-gradient(to bottom, #d1fae5, #ffffff);
          padding: 30px 0;
        }

        .page {
          width: 210mm;
          min-height: 280mm;
          max-height: 280mm;
          margin: 20px auto;
          background: #fff;
          color: #000;
          font-family: serif;
          line-height: 1.8;
          padding: 20mm 15mm;
          box-sizing: border-box;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-radius: 8px;
          overflow: hidden;
        }

        h1.title {
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 30px;
          text-decoration: underline;
        }

        p {
          margin-bottom: 16px;
          font-size: 16px;
        }
      `}</style>

      <div className="wrapper">
        {/* Print Button */}
        <div className="no-print" style={{ textAlign: "right", maxWidth: "800px", margin: "0 auto" }}>
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: "#15803d",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              margin: "20px 0",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            🖨 Print Agreement
          </button>
        </div>

        {/* PAGE 1 */}
        <div className="page">
          <h1 className="title">एकरारनामा ( किरायानामा )</h1>

          <p>यह लीज एकरारनामा ( किरायानामा ) पत्र आज दिनांक – <strong>{data.agreementDate}</strong> को दो पक्षों के बीच इस प्रकार सम्पन्न होता है :-</p>

          <p><strong>लेसर / प्रथम पक्ष:</strong> श्रीमान/श्रीमती <strong>{data.leaser.name}</strong>, पति/पिता – <strong>{data.leaser.fatherName}</strong>, श्रेणी – <strong>{data.leaser.caste}</strong>, धर्म – <strong>{data.leaser.religion}</strong>, पेशा - ..........., निवासी ग्राम – <strong>{data.leaser.village}</strong>, पो० – ..........., थाना – <strong>{data.leaser.policeStation}</strong>, जिला – <strong>{data.leaser.district}</strong>, राज्य - झारखण्ड, भारतीय नागरिक | आधार संख्या – <strong>{data.leaser.aadhar}</strong></p>

          <p><strong>लेसी / द्वितीय पक्ष:</strong> श्रीमान/श्रीमती <strong>{data.lessee.name}</strong>, पति/पिता – <strong>{data.lessee.fatherName}</strong>, श्रेणी – <strong>{data.lessee.caste}</strong>, धर्म – <strong>{data.lessee.religion}</strong>, पेशा - ..........., निवासी ग्राम – <strong>{data.lessee.village}</strong>, पो० – ..........., थाना – <strong>{data.lessee.policeStation}</strong>, जिला – <strong>{data.lessee.district}</strong>, राज्य - झारखण्ड, भारतीय नागरिक | आधार संख्या – <strong>{data.lessee.aadhar}</strong></p>

          <p><strong>अवधि:</strong> {data.rentPeriod} महीनों के लिए जो दिनांक – <strong>{data.startDate}</strong> से प्रारम्भ होकर दिनांक – <strong>{data.endDate}</strong> तक के लिए मान्य होगी एवं दोनों पक्षों की सहमति से इस एकरारनामा को आगे बढ़ाया जा सकता है।</p>

          <p><strong>किराया:</strong> मासिक किराया - <strong>{data.monthlyRent}</strong> रूपए मात्र प्रतिमाह द्वितीय पक्ष, प्रथम पक्ष को महीने के 01 से 05 तारीख तक निश्चित रूप से भुगतान करेंगे।</p>

          <p><strong>सम्पत्ति का विवरण:</strong> मौजा - <strong>{data.propertyDetails.mouja}</strong>, खाता न० - <strong>{data.propertyDetails.khataNo}</strong>, प्लॉट न० - <strong>{data.propertyDetails.plotNo}</strong>, थाना - <strong>{data.propertyDetails.thana}</strong>, थाना न० - <strong>{data.propertyDetails.thanaNo}</strong>, एरिया - <strong>{data.propertyDetails.area}</strong> sq ft, व्यवसाय - <strong>{data.propertyDetails.businessType}</strong></p>
        </div>

        {/* PAGE 2 */}
        <div className="page">
          <p>1. यह कि उपरोक्त जगह में द्वितीय पक्ष अपना <strong>{data.propertyDetails.businessType}</strong> से सम्बंधित व्यवसाय करेंगें। विधि विरुद्ध कार्य वर्जित रहेगा।</p>
          <p>2. किराया राशि - <strong>{data.monthlyRent}</strong> प्रति माह के दर से तय और पक्का हुआ है।</p>
          <p>3. प्रथम पक्ष, द्वितीय पक्ष को दिनांक – <strong>{data.startDate}</strong> से <strong>{data.endDate}</strong> तक ग्यारह महीनों के लिए उपरोक्त वर्णित मकान किराये पर देते हैं।</p>
          <p>4. हर वर्ष 10% किराया वृद्धि होगी।</p>
          <p>5. आपसी सहमति से लीज अवधि में वृद्धि संभव है।</p>
          <p>6. बिजली बिल, सफाई कार्य द्वितीय पक्ष द्वारा किया जाएगा।</p>
          <p>7. किराया हर माह 05 तारीख तक भुगतान करना अनिवार्य होगा।</p>
          <p>8. द्वितीय पक्ष उप-मकान सबलीज पर नहीं देगा।</p>
          <p>9. रूम खाली करने से पहले एक माह पूर्व सूचना देना अनिवार्य है।</p>
          <p>10. यह एकरारनामा दोनों पक्षों के उत्तराधिकारी पर भी प्रभावी रहेगा।</p>
          <p>11. यदि मकान मालिक को द्वितीय पक्ष के व्यवहार पर संदेह हुआ तो वह रेंट रूम को खाली करवा सकता है।</p>

          <p>यह एकरारनामा दिनांक <strong>{data.agreementDate}</strong> को रांची में दोनों पक्ष पढ़कर, समझकर, स्वेच्छा से गवाहों के समक्ष हस्ताक्षर करते हैं।</p>

          <br />
          <p><strong>गवाहों के हस्ताक्षर:</strong></p>
          <p>1. ____________________________</p>
          <p>2. ____________________________</p>
          <br />
          <p><strong>प्रथम पक्ष (मकान मालिक):</strong> ____________________</p>
          <p><strong>द्वितीय पक्ष (किरायेदार):</strong> ____________________</p>
        </div>
      </div>
    </>
  );
}