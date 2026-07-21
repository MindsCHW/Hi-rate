import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineMap, MdOutlineCheckCircle, MdOutlineHourglassEmpty, MdOutlineTrendingUp, MdStarRate } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/Rating/StatCard';
import SegmentedFilters from '../components/Rating/SegmentedFilters';
import SearchBar from '../components/Rating/SearchBar';
import CompactRoadCard from '../components/Rating/CompactRoadCard';
import EmptyState from '../components/Rating/EmptyState';
import HoverPopup from '../components/Rating/HoverPopup';
import { MdKeyboardArrowDown, MdOutlineFileDownload } from 'react-icons/md';
import { dummyData } from '../data/ratingData';

const filters = [
  { id: 'all', label: 'All Roads' },
  { id: 'HO-PROCESS', label: 'HO Process' },
  { id: 'ON-GOING', label: 'On Going' },
  { id: 'SPV-RATED', label: 'SPV Rated' },
  { id: 'HO-RATED', label: 'HO Rated' },
  { id: 'NOT-RATED', label: 'Not Rated' }
];

const RatingPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
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
  }).sort((a, b) => a.roadName.localeCompare(b.roadName));

  const durationBase = 1.0;
  const durationPerVehicle = 0.05;

  const val1 = dummyData.length;
  const dur1 = val1 * durationPerVehicle + durationBase;
  const delay1 = 0;

  const val2 = dummyData.filter(d => d.status === 'HO-RATED').length;
  const dur2 = val2 * durationPerVehicle + durationBase;
  const delay2 = delay1 + dur1 + 0.15;

  const val3 = dummyData.filter(d => d.status === 'HO-PROCESS').length;
  const dur3 = val3 * durationPerVehicle + durationBase;
  const delay3 = delay2 + dur2 + 0.15;

  const val4 = dummyData.filter(d => d.status === 'SPV-RATED').length;
  const dur4 = val4 * durationPerVehicle + durationBase;
  const delay4 = delay3 + dur3 + 0.15;

  const val5 = dummyData.filter(d => d.status === 'ON-GOING').length;
  const dur5 = val5 * durationPerVehicle + durationBase;
  const delay5 = delay4 + dur4 + 0.15;

  const val6 = dummyData.filter(d => d.status === 'HO-PROCESS').length;
  const dur6 = val6 * durationPerVehicle + durationBase;
  const delay6 = delay5 + dur5 + 0.15;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <StatCard title="Total Roads" value={val1} icon={MdOutlineMap} colorClass="bg-blue-500" delay={delay1} duration={dur1} />
              <StatCard title="HO Rated" value={val2} icon={MdOutlineCheckCircle} colorClass="bg-green-500" delay={delay2} duration={dur2} />
              <StatCard title="Pending" value={val3} icon={MdOutlineHourglassEmpty} colorClass="bg-orange-500" delay={delay3} duration={dur3} />
              <StatCard title="SPV Rated" value={val4} icon={MdStarRate} colorClass="bg-indigo-500" delay={delay4} duration={dur4} />
              <StatCard title="In Progress" value={val5} icon={MdOutlineTrendingUp} colorClass="bg-purple-500" delay={delay5} duration={dur5} />
              <StatCard title="HO Process" value={val6} icon={MdOutlineHourglassEmpty} colorClass="bg-teal-500" delay={delay6} duration={dur6} />
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-md py-4 z-40 border-b border-transparent">
              <SegmentedFilters filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* High Density Cards Grid */}
            {filteredData.length > 0 ? (
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 pb-20"
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
                        onClick={(data) => navigate(`/rating/${data.roadName}`)}
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
