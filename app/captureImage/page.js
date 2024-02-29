"use client";
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Link from "next/link";

export default function CaptureImage() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    const image = localStorage.getItem("image");
    setImage(image);
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    localStorage.setItem("image", imageSrc);
    toggleCamera();
  };

  const toggleCamera = () => {
    setCameraOn(!cameraOn);
  };

  const retake = () => {
    setImage(null);
    localStorage.removeItem("image");
    toggleCamera();
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const useSampleImage = (imageSrc) => () => {
    // Read file and convert it to Base64
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          setImage(base64data);
          localStorage.setItem("image", base64data);
        };
      });
    toggleCamera();
  }

  return (
    <div className="flex flex-col gap-8 min-h-full justufy-center items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">Capture Image</h1>
      <div className="flex flex-col gap-4">
        <p className="text-md sm:text-lg  border-l-4 border-lime-400 p-4">
          - Click on the "Capture" button to take a photo<br/>
          - Click on the "Process Image" to proceed with text extraction<br/>
        </p>
        <p className="text-md sm:text-lg border-l-4 border-lime-400 p-4">
          * Note: The image will be stored in the local storage<br/>
          * To delete the image, click on the "Retake" button<br/>
        </p>
      </div>
      {cameraOn ? (
        <div className="flex flex-col gap-4">
          <div className="border-2 border-[--primary-color] rounded-md">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-[300px] sm:w-[500px]"
            />
          </div>
          <div className="flex gap-4">
            <button onClick={capture} className="btn">
              Capture
            </button>
            <button onClick={toggleCamera} className="btn">
              Camera off
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {image && (
            <img
              src={image}
              alt="captured"
              className="border-2 border-[--primary-color] rounded-md w-[300px] sm:w-[500px]"
            />
          )}
          <div className="flex gap-4">
            <button onClick={retake} className="btn">
              {image ? "Retake" : "Start Camera"}
            </button>

            {image && (
              <Link href="/processImage">
                <button className="btn">Process Image</button>
              </Link>
            )}
          </div>
        </div>
      )}

      <hr className="border-t-2 border-lime-400 w-4/5 mt-12" />

      <p className="text-md sm:text-lg">
        Use sample image to test the text extraction
      </p>
      <div className="flex gap-4">
        <button 
          className="btn_secondary"
          onClick={useSampleImage("sample_dl/sample1.jpeg")}
        >
          Sample 1
        </button>
        <button
          className="btn_secondary"
          onClick={useSampleImage("sample_dl/sample2.jpeg")}
        >
          Sample 2
        </button>
      </div>
    </div>
  );
}
