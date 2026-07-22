import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { dummyData } from '../data/ratingData';
import { MdFilterList, MdOutlineInfo, MdClose, MdWarning, MdArrowForward } from 'react-icons/md';

const categories = [
  "Roadway",
  "Road Signage and Furniture",
  "Project Facilities",
  "Structures",
  "ATMS",
  "TMS",
  "Landscaping"
];

// Pre-seeded issues for main projects
const roadIssuesData = {
  APFI: [
    // Roadway Category Issues
    { id: 'issue-1', road: 'APFI', chainage: 12.4, assetType: 'Pavement', subCategory: 'Pothole', title: 'Major Pothole on MCW', category: 'Roadway', severity: 'Critical', reportedBy: 'Ravi Kumar', dateReported: '2026-07-14', description: 'Deep pothole detected on the Main Carriage Way LHS. Immediate patching required to prevent vehicle damage.', status: 'Pending', images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-2', road: 'APFI', chainage: 35.8, assetType: 'Shoulder', subCategory: 'Edge Break', title: 'Shoulder Edge Break', category: 'Roadway', severity: 'Major', reportedBy: 'Anil Kumar', dateReported: '2026-07-15', description: 'Shoulder edge damage detected. Needs gravel replenishment and compacting.', status: 'In Progress', images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-3', road: 'APFI', chainage: 82.1, assetType: 'Drainage', subCategory: 'Blocked Drain', title: 'Clogged Side Drain', category: 'Roadway', severity: 'Major', reportedBy: 'Priyanshu Sharma', dateReported: '2026-07-16', description: 'Side drainage concrete cracked and blocked with silt, causing water accumulation on the shoulder.', status: 'Pending', images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-4', road: 'APFI', chainage: 118.6, assetType: 'Kerb', subCategory: 'Broken Kerb', title: 'Broken Concrete Kerb', category: 'Roadway', severity: 'Moderate', reportedBy: 'Amit Singh', dateReported: '2026-07-18', description: 'Kerb stones damaged due to vehicle scraping near the median.', status: 'Under Review', images: ['https://images.unsplash.com/photo-1596700779782-b7e2898dbf2e?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-5', road: 'APFI', chainage: 156.2, assetType: 'Vegetation', subCategory: 'Overgrown Grass', title: 'Overgrown Median Vegetation', category: 'Roadway', severity: 'Minor', reportedBy: 'Ravi Kumar', dateReported: '2026-07-19', description: 'Wild grass blocking view of the edge markers on RHS shoulder.', status: 'Completed', images: ['https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'] },
    
    // Road Signage & Furniture Category Issues
    { id: 'issue-6', road: 'APFI', chainage: 24.5, assetType: 'Traffic Sign', subCategory: 'Damaged Signboard', title: 'Bent Speed Limit Sign', category: 'Road Signage and Furniture', severity: 'Moderate', reportedBy: 'Ravi Kumar', dateReported: '2026-07-14', description: 'Speed limit sign post bent due to wind/accident. Needs replacement.', status: 'Pending', images: ['https://images.unsplash.com/photo-1596700779782-b7e2898dbf2e?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-7', road: 'APFI', chainage: 68.2, assetType: 'Blinker', subCategory: 'Missing Reflector', title: 'Missing Solar Blinker Reflector', category: 'Road Signage and Furniture', severity: 'Major', reportedBy: 'Anil Kumar', dateReported: '2026-07-15', description: 'Solar blinker light missing reflective sheeting and batteries are exhausted.', status: 'Pending', images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-8', road: 'APFI', chainage: 109.4, assetType: 'Delineator', subCategory: 'Broken Delineator', title: 'Broken Curve Delineator Post', category: 'Road Signage and Furniture', severity: 'Minor', reportedBy: 'Anil Kumar', dateReported: '2026-07-16', description: 'Reflective delineator post snapped near the base at the highway exit.', status: 'Completed', images: ['https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-9', road: 'APFI', chainage: 152.7, assetType: 'Lighting', subCategory: 'Pole Tilted', title: 'Tilted High-Mast Light Pole', category: 'Road Signage and Furniture', severity: 'Critical', reportedBy: 'Kiran Reddy', dateReported: '2026-07-18', description: 'High mast light pole tilted slightly after storm. Immediate inspection and structural anchoring required.', status: 'Pending', images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'] }
  ],
  DATI: [
    { id: 'issue-10', road: 'DATI', chainage: 8.2, assetType: 'Pavement', subCategory: 'Severe Rutting', title: 'Severe Rutting in Wheel Paths', category: 'Roadway', severity: 'Critical', reportedBy: 'Kiran Reddy', dateReported: '2026-07-10', description: 'Rutting depth exceeds 20mm in the left wheel path of MCW lane 1. High hydroplaning risk.', status: 'Pending', images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-11', road: 'DATI', chainage: 56.4, assetType: 'Project Facilities', subCategory: 'Clogged Toll Lane Drainage', title: 'Clogged Toll Plaza Lane 4 Drainage', category: 'Project Facilities', severity: 'Major', reportedBy: 'Anil Kumar', dateReported: '2026-07-12', description: 'Drainage pit at Toll Plaza Lane 4 completely blocked, leading to localized flooding during storms.', status: 'In Progress', images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-12', road: 'DATI', chainage: 112.9, assetType: 'Road Signage and Furniture', subCategory: 'Missing Chevron Signs', title: 'Missing Chevron Curve Signs', category: 'Road Signage and Furniture', severity: 'Critical', reportedBy: 'Pooja Patel', dateReported: '2026-07-14', description: 'Three chevron alignment signs missing at a sharp curve on RHS. Critical safety hazard.', status: 'Pending', images: ['https://images.unsplash.com/photo-1596700779782-b7e2898dbf2e?auto=format&fit=crop&w=800&q=80'] }
  ]
};

// Seed-based dynamic generator for other road sections
const getRoadIssues = (roadName) => {
  if (roadIssuesData[roadName]) return roadIssuesData[roadName];
  
  const seed = roadName.charCodeAt(0) + (roadName.charCodeAt(1) || 0);
  const categoriesList = ["Roadway", "Road Signage and Furniture", "Project Facilities", "Landscaping", "Structures", "ATMS", "TMS"];
  
  const assetTypesMap = {
    "Roadway": ["Pavement", "Shoulder", "Drainage", "Kerb", "Vegetation"],
    "Road Signage and Furniture": ["Traffic Sign", "Blinker", "Delineator", "Lighting", "MBCB"],
    "Project Facilities": ["Bus Bay", "Toilet Block", "Truck Lay-by"],
    "Structures": ["Major Bridge", "Minor Bridge", "Culvert"],
    "ATMS": ["VMS", "MET", "PTZ"],
    "TMS": ["SWB", "WIM", "LPIC"],
    "Landscaping": ["Vegetation", "Lawn"]
  };
  
  const subCategoriesMap = {
    "Pavement": ["Pothole", "Rutting", "Cracks"],
    "Shoulder": ["Edge Break", "Erosion"],
    "Drainage": ["Blocked Drain", "Siltation"],
    "Kerb": ["Broken Kerb", "Disalignment"],
    "Vegetation": ["Overgrown Grass", "Branch Obstruction"],
    "Traffic Sign": ["Damaged Signboard", "Faded Reflector"],
    "Blinker": ["Missing Reflector", "Power Failure"],
    "Delineator": ["Broken Delineator", "Missing Post"],
    "Lighting": ["Pole Tilted", "Bulb Blown"],
    "MBCB": ["Damaged Guardrail", "Loose Bolts"]
  };

  const severities = ["Critical", "Major", "Moderate", "Minor"];
  const images = [
    "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596700779782-b7e2898dbf2e?auto=format&fit=crop&w=800&q=80"
  ];

  const generated = [];
  const numIssues = 4 + (seed % 4);
  for (let i = 0; i < numIssues; i++) {
    const category = categoriesList[(seed + i) % categoriesList.length];
    const assetTypeList = assetTypesMap[category] || ["Pavement"];
    const assetType = assetTypeList[(seed + i) % assetTypeList.length];
    const subCategoryList = subCategoriesMap[assetType] || ["Routine Defect"];
    const subCategory = subCategoryList[(seed + i) % subCategoryList.length];
    const chainage = +((i + 1) * 20 + (seed % 10) + (i * 1.5)).toFixed(1);
    
    generated.push({
      id: `issue-gen-${roadName}-${i}`,
      road: roadName,
      chainage,
      assetType,
      subCategory,
      title: `${assetType} ${subCategory}`,
      category,
      severity: severities[(seed + i) % severities.length],
      reportedBy: i % 2 === 0 ? 'Ravi Kumar' : 'Anil Kumar',
      dateReported: `2026-07-${10 + (i * 2)}`,
      description: `${assetType} has a ${subCategory} defect detected. Needs repair.`,
      status: i % 3 === 0 ? 'Pending' : i % 3 === 1 ? 'In Progress' : 'Completed',
      images: [images[i % images.length]]
    });
  }
  return generated;
};



// Color mapping based on severity
const severityColors = {
  Critical: { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-50 text-red-700 border-red-100' },
  Major: { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-200', badge: 'bg-orange-50 text-orange-700 border-orange-100' },
  Moderate: { bg: 'bg-yellow-500', text: 'text-yellow-700', border: 'border-yellow-200', badge: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  Minor: { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-50 text-blue-700 border-blue-100' }
};

// Dynamic symbol assigner based on Asset Type
const getAssetSymbol = (assetType) => {
  const type = (assetType || '').toLowerCase();
  if (type.includes('pavement') || type.includes('delineator') || type.includes('bridge') || type.includes('vms') || type.includes('swb') || type.includes('bay')) {
    return '■'; // Square
  }
  if (type.includes('shoulder') || type.includes('sign') || type.includes('lay-by') || type.includes('culvert') || type.includes('met') || type.includes('wim')) {
    return '▲'; // Triangle
  }
  if (type.includes('drain') || type.includes('blinker') || type.includes('guardrail') || type.includes('mbcb') || type.includes('rob') || type.includes('avcc') || type.includes('lights')) {
    return '◆'; // Diamond
  }
  return '●'; // Circle (default)
};

// Dynamic background color mapping based on Asset Type
const getAssetColor = (assetType) => {
  const type = (assetType || '').toLowerCase();
  if (type.includes('pavement')) return 'bg-blue-500 ring-blue-400';
  if (type.includes('shoulder')) return 'bg-emerald-500 ring-emerald-400';
  if (type.includes('drain')) return 'bg-amber-500 ring-amber-400';
  if (type.includes('kerb')) return 'bg-purple-500 ring-purple-400';
  if (type.includes('vegetation') || type.includes('lawn')) return 'bg-green-500 ring-green-400';
  if (type.includes('sign')) return 'bg-red-500 ring-red-400';
  if (type.includes('blinker')) return 'bg-orange-500 ring-orange-400';
  if (type.includes('delineator')) return 'bg-sky-500 ring-sky-400';
  if (type.includes('light')) return 'bg-yellow-500 ring-yellow-400';
  return 'bg-pink-500 ring-pink-400';
};

const StripChartPage = () => {
  const navigate = useNavigate();
  const [selectedRoad, setSelectedRoad] = useState(dummyData[0].roadName);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  
  // Segmented chainage navigation state (configurable default 20 Km)
  const SEGMENT_SIZE = 20;
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  const activeRoadDetails = dummyData.find(d => d.roadName === selectedRoad);

  // Retrieve issues dynamically based on selected road
  const allRoadIssues = getRoadIssues(selectedRoad);
  
  // Filter issues displayed on strip chart by category only
  const filteredIssues = allRoadIssues.filter(issue => issue.category === selectedCategory);
  
  // Calculate road length dynamically based on issues or default to a reasonable max
  const maxChainage = Math.max(...allRoadIssues.map(i => i.chainage), 150);
  const roadLengthKm = Math.ceil(maxChainage + 30);

  // Derived segmented chainage variables
  const startKm = currentSegmentIndex * SEGMENT_SIZE;
  const endKm = Math.min(roadLengthKm, (currentSegmentIndex + 1) * SEGMENT_SIZE);
  const totalSegments = Math.ceil(roadLengthKm / SEGMENT_SIZE) || 1;
  const segmentIssues = filteredIssues.filter(issue => issue.chainage >= startKm && issue.chainage <= endKm);

  // Calculate segment ticks dynamically (5 ticks per range)
  const ticks = [];
  const tickCount = 5;
  for (let i = 0; i < tickCount; i++) {
    const tickVal = startKm + (i * (endKm - startKm)) / (tickCount - 1);
    ticks.push(+(tickVal.toFixed(1)));
  }

  const totalIssuesCount = filteredIssues.length;
  const criticalIssuesCount = filteredIssues.filter(i => i.severity === 'Critical').length;
  const noIssuesCount = Math.max(0, roadLengthKm - totalIssuesCount);

  // Close drawer and reset segment index if road or category changes
  useEffect(() => {
    setSelectedIssue(null);
    setCurrentSegmentIndex(0);
  }, [selectedRoad, selectedCategory]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 relative">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-6 custom-scrollbar">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a]">Linear Strip Chart Analysis</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor asset conditions, pavement index, and overall rating plotted continuously over highway chainage segments.</p>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100 shadow-sm self-start md:self-auto">
              <MdOutlineInfo className="text-sm shrink-0" />
              <span>Interactive Plotting & Image Preview Drawer Active</span>
            </div>
          </div>

          {/* Control bar */}
          <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-400 shrink-0">
              <MdFilterList className="text-lg" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Filters</span>
            </div>
            
            <div className="w-full sm:w-[220px]">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Select Road / Project</label>
              <select
                value={selectedRoad}
                onChange={(e) => setSelectedRoad(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-white focus:outline-none focus:border-green-500 cursor-pointer"
              >
                {dummyData.map(road => (
                  <option key={road.roadName} value={road.roadName}>
                    {road.roadName} – {road.roadFullName.replace(/^SPV Name\s*:\s*/i, '')}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-[220px]">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Select Asset Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-white focus:outline-none focus:border-green-500 cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {activeRoadDetails && (
              <div className="ml-auto flex items-center gap-4 self-start sm:self-auto bg-green-50/50 border border-green-100 rounded-lg px-4 py-2 text-xs font-medium text-green-700">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block font-bold leading-normal">Road Status</span>
                  <span className="font-bold">{activeRoadDetails.status}</span>
                </div>
                <div className="border-l border-green-200/60 pl-4">
                  <span className="text-[10px] text-gray-400 uppercase block font-bold leading-normal">Created On</span>
                  <span>{activeRoadDetails.dateCreated.split(',')[0]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Road Information Card */}
          {activeRoadDetails && (
            <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <h2 className="text-xl font-bold text-gray-900">{selectedRoad} Details</h2>
                </div>
                <p className="text-xs font-semibold text-gray-700">
                  <span className="text-gray-400 font-medium">SPV:</span> {activeRoadDetails.roadFullName.replace(/^SPV Name\s*:\s*/i, '').trim()}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 flex-1 max-w-xl lg:ml-6">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Road Length</span>
                  <span className="text-sm font-bold text-gray-700 mt-1.5 block">{roadLengthKm} Km</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">HO Status</span>
                  <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md border mt-1 block w-fit ${
                    activeRoadDetails.status === 'HO-PROCESS' 
                      ? 'bg-blue-50 text-blue-700 border-blue-100' 
                      : activeRoadDetails.status === 'HO-RATED'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      : 'bg-purple-50 text-purple-700 border-purple-100'
                  }`}>
                    {activeRoadDetails.status}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Created Date</span>
                  <span className="text-sm font-semibold text-gray-600 mt-1.5 block">{activeRoadDetails.dateCreated.split(',')[0]}</span>
                </div>
              </div>

              <div className="w-full lg:w-fit flex flex-col border-t lg:border-t-0 lg:border-l border-gray-150 pt-4 lg:pt-0 lg:pl-6 shrink-0">
                <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-1.5">
                  <span>Inspection Progress</span>
                  <span className="text-green-600">{60 + (selectedRoad.charCodeAt(0) % 35)}%</span>
                </div>
                <div className="w-full lg:w-48 h-2.5 bg-gray-150 border border-gray-200/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500" 
                    style={{ width: `${60 + (selectedRoad.charCodeAt(0) % 35)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Interactive Horizontal Strip Chart */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Horizontal Chainage Strip Chart</h3>
                <p className="text-xs text-gray-400 mt-0.5">Defect markers are plotted dynamically along the project timeline relative to their chainage.</p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold text-gray-700 self-start sm:self-auto shrink-0 select-none">
                <button
                  disabled={currentSegmentIndex === 0}
                  onClick={() => setCurrentSegmentIndex(prev => prev - 1)}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-gray-100 border border-gray-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                >
                  Previous
                </button>
                
                {currentSegmentIndex >= totalSegments - 1 && (
                  <span className="text-red-500 font-extrabold text-[10px] uppercase tracking-wider px-2 border-x border-red-200/50 animate-pulse">
                    End of Road Reached
                  </span>
                )}

                <button
                  disabled={currentSegmentIndex >= totalSegments - 1}
                  onClick={() => setCurrentSegmentIndex(prev => prev + 1)}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-gray-100 border border-gray-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[960px] py-14 px-8 bg-slate-900 rounded-2xl border border-slate-800 relative flex flex-col items-center">
                
                {/* Length labels */}
                <div className="w-full flex justify-between text-xs font-bold text-gray-400 mb-6 px-1">
                  <div>
                    <span className="text-gray-500 font-bold mr-1">Viewing Chainage:</span>
                    <span className="text-green-400">{startKm} Km – {endKm} Km</span>
                  </div>
                  <span className="text-blue-400">Road Project: {selectedRoad} ({selectedCategory})</span>
                  <div>
                    <span className="text-gray-500 font-bold mr-1">Road Length:</span>
                    <span className="text-gray-300">{roadLengthKm} Km</span>
                  </div>
                </div>

                {/* Road strip container */}
                <div className="w-full h-12 bg-slate-800 border-y border-slate-700 relative flex items-center rounded-sm overflow-hidden">
                  
                  {/* Dashed highway center lane divider */}
                  <div className="w-full border-t-2 border-dashed border-yellow-500/50 absolute top-1/2 -translate-y-1/2 pointer-events-none" />
                  
                  {/* Markers plotted along relative chainage with horizontal slide transition */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSegmentIndex}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute inset-0 flex items-center"
                    >
                      {segmentIssues.map((issue) => {
                        const range = endKm - startKm || 1;
                        const positionPercent = ((issue.chainage - startKm) / range) * 100;
                        const configColor = getAssetColor(issue.assetType);
                        const markerSymbol = getAssetSymbol(issue.assetType);

                        return (
                          <div
                            key={issue.id}
                            onClick={() => setSelectedIssue(issue)}
                            style={{ left: `${positionPercent}%` }}
                            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 flex flex-col items-center"
                          >
                            {/* Interactive pulsing circular/shaped dot */}
                            <div className={`w-8 h-8 rounded-lg ${configColor} ring-4 ring-white/10 flex items-center justify-center shadow-lg transition-transform hover:scale-125 duration-200 active:scale-95 relative`}>
                              <div className={`absolute inset-0 rounded-lg ${configColor} animate-ping opacity-30`} />
                              <span className="text-white text-sm font-extrabold">{markerSymbol}</span>
                            </div>

                            {/* Tooltip on hover */}
                            <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950 text-white border border-slate-800 text-[10px] py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-30 flex flex-col items-center">
                              <span className="font-bold">{issue.title}</span>
                              <span className="text-gray-400 mt-0.5">Km {issue.chainage.toFixed(3)} • {issue.severity}</span>
                              <div className="w-2 h-2 bg-slate-950 rotate-45 absolute -bottom-1 border-r border-b border-slate-800" />
                            </div>

                            {/* Bottom label displaying dynamic issue specs inline */}
                            <div className="absolute top-10 whitespace-nowrap text-center flex flex-col items-center leading-normal">
                              <span className="text-[10px] font-extrabold text-slate-300">Km {issue.chainage}</span>
                              <span className="text-[9px] font-bold text-slate-400 mt-0.5">{issue.assetType}</span>
                              <span className="text-[8px] font-medium text-slate-500 truncate max-w-[110px]">{issue.subCategory}</span>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Grid ticks below road */}
                <div className="w-full flex justify-between text-[10px] text-gray-500 font-bold mt-12 px-1">
                  {ticks.map((t, idx) => (
                    <span key={idx}>{t} Km</span>
                  ))}
                </div>

                {filteredIssues.length === 0 && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20">
                    <MdWarning className="text-emerald-500 text-4xl mb-2.5 animate-bounce" />
                    <h4 className="text-base font-bold text-white">No Issues Found</h4>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm">
                      There are currently no recorded issues for the selected Project and Category.
                    </p>
                    <span className="mt-3.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold rounded-full">
                      Road Status : Healthy
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Issue Summary Section */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col space-y-5">
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Issue Summary</h3>
              <p className="text-xs text-gray-400 mt-0.5">Quick overview of all recorded issues for the selected Project and Category.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Total Issues */}
              <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Issues</span>
                <span className="text-2xl font-extrabold text-slate-800 mt-2">{totalIssuesCount}</span>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-slate-200/20 rounded-full animate-pulse" />
              </div>

              {/* Critical Issues */}
              <div className="bg-red-50/40 border border-red-100 rounded-2xl p-4 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Critical Issues</span>
                <span className="text-2xl font-extrabold text-red-600 mt-2">{criticalIssuesCount}</span>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-red-200/20 rounded-full" />
              </div>

              {/* No Issues */}
              <div className="bg-green-50/40 border border-green-100 rounded-2xl p-4 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">No Issues</span>
                <span className="text-2xl font-extrabold text-green-600 mt-2">{noIssuesCount}</span>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-200/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Right-Side Preview Drawer */}
      <AnimatePresence>
        {selectedIssue && (
          <>
            {/* Dark backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIssue(null)}
              className="fixed inset-0 bg-black z-[90] cursor-pointer"
            />

            {/* Slide over container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed right-0 top-0 h-full w-full sm:w-[450px] md:w-[480px] bg-white border-l border-gray-200 shadow-2xl z-[100] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-150 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border uppercase tracking-wider ${severityColors[selectedIssue.severity]?.badge}`}>
                    {selectedIssue.severity} Issue
                  </span>
                  <span className="text-xs text-gray-400 font-bold">
                    Km {selectedIssue.chainage.toFixed(3)}
                  </span>
                </div>
                
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar text-textColor">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block leading-normal">{selectedIssue.category}</span>
                  <h2 className="text-lg font-bold text-gray-900 mt-1 leading-normal">{selectedIssue.title}</h2>
                </div>

                {/* Image gallery */}
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block leading-normal">Photographic Logs</span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedIssue.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className="aspect-video bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-zoom-in group relative"
                      >
                        <img src={img} alt={`defect-${idx}`} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200" />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                          Click to View
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details layout Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Asset Type</span>
                    <span className="text-sm font-semibold text-gray-700 mt-0.5 block">{selectedIssue.assetType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Sub Category</span>
                    <span className="text-sm font-semibold text-gray-700 mt-0.5 block">{selectedIssue.subCategory}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Chainage Position</span>
                    <span className="text-sm font-semibold text-gray-700 mt-0.5 block">Km {selectedIssue.chainage.toFixed(3)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Status</span>
                    <span className="text-sm font-semibold text-gray-700 mt-0.5 block">{selectedIssue.status}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Reported By</span>
                    <span className="text-sm font-semibold text-gray-700 mt-0.5 block">{selectedIssue.reportedBy}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Date Logged</span>
                    <span className="text-sm font-semibold text-gray-700 mt-0.5 block">
                      {new Date(selectedIssue.dateReported).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Remarks/Description */}
                <div className="pt-4 border-t border-gray-150">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Inspector Remarks</span>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200/50">
                    {selectedIssue.description}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-6 border-t border-gray-150 shrink-0 bg-gray-50 rounded-b-2xl flex gap-3">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="flex-1 py-2.5 border border-gray-300 hover:bg-gray-100 rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Close Drawer
                </button>
                <button
                  onClick={() => {
                    // Navigate to existing Rating workflow for this project
                    navigate(`/?project=${selectedRoad}`);
                    setSelectedIssue(null);
                  }}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 animate-pulse"
                >
                  <span>Open Rating</span>
                  <MdArrowForward className="text-sm" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full screen Photographic Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-sm">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center shadow-lg transition-colors border border-white/15"
            >
              <MdClose className="text-2xl" />
            </button>
            <img src={activeImage} alt="defect-lightbox" className="max-w-[90%] max-h-[85%] object-contain rounded-xl shadow-2xl border border-white/10" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StripChartPage;
