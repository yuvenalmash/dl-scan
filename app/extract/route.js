import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { image } = await request.json();

  const resultPromise = new Promise((resolve, reject) => {
    exec(`source venv/bin/activate && python3 extract.py ${image}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error extracting text:', error);
        reject(error);
      }
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      resolve(stdout);
    })
  });
  const result = await resultPromise;

  return NextResponse.json({ result });
}