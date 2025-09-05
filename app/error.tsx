'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-white text-opacity-80 mb-6">
          We encountered an error while loading your rights information. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-lg text-white font-medium transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
