import React from 'react';
import PermissionCell from './PermissionCell';

const PermissionRow = ({ type }) => {
  return (
    <tr className="bg-white hover:bg-gray-50 transition-colors border-b border-borderColor group h-[68px]">
      <td className="p-4 border-r border-borderColor text-center align-middle font-bold text-[15px] text-textColor uppercase">
        {type}
      </td>
      {/* ADMIN cells */}
      <PermissionCell />
      <PermissionCell />
      <PermissionCell />
      <PermissionCell />
      {/* APP cells */}
      <PermissionCell />
      <PermissionCell />
      <PermissionCell />
      <PermissionCell />
    </tr>
  );
};

export default PermissionRow;
