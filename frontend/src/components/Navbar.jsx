import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdMenu, MdAccountCircle, MdCloudDownload, MdNotifications } from 'react-icons/md';
import logo from '../assets/editedlogo.PNG';
import logoText from '../assets/HIRATE text.PNG';

import CustomDropdown from './common/CustomDropdown';

const Navbar = () => {
  const [project, setProject] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const projectOptions = [
    { label: 'ADTPL', value: 'ADTPL' },
    { label: 'APEL', value: 'APEL' },
    { label: 'BFHL', value: 'BFHL' },
    { label: 'BWHPL', value: 'BWHPL' },
    { label: 'DATL', value: 'DATL' },
    { label: 'DHMEPL', value: 'DHMEPL' },
    { label: 'FRHL', value: 'FRHL' },
    { label: 'GAEPL', value: 'GAEPL' },
    { label: 'JMTPL', value: 'JMTPL' },
    { label: 'JUHPL', value: 'JUHPL' },
    { label: 'KETPL', value: 'KETPL' },
    { label: 'KHEPL', value: 'KHEPL' },
    { label: 'KMTPL', value: 'KMTPL' },
    { label: 'KTIPL', value: 'KTIPL' },
    { label: 'MBEL', value: 'MBEL' },
    { label: 'MHPL', value: 'MHPL' },
    { label: 'MKTPL', value: 'MKTPL' },
    { label: 'MSHP', value: 'MSHP' },
    { label: 'NAM', value: 'NAM' },
    { label: 'NDEPL', value: 'NDEPL' },
    { label: 'NKTPL', value: 'NKTPL' },
    { label: 'SIPL', value: 'SIPL' },
    { label: 'SMTPL', value: 'SMTPL' },
    { label: 'SPPL', value: 'SPPL' },
    { label: 'WMPTL', value: 'WMPTL' },
    { label: 'WUPTL', value: 'WUPTL' },
    { label: 'WVEL', value: 'WVEL' },
  ];

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length >= 3 && pathParts[1] === 'rating') {
      const roadId = pathParts[2].toUpperCase();
      if (projectOptions.some(opt => opt.value === roadId)) {
        setProject(roadId);
      }
    } else {
      setProject('');
    }
  }, [location.pathname]);

  const handleProjectChange = (value) => {
    setProject(value);
    if (value) {
      navigate(`/rating/${value}`);
    }
  };

  return (
    <header className="h-[60px] bg-white border-b border-borderColor flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => window.dispatchEvent(new Event('toggle-mobile-sidebar'))}
          className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
        >
          <MdMenu className="text-2xl" />
        </button>
        <div className="flex items-center gap-2">
          <img src={logo} alt="HiRATE Logo" className="w-8 h-8 object-contain" />
          <img src={logoText} alt="HiRATE" className="h-5 object-contain" />
        </div>
        <div className="ml-4 w-[200px]">
          <CustomDropdown
            options={projectOptions}
            value={project}
            onChange={handleProjectChange}
            placeholder="Choose"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-green-800 hover:text-green-700 transition-colors" title="Notifications">
          <MdNotifications className="text-3xl" />
        </button>
        <button className="text-green-800 hover:text-green-700 transition-colors" title="Download App">
          <MdCloudDownload className="text-3xl" />
        </button>
        <button className="text-green-800 hover:text-green-700 transition-colors" title="Profile">
          <MdAccountCircle className="text-3xl" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
