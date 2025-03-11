import React, { useRef, useState } from "react";
import axios from "axios";

const VisualHarmony = () => {
  const fileInputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [emotion, setEmotion] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setShowPopup(true);
      analyzeEmotion(file); // Call Flask server for emotion analysis
    }
  };

  const analyzeEmotion = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", formData);
      setEmotion(response.data.emotion || "Unknown");
    } catch (error) {
      console.error("Error analyzing emotion:", error);
      setEmotion("Error analyzing image");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedImage(null);
    setEmotion(""); // Clear emotion text when popup is closed
  };

  return (
    <div className="relative bg-black min-h-screen text-white flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="shadow-lg bg-black flex items-center justify-between w-full py-2 px-4 border-b border-gray-700">
        <div className="flex items-center gap-1">
          <img src="/image.png" alt="Logo" className="w-[60px] h-[60px]" />
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-500">
            VisualHarmony
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="w-full max-w-6xl mt-8 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-500">
          Upload Your Image
        </h1>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
        <button className="mt-6 px-6 py-2 bg-blue-500 rounded-md text-white" onClick={handleUploadClick}>
          Upload Picture
        </button>

        {/* Popup Window */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[500px] flex flex-col items-center relative">
              <button className="absolute top-2 right-2 text-white text-lg" onClick={closePopup}>
                &times;
              </button>
              
              <img src={selectedImage} alt="Uploaded Preview" className="w-full h-[300px] object-cover rounded-lg" />

              {/* Mood Analysis Button */}
              <div className="mt-4 flex gap-4">
                <button
                  className="px-6 py-2 bg-purple-500 rounded-md text-white"
                  onClick={() => analyzeEmotion(selectedImage)}
                >
                  Mood Analysis
                </button>
              </div>

              {/* Show Detected Emotion */}
              {emotion && (
                <div className="mt-4 text-xl font-bold text-yellow-400">
                  Detected Emotion: {emotion}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualHarmony;
