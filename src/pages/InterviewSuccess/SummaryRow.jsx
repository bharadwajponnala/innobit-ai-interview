const SummaryRow = ({ icon, label, value, date }) => (
  <div className="flex items-start justify-between text-sm py-2 border-b last:border-b-0">
    <div className="flex items-start gap-2 text-gray-700">
      {icon}
      <div>
        <p className="font-medium">{label}</p>
        {value && <p className="text-xs text-gray-500">{value}</p>}
      </div>
    </div>
    {date && <p className="text-xs text-blue-500">{date}</p>}
  </div>
);

export default SummaryRow;
