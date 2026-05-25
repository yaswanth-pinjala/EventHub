import { useState, useEffect } from "react";
import API from "../services/api";
import axios from "axios";

export default function CertificateDashboard() {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await API.get("/certificates/my");

        // convert backend data to UI format
        const mapped = res.data.map((c) => ({
          id: c._id,
          event: c.eventId.title,
          module: c.eventId.type,
          date: new Date(c.generatedAt).toDateString(),
          description: `Certificate for ${c.eventId.title}`,
          fileUrl: `https://eventhub-ln9y.onrender.com/${c.certificateURL}`,
          registered: true,
        }));

        setCertificates(mapped);
      } catch (err) {
        console.error("Certificate fetch error:", err);
      }
    };

    fetchCertificates();
  }, []);

  const registeredCertificates = certificates.filter(
    (cert) => cert.registered === true,
  );

  const modules = [
    "All",
    ...new Set(registeredCertificates.map((c) => c.module)),
  ];

  const filteredCertificates = registeredCertificates.filter((cert) => {
    const matchesSearch = cert.event
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesModule =
      selectedModule === "All" || cert.module === selectedModule;

    return matchesSearch && matchesModule;
  });
  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem("token");
      //console.log("TOKEN:", token);
      const response = await axios.get(
        `https://eventhub-ln9y.onrender.com/api/certificates/download/${id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Extract filename from backend
      const contentDisposition = response.headers["content-disposition"];
      let filename = "certificate.pdf";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-20">
        <h1 className="text-xl font-semibold">Certificates </h1>
      </header>

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My Event Certificates
        </h1>

        {registeredCertificates.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-10">
            No registered events certificates found.
          </div>
        ) : (
          <>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Search event..."
                className="flex-1 px-4 py-2 rounded-lg border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="px-4 py-2 rounded-lg border"
              >
                {modules.map((module, i) => (
                  <option key={i} value={module}>
                    {module}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {cert.event}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Module:</span> {cert.module}
                  </p>

                  <p className="text-sm text-gray-500">Date: {cert.date}</p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDownload(cert.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedCert && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 text-gray-500"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold">{selectedCert.event}</h2>
              <p className="mt-2">
                <strong>Module:</strong> {selectedCert.module}
              </p>
              <p className="mt-2 text-gray-700">{selectedCert.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Date: {selectedCert.date}
              </p>

              <button
                onClick={() => handleDownload(selectedCert.id)}
                className="block w-full mt-6 bg-green-600 text-white py-2 rounded-lg"
              >
                Download Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
