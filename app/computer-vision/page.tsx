"use client"

import { useState } from "react";

export default function Home() {
  const [base64String, setBase64String] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        if (base64Data) setBase64String(base64Data.toString());
      };
      reader.readAsDataURL(file);
    };
  };

  const generateDescription = async() => {
    setIsLoading(true);
    const response = await fetch("http://127.0.0.1:7860/interrogator/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64String,
        clip_model_name: "ViT-L-14/openai",
        mode: "fast",
      }),
    });
    const data = await response.json();
    setDescription(data.prompt);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
    {/* Loading indicator */}
    {isLoading && <p className="py-4"> Loading... </p>}


    {/* Input field */}
    {!base64String && (
      <div className="mb-5 flex flex-col">
        <p className="font-bold"> Upload an image </p>
        <input
          className="mb-5"
          type="file"
          onChange={handleFileInputChange}
        />
      </div>
    )}

    {/* Image input button */}
    {base64String &&  (
      <>
        <div className="mb-5">
          <img src={base64String} alt="Uploaded Image" />
        </div>
      </>
    )}

    {/* Description button */}
    {!description && (
      <button
        className="bg-blue-500 w-30 p-2 text-white rounded shadow-x1 disabled:bg-blue-500/20"
        onClick={generateDescription}
        disabled={!base64String || isLoading}
      >
        Generate Description
      </button>
    )}

    {/* Display description */}
    {description && (
      <div>
        <p className="font-bold"> Description </p>
        <p> {description} </p>
      </div>
    )}


    </div>
  );
};