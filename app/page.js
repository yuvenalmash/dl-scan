import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">Welcome to DL Scanner</h1>
      <p className="text-md sm:text-lg text-center mt-4 mb-8">
        Start scanning driving licenses with ease
      </p>
      <Link href="/captureImage" className="btn shadow-md shadow-lime-500">
        Capture Image
      </Link>
    </div>
  );
}
