import React from 'react';
import { MdMenu, MdAccountCircle } from 'react-icons/md';
import { FaAndroid } from 'react-icons/fa';
import logo from '../assets/editedlogo.PNG';
import logoText from '../assets/HIRATE text.PNG';

const Navbar = () => {
  return (
    <header className="h-[60px] bg-white border-b border-borderColor flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <button className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none">
          <MdMenu className="text-2xl" />
        </button>
        <div className="flex items-center gap-2">
          <img src={logo} alt="HiRATE Logo" className="w-8 h-8 object-contain" />
          <img src={logoText} alt="HiRATE" className="h-5 object-contain" />
        </div>
        <div className="ml-4">
          <select className="border border-borderColor rounded px-3 py-1 text-sm bg-white focus:outline-none focus:border-primary text-gray-700">
            <option>Choose</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-primary font-medium text-sm hover:underline">
          <FaAndroid className="text-lg" />
          Download APP
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <MdAccountCircle className="text-3xl" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
