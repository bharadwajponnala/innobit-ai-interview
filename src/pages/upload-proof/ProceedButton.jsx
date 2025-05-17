const ProceedButton = ({ disabled, loading, onClick }) => (
  <button
    disabled={disabled || loading}
    onClick={onClick}
    className={`w-full mt-6 px-6 py-2 rounded-md text-sm font-medium flex justify-center items-center gap-2 ${
      disabled || loading
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
  >
    {loading && (
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    )}
    {loading ? "Submitting..." : "Submit"}
  </button>
);

export default ProceedButton;
