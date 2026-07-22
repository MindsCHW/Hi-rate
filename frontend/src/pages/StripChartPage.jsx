import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { dummyData } from '../data/ratingData';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { MdTrendingUp, MdFilterList, MdOutlineInfo, MdClose, MdWarning, MdArrowForward } from 'react-icons/md';

const categories = [
  "Roadway",
  "Road Signage and Furniture",
  "Project Facilities",
  "Structures",
  "ATMS",
  "TMS",
  "Landscaping"
];

const categoryAssetTypes = {
  "Roadway": ["Kerb", "Drainage", "Shoulder", "Embankment", "Pavement", "Vegetation"],
  "Road Signage and Furniture": ["Pavement Markings", "Traffic Signs", "Blinkers", "Lighting", "Delineators", "Hectometer Stones", "MBCB"],
  "Project Facilities": ["Bus Bay", "Toilet Block", "Truck Lay-by"],
  "Structures": ["Major Bridge", "Minor Bridge", "Culvert", "ROB"],
  "ATMS": ["VMS", "MET", "PTZ", "AVCC", "Incident Camera"],
  "TMS": ["SWB", "WIM", "LPIC", "Traffic Lights", "UFD", "OHLS", "UI"],
  "Landscaping": ["Vegetation", "Lawn", "Trees"]
};

// Pre-seeded specific issue data for some main roads
const roadIssuesData = {
  APFI: [
    { id: 'issue-1', road: 'APFI', chainage: 12.4, title: 'Major Pothole on MCW', category: 'Roadway', severity: 'Critical', reportedBy: 'Ravi Kumar', dateReported: '2026-07-14', description: 'Deep pothole detected on the Main Carriage Way LHS. Immediate patching required to prevent vehicle damage.', images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-2', road: 'APFI', chainage: 45.8, title: 'Faded Pavement Markings', category: 'Road Signage and Furniture', severity: 'Minor', reportedBy: 'Anil Kumar', dateReported: '2026-07-15', description: 'Center line striping faded over a 500m stretch. Re-striping required for night visibility.', images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-3', road: 'APFI', chainage: 89.1, title: 'Damaged Drainage Gutter', category: 'Roadway', severity: 'Major', reportedBy: 'Priyanshu Sharma', dateReported: '2026-07-16', description: 'Side drainage concrete cracked and blocked with silt, causing water accumulation on the shoulder.', images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-4', road: 'APFI', chainage: 120.3, title: 'Damaged Speed Limit Sign', category: 'Road Signage and Furniture', severity: 'Moderate', reportedBy: 'Amit Singh', dateReported: '2026-07-18', description: 'Speed limit (80 km/h) signboard bent due to wind/accident. Needs replacement.', images: ['https://images.unsplash.com/photo-1596700779782-b7e2898dbf2e?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-5', road: 'APFI', chainage: 142.7, title: 'Vegetation Overgrowth on Shoulder', category: 'Landscaping', severity: 'Minor', reportedBy: 'Ravi Kumar', dateReported: '2026-07-19', description: 'Wild grass blocking view of the edge markers on RHS shoulder.', images: ['https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'] }
  ],
  DATI: [
    { id: 'issue-6', road: 'DATI', chainage: 8.2, title: 'Severe Rutting in Wheel Paths', category: 'Roadway', severity: 'Critical', reportedBy: 'Kiran Reddy', dateReported: '2026-07-10', description: 'Rutting depth exceeds 20mm in the left wheel path of MCW lane 1. High hydroplaning risk during rain.', images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-7', road: 'DATI', chainage: 56.4, title: 'Clogged Toll Lane Drainage', category: 'Project Facilities', severity: 'Major', reportedBy: 'Anil Kumar', dateReported: '2026-07-12', description: 'Drainage pit at Toll Plaza Lane 4 completely blocked, leading to localized flooding during storms.', images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'] },
    { id: 'issue-8', road: 'DATI', chainage: 112.9, title: 'Missing Chevron Signs at Curve', category: 'Road Signage and Furniture', severity: 'Critical', reportedBy: 'Pooja Patel', dateReported: '2026-07-14', description: 'Three chevron alignment signs missing at a sharp curve on RHS. Critical safety hazard.', images: ['https://images.unsplash.com/photo-1596700779782-b7e2898dbf2e?auto=format&fit=crop&w=800&q=80'] }
  ]
};

