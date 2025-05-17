const CodeEditor = () => {
  return (
    <div className="bg-[#1e1e1e] text-white rounded-md overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-[#2e2e2e]">
        <div className="flex gap-2 text-sm">
          <span className="bg-gray-700 px-3 py-1 rounded text-white">
            Python
          </span>
          <span className="text-gray-400">Auto-saving...</span>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm flex items-center gap-1">
          🚀 Submit Solution
        </button>
      </div>
      <textarea
        className="w-full h-[300px] p-4 font-mono bg-[#1e1e1e] resize-none outline-none"
        defaultValue={`def twoSum(nums, target):\n    # Write your solution here\n    pass`}
      />
    </div>
  );
};

export default CodeEditor;
