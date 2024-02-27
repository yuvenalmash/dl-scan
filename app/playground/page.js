"use client";
// import {exec, spawn, fork} from 'child_process';

// exec example - for short-lived processes requiring less computation
// exec('ls', (err, stdout, stderr) => {
//   if (err) {
//     console.error('Error executing command:', err);
//     return;
//   }
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// });


// spawn example - for long-lived processes requiring more computation
// const child = spawn('ls', ['-lh', '/usr']);
// child.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// child.stdout.on('error', (error) => {
//   console.error(`stderr: ${error}`);
// });

// child.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });


// fork example - for long-lived processes requiring even more computation
// Requires a separate file to be run
// const child = fork('child.js');
// child.on('message', (message) => {
//   console.log('Message from child:', message);
// });

// child.send({ hello: 'world' });

// child.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

import { useEffect, useState } from "react";
import imageToBase64 from "@/utils/imageToBase64";

export default function Playground() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const image = localStorage.getItem("image");
    setImage(image);
  }, []);

  // const saveImageToFile = async (image) => {
  //   const downloadImage = document.createElement("a");
  //   downloadImage.href = image;
  //   downloadImage.download = "captured-image.jpeg";
  //   downloadImage.click();
  //   downloadImage.remove();
  // };
    // 
  const runPython = async () => {
    // const base64String = imageToBase64(image);
    const dataURL = image.toString('base64');
    const base64String = dataURL.replace("data:image/jpeg;base64,", "");
    

    try {
      const res = await fetch("/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64String }),
      });

      const { result } = await res.json();
      setResult(result);
    } catch (error) {
      console.error("Error uplaoding image:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold">Playground</h1>
      <p className="text-xl">Playground</p>
      <img
        src={image}
        alt="captured"
        className="border-2 border-[--primary-color] rounded-md"
      />
      <button onClick={runPython} className="btn">
        Run Python Code
      </button>
      {result && <p className='max-w-40' >{result}</p>}
    </div>
  );
}