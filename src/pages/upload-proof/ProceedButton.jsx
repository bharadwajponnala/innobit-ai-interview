const ProceedButton = ({ disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`w-full mt-6 px-6 py-2 rounded-md text-sm font-medium ${
      disabled
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
  >
    Submit
  </button>
);

export default ProceedButton;
