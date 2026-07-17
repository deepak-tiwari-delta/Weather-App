function ErrorMessage({ message }) {
  return (
    <div className="mt-6 bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 text-center">
      <h3 className="font-semibold">❌ Oops!</h3>

      <p className="mt-1">{message}</p>
    </div>
  );
}

export default ErrorMessage;