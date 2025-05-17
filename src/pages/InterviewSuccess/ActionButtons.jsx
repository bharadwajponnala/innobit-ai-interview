import { FaDownload, FaSignOutAlt } from "react-icons/fa";

const ActionButtons = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
        <FaDownload /> Download Interview Summary
      </button>
      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2">
        <FaSignOutAlt /> Exit Interview
      </button>
    </div>
  );
};

export default ActionButtons;
