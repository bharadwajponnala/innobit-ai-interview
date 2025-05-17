const ConsentCheckbox = ({ isChecked, onChange }) => {
  return (
    <div className="text-xs mt-4">
      <label className="flex items-start gap-2">
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        <span>
          I confirm that I am the rightful owner of the identity being used and
          accept the{" "}
          <a href="#" className="text-blue-600 underline">
            Terms & Conditions
          </a>
        </span>
      </label>
    </div>
  );
};

export default ConsentCheckbox;
