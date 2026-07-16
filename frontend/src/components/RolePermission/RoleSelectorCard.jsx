import React from 'react';

const RoleSelectorCard = () => {
  return (
    <div className="bg-cardBg border border-borderColor rounded-lg p-6 shadow-sm mb-6">
      <div className="relative w-[300px]">
        <select defaultValue="" className="w-full h-[46px] border border-borderColor rounded-md pl-4 pr-10 text-sm font-bold text-textColor bg-white focus:outline-none focus:border-primary appearance-none cursor-pointer">
          <option value="" disabled hidden>Select Role</option>
          <option value="ho_ir">HO IR</option>
          <option value="spv_or">SPV OR</option>
          <option value="admin">Admin</option>
          <option value="contractor">Contractor</option>
          <option value="superuser">Superuser</option>
          <option value="supervisor">Supervisor</option>
          <option value="user">User</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectorCard;