// Dynamic issue generator for other projects to assure automatic data updates
const getRoadIssues = (roadName) => {
  if (roadIssuesData[roadName]) return roadIssuesData[roadName];
  
  const seed = roadName.charCodeAt(0) + (roadName.charCodeAt(1) || 0);
  const categoriesList = ["Roadway", "Road Signage and Furniture", "Project Facilities", "Landscaping", "Structures", "ATMS"];
  const severities = ["Critical", "Major", "Moderate", "Minor"];
  const titles = [
    "Pavement Cracking detected",
    "Damaged Signboard near shoulder",
    "Drainage Gutter blocked",
    "Missing delineator posts",
    "Debris on Main Carriage Way",
    "Toll booth intercom malfunction",
    "Emergency telephone out of order"
  ];
  const descriptions = [
    "Localized cracking on LHS lane 2. Requires preventive sealing.",
    "Road sign bent or missing. Needs immediate inspection and replacement.",
    "Silt and debris clogging drainage path, potential water accumulation hazard.",
    "Reflective delineators missing along the sharp curve. Night hazard.",
    "Heavy debris / trash on pavement. Needs sweep patrol dispatch.",
    "Intercom system at toll lane disconnected, causing delay in ticket processing.",
    "SOS call box failed to connect to control center during diagnostic check."
  ];
  const images = [
    "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596700779782-b7e2898dbf2e?auto=format&fit=crop&w=800&q=80"
  ];

  const generated = [];
  const numIssues = 4 + (seed % 4);
  for (let i = 0; i < numIssues; i++) {
    const idx = (seed + i) % titles.length;
    const chainage = +((i + 1) * 22 + (seed % 10) + (i * 1.5)).toFixed(1);
    generated.push({
      id: `issue-gen-${roadName}-${i}`,
      road: roadName,
      chainage,
      title: titles[idx],
      category: categoriesList[(seed + i) % categoriesList.length],
      severity: severities[(seed + i) % severities.length],
      reportedBy: i % 2 === 0 ? 'Ravi Kumar' : 'Anil Kumar',
      dateReported: `2026-07-${10 + (i * 2)}`,
      description: descriptions[idx],
      images: [images[i % images.length]]
    });
  }
  return generated;
};

// Composed chart data generator
const generateMockChartData = (road, category) => {
  const seed = road.charCodeAt(0) + category.charCodeAt(0);
  const data = [];
  for (let km = 100; km <= 112; km++) {
    const cracksScore = +(3 + Math.sin(km + seed) * 1.5 + Math.cos(km * 0.5) * 0.5).toFixed(1);
    const ruttingScore = +(2.8 + Math.cos(km + seed) * 1.2 + Math.sin(km * 0.4) * 0.6).toFixed(1);
    const potholesScore = +(3.2 + Math.sin(km * 0.8 + seed) * 1.0).toFixed(1);
    
    data.push({
      chainage: `Km ${km}`,
      Cracks: Math.min(5, Math.max(1, cracksScore)),
      Rutting: Math.min(5, Math.max(1, ruttingScore)),
      Potholes: Math.min(5, Math.max(1, potholesScore))
    });
  }
  return data;
};

