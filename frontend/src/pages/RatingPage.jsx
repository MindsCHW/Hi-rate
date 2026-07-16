import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineMap, MdOutlineCheckCircle, MdOutlineHourglassEmpty, MdOutlineTrendingUp } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/Rating/StatCard';
import SegmentedFilters from '../components/Rating/SegmentedFilters';
import SearchBar from '../components/Rating/SearchBar';
import CompactRoadCard from '../components/Rating/CompactRoadCard';
import HoverPopup from '../components/Rating/HoverPopup';
import EmptyState from '../components/Rating/EmptyState';

const dummyData = [
  // Page 1 matches Image 2
  { roadName: 'APEL', roadFullName: 'SPV Name : Andhra Pradesh Expressway Limited (APEL)', status: 'ON-GOING', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'DATL', roadFullName: 'SPV Name : Delhi Agra Tollway Limited (DATL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'FRHL', roadFullName: 'SPV Name : Farakka-Raiganj Highways Ltd(FRHL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'JMTPL', roadFullName: 'SPV Name : Jaipur-Mahua Tollway Private Limited (JMTPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'KETPL', roadFullName: 'SPV Name : Kanyakumari-Etturavattam Tollway Private Limited (KETPL)', status: 'ON-GOING', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'KMTPL', roadFullName: 'SPV Name : Kotwa-Muzaffarpur Tollway Private Limited (KMTPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'MBEL', roadFullName: 'SPV Name : Mahua Bharatpur Expressway Limited (MBEL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'MKTPL', roadFullName: 'SPV Name : Madurai-Kanyakumari Tollway Private Limited (MKTPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'NAM', roadFullName: 'SPV Name : N A M Expressway Limited (NAMEL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'NDEPL', roadFullName: 'SPV Name : Nelamangla Devihalli Expressway Private Limited (NDEPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  // Page 2 matches Image 1
  { roadName: 'NKTPL', roadFullName: 'SPV Name : Nanguneri-Kanyakumari Tollway Private Limited (NKTPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'SMTPL', roadFullName: 'SPV Name : Salaipudhur-Madurai Tollway Private Limited (SMTPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'WUPTL', roadFullName: 'SPV Name : Western UP Tollway Limited (WUPTL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'WVEL', roadFullName: 'SPV Name : KNR Walayar Tollways Pvt Ltd(WVEL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'KTIPL', roadFullName: 'SPV Name : KNR Tirumala Infra Private Limited(KTIPL)', status: 'HO-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'SPPL', roadFullName: 'SPV Name : KNR Shankarampet Projects Private Limited(SPPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'MSHP', roadFullName: 'SPV Name : DBL Mangalwedha Solapur Highways Private Limited(MSHP)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'MHPL', roadFullName: 'SPV Name : DBL Mangloor Highways Private Limited(MHPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'BWHPL', roadFullName: 'SPV Name : DBL Borgaon Watambare Highways Private Limited(BWHPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'GAEPL', roadFullName: 'SPV Name : Ghaziabad Aligarh Expressway Private Limited(GAEPL)', status: 'SPV-RATED', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  // Page 3 matches Image 3
  { roadName: 'SIPL', roadFullName: 'SPV Name : KNR Srirangam Infra Private Limited(SIPL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'BFHL', roadFullName: 'SPV Name : Baharampore Farakka Highways Limited(BFHL)', status: 'HO-PROCESS', dateCreated: '23-Aug-23, 2:08:02 PM', reportedBy: 'Swaraj' },
  { roadName: 'KHEPL', roadFullName: 'SPV Name : Kokhraj Handia Expressway Pvt Ltd (KHEPL)', status: 'HO-PROCESS', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' },
  { roadName: 'WMPTL', roadFullName: 'SPV Name : Western MP Infrastructure & Toll Roads Pvt Ltd (WMPTL)', status: 'HO-RATED', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' },
  { roadName: 'DHMEPL', roadFullName: 'SPV Name : Delhi Hapur Meerut Expressway Private Limited(DHMEPL)', status: 'HO-PROCESS', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' },
  { roadName: 'ADTPL', roadFullName: 'SPV Name : Devanahalli Tollway Private Limited (DTPL)', status: 'HO-PROCESS', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' },
  { roadName: 'JUHPL', roadFullName: 'SPV Name : Jammu Udhampur Highway Private limited (JUHPL)', status: 'HO-RATED', dateCreated: '07-Apr-26, 3:35:52 PM', reportedBy: 'Swaraj' }
];

const filters = [
  { id: 'all', label: 'All Roads' },
  { id: 'HO-PROCESS', label: 'HO Process' },
  { id: 'ON-GOING', label: 'On Going' },
  { id: 'SPV-RATED', label: 'SPV Rated' },
  { id: 'HO-RATED', label: 'HO Rated' },
  { id: 'NOT-RATED', label: 'Not Rated' }
];

const RatingPage = ({ activeTab, setActiveTab }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Hover state for the rich popup
  const [hoveredData, setHoveredData] = useState(null);
  const [hoverAnchorRect, setHoverAnchorRect] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleCardHover = (data, rect) => {
    // Add a slight delay so it doesn't flash when moving cursor quickly across grid
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setHoveredData(data);
      setHoverAnchorRect(rect);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleCardLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredData(null);
    setHoverAnchorRect(null);
  };

  const filteredData = dummyData.filter(road => {
    const matchesFilter = activeFilter === 'all' || road.status === activeFilter;
    const matchesSearch = road.roadName.toLowerCase().startsWith(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Spotlight Overlay */}
        <AnimatePresence>
          {hoveredData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-[#F8FAFC]/40 backdrop-blur-[3px] pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto p-8 pt-6 relative scroll-smooth">
          <div className="max-w-[1800px] mx-auto w-full">
            
            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Roads" value={dummyData.length} icon={MdOutlineMap} colorClass="bg-blue-500" delay={0} />
              <StatCard title="HO Rated" value={dummyData.filter(d => d.status === 'HO-RATED').length} icon={MdOutlineCheckCircle} colorClass="bg-amber-500" delay={1.5} />
              <StatCard title="Pending" value={dummyData.filter(d => d.status === 'HO-PROCESS').length} icon={MdOutlineHourglassEmpty} colorClass="bg-purple-500" delay={3.0} />
              <StatCard title="In Progress" value={dummyData.filter(d => d.status === 'ON-GOING').length} icon={MdOutlineTrendingUp} colorClass="bg-green-500" delay={4.5} />
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-md py-4 z-40 border-b border-transparent">
              <SegmentedFilters filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* High Density Cards Grid */}
            {filteredData.length > 0 ? (
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-20"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.02 } },
                  hidden: {}
                }}
              >
                <AnimatePresence>
                  {filteredData.map((road) => (
                    <motion.div
                      key={road.roadName}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } }
                      }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                      layout
                    >
                      <CompactRoadCard 
                        data={road} 
                        onHover={handleCardHover}
                        onLeave={handleCardLeave}
                        onClick={(data) => console.log('Navigate to', data.roadName)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <EmptyState />
            )}

          </div>
        </div>
        
        {/* Floating Hover Information Popup */}
        <HoverPopup data={hoveredData} anchorRect={hoverAnchorRect} />
        
      </div>
    </div>
  );
};

export default RatingPage;
