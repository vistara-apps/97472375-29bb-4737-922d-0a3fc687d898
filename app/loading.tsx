export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Loading your rights...</p>
      </div>
    </div>
  );
}