const severityColors = {
  Critical: { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-50 text-red-700 border-red-100', dot: '🔴' },
  Major: { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-200', badge: 'bg-orange-50 text-orange-700 border-orange-100', dot: '🟠' },
  Moderate: { bg: 'bg-yellow-500', text: 'text-yellow-700', border: 'border-yellow-200', badge: 'bg-yellow-50 text-yellow-700 border-yellow-100', dot: '🟡' },
  Minor: { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-50 text-blue-700 border-blue-100', dot: '🔵' }
};

const StripChartPage = () => {
  const [selectedRoad, setSelectedRoad] = useState(dummyData[0].roadName);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedAssetType, setSelectedAssetType] = useState(() => {
    const types = categoryAssetTypes[categories[0]] || [];
    return types[0] || '';
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  // Sync selectedAssetType when selectedCategory changes
  useEffect(() => {
    const types = categoryAssetTypes[selectedCategory] || [];
    if (types.length > 0) {
      setSelectedAssetType(types[0]);
    } else {
      setSelectedAssetType('');
    }
  }, [selectedCategory]);

  const activeRoadDetails = dummyData.find(d => d.roadName === selectedRoad);
  const chartData = generateMockChartData(selectedRoad, selectedCategory);
  
  // Retrieve issues dynamically based on selected road
  const allRoadIssues = getRoadIssues(selectedRoad);
  
  // Filter issues displayed on strip chart by category
  const filteredIssues = allRoadIssues.filter(issue => issue.category === selectedCategory);
  
  // Calculate road length dynamically based on issues or default to a reasonable max
  const maxChainage = Math.max(...allRoadIssues.map(i => i.chainage), 150);
  const roadLengthKm = Math.ceil(maxChainage + 30);

  // Close drawer if road selection changes
  useEffect(() => {
    setSelectedIssue(null);
  }, [selectedRoad]);

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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1 max-w-2xl lg:ml-6">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Road Length</span>
                  <span className="text-sm font-bold text-gray-700 mt-1.5 block">{roadLengthKm} Km</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Current Version</span>
                  <span className="text-sm font-bold text-gray-700 mt-1.5 block">v1.2.0</span>
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

          {/* Selectable Asset Types Card */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col space-y-3">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Select Asset Type</span>
              <p className="text-xs text-gray-500 mt-1">Select an asset type to inspect specific highway components and logged issues.</p>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {(categoryAssetTypes[selectedCategory] || []).map((type) => {
                const isSelected = selectedAssetType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedAssetType(type)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 duration-150 ${
                      isSelected
                        ? "bg-[#5cb85c] border-[#5cb85c] text-white"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Horizontal Strip Chart */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Horizontal Chainage Strip Chart</h3>
              <p className="text-xs text-gray-400 mt-0.5">Click on any marker to slide open the Right Drawer containing defect details and inspector image logs.</p>
            </div>

            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[960px] py-12 px-8 bg-slate-900 rounded-2xl border border-slate-800 relative flex flex-col items-center">
                
                {/* Length labels */}
                <div className="w-full flex justify-between text-xs font-bold text-gray-400 mb-6 px-1">
                  <span>Start: 0 km</span>
                  <span className="text-blue-400">Road Section: {selectedRoad}</span>
                  <span>End: {roadLengthKm} km</span>
                </div>

                {/* Road strip container */}
                <div className="w-full h-12 bg-slate-800 border-y border-slate-700 relative flex items-center rounded-sm">
                  
                  {/* Dashed highway center lane divider */}
                  <div className="w-full border-t-2 border-dashed border-yellow-500/50 absolute top-1/2 -translate-y-1/2 pointer-events-none" />
                  
                  {/* Markers plotted along relative chainage */}
                  {filteredIssues.map((issue) => {
                    const positionPercent = (issue.chainage / roadLengthKm) * 100;
                    const configColor = severityColors[issue.severity] || severityColors.Minor;

                    return (
                      <div
                        key={issue.id}
                        onClick={() => setSelectedIssue(issue)}
                        style={{ left: `${positionPercent}%` }}
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 flex flex-col items-center"
                      >
                        {/* Interactive pulsing Severity circular dot */}
                        <div className={`w-8 h-8 rounded-full ${configColor.bg} ring-4 ring-white/10 flex items-center justify-center shadow-lg transition-transform hover:scale-125 duration-200 active:scale-95 relative`}>
                          <div className={`absolute inset-0 rounded-full ${configColor.bg} animate-ping opacity-30`} />
                          <span className="text-white text-[10px] font-extrabold">{configColor.dot}</span>
                        </div>

                        {/* Tooltip on hover */}
                        <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950 text-white border border-slate-800 text-[10px] py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-30 flex flex-col items-center">
                          <span className="font-bold">{issue.title}</span>
                          <span className="text-gray-400 mt-0.5">Km {issue.chainage.toFixed(3)} • {issue.severity}</span>
                          <div className="w-2 h-2 bg-slate-950 rotate-45 absolute -bottom-1 border-r border-b border-slate-800" />
                        </div>

                        {/* Bottom label */}
                        <div className="absolute top-10 whitespace-nowrap text-center flex flex-col items-center">
                          <span className="text-[10px] font-bold text-slate-300">Km {issue.chainage}</span>
                          <span className="text-[9px] text-slate-400 truncate max-w-[100px] mt-0.5">{issue.title}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Grid ticks below road */}
                <div className="w-full flex justify-between text-[10px] text-gray-500 font-bold mt-12 px-1">
                  <span>0 Km</span>
                  <span>{Math.floor(roadLengthKm * 0.25)} Km</span>
                  <span>{Math.floor(roadLengthKm * 0.5)} Km</span>
                  <span>{Math.floor(roadLengthKm * 0.75)} Km</span>
                  <span>{roadLengthKm} Km</span>
                </div>

                {filteredIssues.length === 0 && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20">
                    <MdWarning className="text-amber-500 text-3xl mb-2" />
                    <h4 className="text-sm font-bold text-white">No Issues Logged</h4>
                    <p className="text-xs text-gray-400 mt-1">There are currently no issues reported under the category "{selectedCategory}" on road {selectedRoad}.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continuous Condition Profile Composed Chart */}
          <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Continuous Rating Condition Plot</h3>
                <p className="text-xs text-gray-400 mt-0.5">Continuous condition index (1.0 to 5.0 scale) at 1 Km intervals.</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-md">
                <MdTrendingUp />
                <span>Live Composed Feed</span>
              </div>
            </div>

            {selectedCategory === 'Roadway' ? (
              <div className="w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
                    <XAxis dataKey="chainage" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} />
                    <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />
                    
                    <Bar dataKey="Cracks" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={28} />
                    <Bar dataKey="Rutting" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
                    <Bar dataKey="Potholes" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="w-full h-[320px] flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-6 text-center">
                <MdOutlineInfo className="text-gray-400 text-3xl mb-2" />
                <h4 className="text-sm font-semibold text-gray-700">No distress metrics available</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-sm">Pavement distress rating profiles (Cracks, Rutting, Potholes) are only visualized for the Roadway asset category.</p>
              </div>
            )}
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
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Asset Group</span>
                    <span className="text-sm font-semibold text-gray-700 mt-0.5 block">{selectedIssue.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Chainage Position</span>
                    <span className="text-sm font-semibold text-gray-700 mt-0.5 block">Km {selectedIssue.chainage.toFixed(3)}</span>
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

                {/* Description */}
                <div className="pt-4 border-t border-gray-100">
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
                    alert(`Navigating rating workflow to ${selectedIssue.road} Km ${selectedIssue.chainage}...`);
                    setSelectedIssue(null);
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Resolve Issue</span>
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
