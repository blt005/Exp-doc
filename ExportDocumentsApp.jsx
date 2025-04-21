import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View } from "@react-pdf/renderer";

const ExportPDF = ({ documentType, formData }) => (
  <Document>
    <Page style={{ padding: 30 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{documentType}</Text>
      {Object.entries(formData).map(([key, value], idx) => (
        <View key={idx} style={{ marginBottom: 5 }}>
          <Text>{\`\${key}: \${value}\`}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default function ExportDocumentsApp() {
  const [documentType, setDocumentType] = useState("Invoice");
  const [formData, setFormData] = useState({
    Company: "",
    Date: "",
    Customer: "",
    Product: "",
    Quantity: "",
    Price: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Export Documents Generator</h1>

      <div className="flex gap-4 justify-center">
        {["Invoice", "Packing List", "Shipping Certificate"].map((type) => (
          <button
            key={type}
            onClick={() => setDocumentType(type)}
            className={\`px-4 py-2 rounded \${documentType === type ? "bg-blue-600 text-white" : "border"}\`}
          >
            {type}
          </button>
        ))}
      </div>

      <form className="grid grid-cols-1 gap-4">
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleInputChange}
            placeholder={field}
            className="border p-2 rounded"
          />
        ))}
      </form>

      <div className="text-center">
        <PDFDownloadLink
          document={<ExportPDF documentType={documentType} formData={formData} />}
          fileName={\`\${documentType}.pdf\`}
        >
          {({ loading }) => (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
              disabled={loading}
            >
              {loading ? "Generating PDF..." : \`Download \${documentType}\`}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
