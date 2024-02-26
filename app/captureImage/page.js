"use client";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Link from "next/link";

export default function CaptureImage() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    toggleCamera();
  };

  const toggleCamera = () => {
    setCameraOn(!cameraOn);
  };

  const retake = () => {
    setImage(null);
    toggleCamera();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {cameraOn ? (
        <div className="flex flex-col gap-4">
          <div className="border-2 border-[--primary-color]">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={600}
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
              className="border-2 border-[--primary-color] rounded-md"
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
    </div>
  );
}
