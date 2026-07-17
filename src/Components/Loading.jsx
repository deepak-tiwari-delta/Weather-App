function Loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-3 text-blue-600 font-medium">
        Loading weather...
      </p>
    </div>
  );
}

export default Loading;