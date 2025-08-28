import React, { useRef, useState } from "react";
import axios from "axios";

function Doors() {
  const [file, setFile] = useState(null);
  const [doorNum, setDoorNum] = useState(null);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onDoorClick = (index) => {
    inputRefs[index].current.click();
  };

  const onFileChange = (event, index) => {
    const file1 = event.target.files[0];
    if (file1) {
      setFile(file1);
      setDoorNum(index + 1);
      console.log(`Door ${index + 1} selected file:`, file1);
    }
  };

  const handleSubmit = async () => {
    if (!file || !doorNum) {
      alert("Please select a file before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("doorNum", doorNum);

      const response = await axios.post("https://localhost:4000", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload response:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen lg:w-1/2 mx-auto px-4 flex-col lg:flex-row gap-6">
      {[0, 1, 2, 3].map((i) => (
        <section key={i} className="flex flex-col items-center">
          <div>Hello</div>
          <div>
            <button
              className="door bg-gray-300 p-4 m-2 rounded"
              onClick={() => onDoorClick(i)}
            >
              Door {i + 1}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={inputRefs[i]}
              style={{ display: "none" }}
              onChange={(e) => onFileChange(e, i)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Submit Door {i + 1} File
          </button>
        </section>
      ))}
    </div>
  );
}

export default Doors;
