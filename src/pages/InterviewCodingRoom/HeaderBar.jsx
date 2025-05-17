const HeaderBar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b shadow-sm bg-white">
      <div className="text-xl font-semibold text-blue-700">InnobitAI</div>
      <div className="flex items-center gap-6">
        <span className="text-gray-700">00:00</span>
        <button className="text-red-600 font-medium hover:underline">
          ✖ End Interview
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
