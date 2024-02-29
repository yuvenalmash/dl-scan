"use client";
import { useEffect, useState } from "react";

export default function ProcessImage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(null);
  const [dlIssuance, setDlIssuance] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  useEffect(() => {
    const image = localStorage.getItem("image");
    setImage(image);
  }, []);

  const extractText = async () => {
    const dataURL = image.toString("base64");
    const base64String = dataURL.replace("data:image/jpeg;base64,", "");

    try {
      setIsLoading(true);
      const response = await fetch("/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64String }),
      });
      const data = await response.json();
      setResult(data.result);
      parseResult();
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const parseResult = () => {
    if (!result) return;
    const values = result.split(" ");
    setName(values[0] + " " + values[1]);
    setDlIssuance(values[2]);
    setExpirationDate(values[3]);
  };

  // update table with parsed values
  useEffect(() => {
    parseResult();
  }, [result]);

  return (
    <div className="flex flex-col gap-8 min-h-full justify-center items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">Process Image</h1>
      <p className="text-md sm:text-lg border-l-4 border-lime-400 p-4">
        - Click on the "Extract Text" button to proceed<br />
        - Extracted information will be displayed below
      </p>
      <div className="flex flex-col gap-4">
        <img
          src={image}
          alt="captured"
          className="border-2 border-[--primary-color] rounded-md w-[300px] sm:w-[500px]"
        />
        <button onClick={extractText} className="btn w-fit">
          {isLoading ? <div className="spinner" /> : "Extract Text"}
        </button>
      </div>

      <hr className="border-t-2 border-lime-400 w-4/5 mt-12" />

      <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className="text-2xl font-bold text-center">
          Extracted Information
        </h2>
        <table className="table-auto border border-collapse border-lime-400">
          <thead>
            <tr>
              <th className="px-4 py-2">Field</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-800">
              <td className="px-4 py-2">Name</td>
              <td className="px-4 py-2">{name}</td>
            </tr>
            <tr>
              <td className="px-4 py-2">DL Issuance</td>
              <td className="px-4 py-2">{dlIssuance}</td>
            </tr>
            <tr className="bg-slate-800">
              <td className="px-4 py-2">Expiration Date</td>
              <td className="px-4 py-2">{expirationDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
