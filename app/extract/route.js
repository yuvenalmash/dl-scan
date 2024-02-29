import { exec } from "child_process";
import { NextResponse } from "next/server";
import fs from "fs-extra";
import { Buffer } from "buffer";

export async function POST(request) {
  const { image } = await request.json();

  // Create a temporary file to store the image
  const tempFile = "/tmp/image.jpg";
  await fs.writeFile(tempFile, Buffer.from(image, "base64"));

  const resultPromise = new Promise((resolve, reject) => {
    exec(
      `source venv/bin/activate && python3 utils/extract.py ${tempFile}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error extracting text:", error);
          reject(error);
        }
        console.log("stdout:", stdout);
        console.log("stderr:", stderr);
        resolve(stdout);
      }
    );
  });
  const result = await resultPromise;

  // Remove the temporary file
  await fs.remove(tempFile);

  return NextResponse.json({ result });
}
