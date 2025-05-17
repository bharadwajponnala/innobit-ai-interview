const ChecklistItem = ({
  id,
  icon,
  title,
  description,
  checkboxStates,
  setCheckboxStates,
}) => {
  const handleChange = () => {
    setCheckboxStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm">
      <input
        type="checkbox"
        className="mt-1 w-5 h-5"
        checked={checkboxStates[id]}
        onChange={handleChange}
      />
      <div className="flex items-start space-x-3">
        <div className="text-blue-600 mt-0.5">{icon}</div>
        <div>
          <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ChecklistItem;
