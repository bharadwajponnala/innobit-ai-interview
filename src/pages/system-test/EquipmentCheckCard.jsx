import React from "react";

const EquipmentCheckCard = ({
  title,
  icon,
  options,
  selectedOption,
  onOptionChange,
  buttonLabel,
  onButtonClick,
  previewIcon,
}) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
      <div className="flex items-center mb-4 text-blue-600 font-semibold text-lg">
        {icon}
        <span className="ml-2">{title}</span>
      </div>

      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mb-4 text-4xl">
        {previewIcon}
      </div>

      <select
        value={selectedOption}
        onChange={onOptionChange}
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      >
        <option value="">Select {title.split(" ")[0]}</option>
        {options.map((option, idx) => (
          <option key={option.deviceId || idx} value={option.deviceId}>
            {option.label || `Device ${idx + 1}`}
          </option>
        ))}
      </select>

      <button
        onClick={onButtonClick}
        className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-2 rounded-md"
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default EquipmentCheckCard;
