import React from 'react';
import Badge from './Badge';

const Table = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left text-textColor">
        <thead className="text-xs text-gray-500 uppercase border-b border-borderColor bg-white">
          <tr>
            <th className="px-4 py-3 font-semibold">ROAD NAME</th>
            <th className="px-4 py-3 font-semibold">ROAD FULL NAME</th>
            <th className="px-4 py-3 font-semibold text-center">STATUS</th>
            <th className="px-4 py-3 font-semibold">DATE CREATED</th>
            <th className="px-4 py-3 font-semibold">REPORT/UPDATED BY</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-[#F4F8FB]'
              }`}
            >
              <td className="px-4 py-3 font-medium text-gray-700">{row.roadName}</td>
              <td className="px-4 py-3 text-gray-600">{row.roadFullName}</td>
              <td className="px-4 py-3 text-center">
                <Badge status={row.status} />
              </td>
              <td className="px-4 py-3 text-gray-600">{row.dateCreated}</td>
              <td className="px-4 py-3 text-gray-600">{row.reportedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
