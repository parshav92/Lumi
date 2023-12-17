import React, { useState, useRef } from "react";
//10.1.30.183 /api/image
const ImageDropInput = () => {
  const [image, setImage] = useState(null);
  const [ld, setLd] = useState(false);
  const [prompt, setPrompt] = useState("");
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    setImage(null);
  };
  const url = "http://192.168.35.26:4000/api/image/";
  const handleSubmit = async () => {
    setLd(true);

    console.log("uploading");
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ image: image, prompt: prompt }),
    });
    const response = await result.json();
    console.log(response);
    if (response.result) {
      setLd(false);
    } else {
      alert("Error");
    }
  };

  return !ld ? (
    <div className="flex flex-col justify-center items-center p-5 mt-48 ">
      <div className="border-4 border-dashed border-lime-500 rounded-3xl w-4/12">
        <div className="flex flex-col items-center justify-center">
          <div
            className="flex flex-col items-center w-full h-64 p-4 cursor-pointer relative"
            onClick={handleUploadClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            {image ? (
              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  className="absolute top-0 right-0 m-2 text-white text-2xl leading-none hover:text-red-600 focus:outline-none"
                  onClick={handleRemoveClick}>
                  X
                </button>
              </>
            ) : (
              <p className="text-white mt-12 text-3xl text-center">
                Drag an image here or click to upload
              </p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center ">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            className="bg-transparent border text-white border-spacing-5 w-3/4 p-6 mb-6 border-white rounded-lg"></textarea>
          <button
            className="ml-5 text-white p-2 rounded-full border-2 border-lime-400 flex items-center justify-center focus:outline-none"
            onClick={() => handleSubmit()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className=" min-h-[40vh] w-full flex justify-center items-center text-3xl text-slate-100">
      Loading
    </div>
  );
};

export default ImageDropInput;