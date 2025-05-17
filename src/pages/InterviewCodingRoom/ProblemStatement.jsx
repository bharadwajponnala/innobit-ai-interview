const ProblemStatement = () => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-2">Two Sum Problem</h2>
      <p className="text-gray-700 mb-2">
        Given an array of integers nums and an integer target, return indices of
        the two numbers such that they add up to target. You may assume that
        each input would have exactly one solution, and you may not use the same
        element twice.
      </p>
      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-800 font-mono whitespace-pre-wrap">
        Example:
        <br />
        <br />
        Input: nums = [2,7,11,15], target = 9
        <br />
        Output: [0,1]
        <br />
        Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
      </div>
    </div>
  );
};

export default ProblemStatement;
