import React, { useRef, useState } from "react";

const VisualHarmony = () => {
  const fileInputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const handleUploadClick = () => {
    console.log("Upload Picture button clicked");
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setShowPopup(true);
    }
  };
  const closePopup = () => {
    setShowPopup(false);
    setSelectedImage(null);
  };
  return (
    <div className="relative bg-black min-h-screen text-white flex flex-col overflow-hidden">
      {/* Animated Waves Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full animate-music-waves bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-30"></div>
      </div>

      {/* Navbar Section */}
      <div className="shadow-lg bg-black flex items-center justify-between w-full py-2 px-4 border-b border-gray-700 z-10">
        {/* Left Section: Logo and Visual Harmony */}
        <div className="flex items-center gap-1">
          <img src="/image.png" alt="Logo" className="w-[60px] h-[60px]" />
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-500">
            VisualHarmony
          </div>
        </div>

        {/* Center Section: Links */}
        <div className="flex gap-8 text-lg">
          <a href="#" className="text-blue-400 hover:text-white hover:underline hover:underline-offset-4 hover:font-bold">
            Creator Insights
          </a>
          <a href="#" className="text-white hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-bold">
            User Profile
          </a>
          <a href="#" className="text-blue-400 hover:text-white hover:underline hover:underline-offset-4 hover:font-bold">
            History
          </a>
        </div>

        {/* Right Section: Buttons */}
        <div className="flex gap-4 z-10">
          <button className="px-4 py-2 text-sm border rounded-md hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-bold">
            Leaderboards
          </button>
          <button className="px-4 py-2 text-sm bg-blue-500 rounded-md hover:bg-blue-400 hover:underline hover:underline-offset-4 hover:font-bold">
            Mood Wellness Streaks
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-full max-w-6xl mt-8 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-500 animate-pulse">
          Upload Your Image
        </h1>
        <p className="text-gray-400 mt-2 font-robotoSlab text-lg animate-slide">
          Upload your image to analyze its mood and pair with music.
        </p>

        {/* Hidden File Input */}
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

        {/* Upload Button */}
        <button className="z-50 cursor-pointer mt-6 px-6 py-2 bg-blue-500 rounded-md font-semibold text-white animate-glow hover:bg-blue-400 cursor-pointer" onClick={handleUploadClick}>
          Upload Picture
        </button>

        {/* Popup Window */}
{showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[500px] flex flex-col items-center relative">
      {/* Close Button */}
      <button className="absolute top-2 right-2 text-white text-lg" onClick={closePopup}>
        &times;
      </button>
      
      {/* Centered Image */}
      <img src={selectedImage} alt="Uploaded Preview" className="w-full h-[300px] object-cover rounded-lg" />

      {/* Buttons - Side by Side */}
      <div className="mt-4 flex gap-4">
        <button className="px-6 py-2 bg-purple-500 rounded-md font-semibold text-white hover:bg-purple-400">
          Mood Analysis
        </button>
        <button className="px-6 py-2 bg-red-500 rounded-md font-semibold text-white hover:bg-red-400">
          Suggest Music
        </button>
        <button className="px-6 py-2 bg-yellow-500 rounded-md font-semibold text-black hover:bg-yellow-400">
          Suggested Captions
        </button>
      </div>
    </div>
  </div>
)}
</div>

      {/* Card Section */}
      <div className="mt-8 bg-navy-500 relative w-full max-w-6xl mx-auto flex rounded-lg shadow-subtleGradient overflow-hidden">
        {/* Text Section */}
        <div className="w-1/3 flex flex-col justify-center p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-white leading-tight">
            Unlock Your Mood Insights
          </h2>
          <p className="text-gray-400 mt-4 text-lg font-medium animate-moveLeftRight">
            Discover the emotional impact of your images and enhance your experience with music and captions tailored to your mood.
          </p>
        </div>

        {/* Line Section */}
        <div className="w-1 bg-gradient-to-b from-[#00122e] via-[#1e3a8a] to-[#00122e]"></div>

        {/* Image Section */}
        <div className="w-2/3 relative overflow-hidden">
          <img src="/music.jpg" alt="Music visualization" className="absolute top-0 left-0 w-full h-full object-cover rounded-xl opacity-80" style={{ transform: "scale(1.1)" }} />
        </div>
      </div>
    </div>
  );
};

export default VisualHarmony;
