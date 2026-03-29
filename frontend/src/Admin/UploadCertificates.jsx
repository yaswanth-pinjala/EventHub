import { useState } from "react";
import API from "../services/api";

const UploadCertificates = ({ eventId }) => {

  const [files, setFiles] = useState([]);

  const handleUpload = async () => {

    const data = new FormData();

    for (let file of files) {
      data.append("certificates", file);
    }

    await API.post(`/certificates/upload/${eventId}`, data);

    alert("Certificates uploaded");

  };

  return (
    <div>

      <h2>Upload Certificates</h2>

      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />

      <button onClick={handleUpload}>
        Upload
      </button>

    </div>
  );

};

export default UploadCertificates;