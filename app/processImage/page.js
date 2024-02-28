"use client";
import { useEffect, useState } from "react";
export default function ProcessImage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const image = localStorage.getItem("image");
    setImage(image);
  }, []);

  const extractText = async () => {
    const dataURL = image.toString("base64");
    const base64String = dataURL.replace("data:image/jpeg;base64,", "");

    try {
      const response = await fetch("/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64String }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold">Process Image</h1>
      <p className="text-xl">Processing image</p>
      <img
        src={image}
        alt="captured"
        className="border-2 border-[--primary-color] rounded-md"
      />
      <button onClick={extractText} className="btn">
        Extract Text
      </button>
      <div>
        <p>Extracted text:</p>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
}
