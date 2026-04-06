import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>

      <p className="text-gray-500 mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="px-5 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
