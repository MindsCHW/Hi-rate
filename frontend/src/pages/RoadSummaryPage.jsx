import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdClear, MdOutlineFileDownload } from 'react-icons/md';
import Pagination from '../components/Pagination';

const roadwayData = [
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Embankment', direction: 'LHS', roadType: 'MCW', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Drainage', direction: 'LHS', roadType: 'MCW', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Embankment', direction: 'LHS', roadType: 'SR', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Pavement', direction: 'LHS', roadType: 'MCW', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Shoulder', direction: 'LHS', roadType: 'MCW', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Kerb', direction: 'LHS', roadType: 'MCW', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Drainage', direction: 'LHS', roadType: 'SR', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Embankment', direction: 'LHS', roadType: 'MCW', chainage: '209.69', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Drainage', direction: 'LHS', roadType: 'MCW', chainage: '209.69', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Roadway', assetType: 'Embankment', direction: 'LHS', roadType: 'SR', chainage: '209.69', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
];

const signageData = [
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Pavement Markings', direction: 'RHS', roadType: 'MCW', chainage: '139.56', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Signages', direction: 'RHS', roadType: 'MCW', chainage: '149.65', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Pavement Markings', direction: 'RHS', roadType: 'SR', chainage: '154.41', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Pavement Markings', direction: 'RHS', roadType: 'SR', chainage: '159.21', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Signages', direction: 'RHS', roadType: 'MCW', chainage: '166.17', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Signages', direction: 'RHS', roadType: 'MCW', chainage: '168.5', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Traffic Blinkers and Signals', direction: 'RHS', roadType: 'MCW', chainage: '180.05', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Pavement Markings', direction: 'RHS', roadType: 'MCW', chainage: '180.21', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Traffic Blinkers and Signals', direction: 'LHS', roadType: 'MCW', chainage: '191.61', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Road Signage and Furniture', assetType: 'Lightings', direction: 'LHS', roadType: 'SR', chainage: '208.58', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
];

const projectFacilitiesData = [
  { status: 'x', typeOfWork: 'Maintenance', category: 'Project Facilities', assetType: 'Bus Bay', direction: 'RHS', roadType: 'MCW', chainage: '141.98', date: '09-Jul-26, 11.03.38 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Project Facilities', assetType: 'Bus Bay', direction: 'LHS', roadType: 'MCW', chainage: '142.76', date: '09-Jul-26, 11.03.36 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Project Facilities', assetType: 'Bus Bay', direction: 'LHS', roadType: 'MCW', chainage: '163.13', date: '09-Jul-26, 11.03.36 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Project Facilities', assetType: 'Bus Bay', direction: 'RHS', roadType: 'MCW', chainage: '181.86', date: '09-Jul-26, 11.03.36 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Project Facilities', assetType: 'Bus Bay', direction: 'LHS', roadType: 'MCW', chainage: '186.07', date: '09-Jul-26, 11.03.36 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Project Facilities', assetType: 'Toilet Block', direction: 'RHS', roadType: 'MCW', chainage: '202.86', date: '09-Jul-26, 11.03.36 AM', reporter: 'Ravi Kumar' },
];

const structuresData = [
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'RHS', chainage: '162.74', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'LHS', chainage: '162.74', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'RHS', chainage: '162.72', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'LHS', chainage: '162.72', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'RHS', chainage: '162.7', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'LHS', chainage: '162.7', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'RHS', chainage: '162.68', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'LHS', chainage: '162.68', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'RHS', chainage: '162.66', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', assetId: 'APEL-RA-MJB-2', category: 'Structures', assetType: 'Major Bridge', subCategory: 'Stagnation Of Rain Water', direction: 'LHS', chainage: '162.66', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
];

const atmsData = [
  { status: 'x', typeOfWork: 'Operations', category: 'ATMS', assetType: 'MET', direction: 'LHS', roadType: 'MCW', chainage: '153.51', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'ATMS', assetType: 'VMS Full', direction: 'LHS', roadType: 'MCW', chainage: '186.608', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'ATMS', assetType: 'MET', direction: 'RHS', roadType: 'MCW', chainage: '201', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
];

const tmsData = [
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'Static Weigh Bridge (SWB)', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'Weigh in Motion (WIM)', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'Automatic Vehicle Classification and Counting system (AVCC)', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'Incident Camera', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'License Plate Indicatory Camera (LPIC)', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'Operator Customized Keyboard', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'Overhead Lane Status Light (OHLS)', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'User Fare Display (UFD)', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'Operator Monitor', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Operations', category: 'TMS', laneType: 'TP-1-RHS-L6', subCategory: 'Automatic Boom Barrier', direction: 'RHS', roadType: 'MCW', chainage: '200.65', date: '09-Jul-26, 11.03.37 AM', reporter: 'Ravi Kumar' },
];

const landscapingData = [
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-1232', subCategory: 'Row', direction: 'LHS', roadType: 'MCW', chainage: '208.97', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-1232', subCategory: 'Median', direction: 'LHS', roadType: 'MCW', chainage: '208.97', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-1233', subCategory: 'Row', direction: 'RHS', roadType: 'MCW', chainage: '209.56', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-1233', subCategory: 'Median', direction: 'RHS', roadType: 'MCW', chainage: '209.56', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-1234', subCategory: 'Row', direction: 'RHS', roadType: 'MCW', chainage: '209.58', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-1234', subCategory: 'Median', direction: 'RHS', roadType: 'MCW', chainage: '209.58', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-1235', subCategory: 'Row', direction: 'LHS', roadType: 'MCW', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-1235', subCategory: 'Median', direction: 'LHS', roadType: 'MCW', chainage: '209.67', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-595', subCategory: 'Row', direction: 'LHS', roadType: 'MCW', chainage: '209.69', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
  { status: 'x', typeOfWork: 'Maintenance', category: 'Landscaping', assetType: 'APEL-Plant-595', subCategory: 'Median', direction: 'LHS', roadType: 'MCW', chainage: '209.69', date: '09-Jul-26, 11.03.39 AM', reporter: 'Ravi Kumar' },
];

const RoadSummaryPage = () => {
  const { roadId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Roadway');
  
  let currentData = roadwayData;
  let totalPages = 98;
  
  if (selectedCategory === 'Road Signage and Furniture') {
    currentData = signageData;
    totalPages = 135;
  } else if (selectedCategory === 'Project Facilities') {
    currentData = projectFacilitiesData;
    totalPages = 1;
  } else if (selectedCategory === 'Structures') {
    currentData = structuresData;
    totalPages = 123;
  } else if (selectedCategory === 'ATMS') {
    currentData = atmsData;
    totalPages = 1;
  } else if (selectedCategory === 'TMS') {
    currentData = tmsData;
    totalPages = 14;
  } else if (selectedCategory === 'Landscaping') {
    currentData = landscapingData;
    totalPages = 28;
  }
  const tabs = [
    'RATING POINTS', 'RATING SUMMARY', 'RATING VERSION HISTORY', 
    'RATING CHAINAGES', 'ROAD DETAILS', 'ROAD HISTORY'
  ];

  return (
    <div className="bg-white rounded shadow-sm border border-borderColor flex flex-col h-full overflow-hidden">
      
      {/* Top Tabs */}
      <div className="flex border-b border-borderColor overflow-x-auto shrink-0">
        {tabs.map((tab, idx) => (
          <button 
            key={idx}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              idx === 0 
                ? 'bg-primary text-white' 
                : 'text-primary hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 flex flex-col flex-1 overflow-hidden">
        {/* Filters */}
        <div className="grid grid-cols-6 gap-4 mb-6 shrink-0">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category :</label>
            <select 
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-borderColor rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary text-gray-700"
            >
              <option value="Roadway">Roadway</option>
              <option value="Road Signage and Furniture">Road Signage and Furniture</option>
              <option value="Project Facilities">Project Facilities</option>
              <option value="Structures">Structures</option>
              <option value="ATMS">ATMS</option>
              <option value="TMS">TMS</option>
              <option value="Landscaping">Landscaping</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Min Chainage :</label>
            <input type="text" placeholder="Enter Chainage" className="w-full border border-borderColor rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Max Chainage :</label>
            <input type="text" placeholder="Enter Chainage" className="w-full border border-borderColor rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-gray-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Direction :</label>
            <select className="w-full border border-borderColor rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary text-gray-400">
              <option>Choose Direction</option>
              <option>All</option>
              <option>LHS</option>
              <option>RHS</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Road Type :</label>
            <select className="w-full border border-borderColor rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary text-gray-400">
              <option>Choose Road Type</option>
              <option>All</option>
              <option>SR</option>
              <option>MCW</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Parameter Type :</label>
            <select className="w-full border border-borderColor rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary text-gray-400">
              <option>Choose</option>
              <option>Conventional</option>
              <option>Digital</option>
              <option>Both</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-end justify-center gap-6 mb-6 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <input type="checkbox" id="concerned" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor="concerned" className="text-sm font-medium text-gray-700">Concerned Items</label>
          </div>
          
          <div className="w-[120px]">
            <label className="block text-xs font-medium text-gray-700 mb-1 text-center">Version:</label>
            <select className="w-full border border-borderColor rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary text-gray-700">
              <option>38</option>
            </select>
          </div>
          
          <button className="bg-primary hover:bg-blue-700 text-white font-medium py-1.5 px-6 rounded text-sm transition-colors mb-0.5">
            Get Ratings
          </button>
          
          <button className="flex items-center gap-2 border border-primary text-primary hover:bg-blue-50 font-medium py-1.5 px-4 rounded text-sm transition-colors mb-0.5">
            <MdOutlineFileDownload className="text-lg" />
            Generate CSV
          </button>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto min-h-0 border-t border-borderColor">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white sticky top-0 border-b border-borderColor">
              <tr>
                <th className="px-4 py-3 font-medium text-center">STATUS</th>
                <th className="px-4 py-3 font-medium">TYPE OF WORK</th>
                {selectedCategory === 'Structures' && <th className="px-4 py-3 font-medium">ASSET ID</th>}
                <th className="px-4 py-3 font-medium">CATEGORY</th>
                {selectedCategory === 'TMS' ? (
                  <th className="px-4 py-3 font-medium">LANE TYPE</th>
                ) : (
                  <th className="px-4 py-3 font-medium">ASSET TYPE</th>
                )}
                {(selectedCategory === 'Structures' || selectedCategory === 'TMS' || selectedCategory === 'Landscaping') && <th className="px-4 py-3 font-medium">SUB CATEGORY</th>}
                <th className="px-4 py-3 font-medium">DIRECTION</th>
                {selectedCategory !== 'Structures' && <th className="px-4 py-3 font-medium">ROAD TYPE</th>}
                <th className="px-4 py-3 font-medium">CHAINAGE</th>
                <th className="px-4 py-3 font-medium">DATE CREATED</th>
                <th className="px-4 py-3 font-medium">REPORTED BY</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr 
                  key={index} 
                  onClick={() => navigate(`/rating/${roadId || 'roadway'}/detail/${index}`)}
                  className={`border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}`}
                >
                  <td className="px-4 py-3 text-center">
                    <MdClear className="text-red-500 text-lg mx-auto" />
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.typeOfWork}</td>
                  {selectedCategory === 'Structures' && <td className="px-4 py-3 text-gray-600">{row.assetId}</td>}
                  <td className="px-4 py-3 text-gray-600">{row.category}</td>
                  {selectedCategory === 'TMS' ? (
                    <td className="px-4 py-3 text-gray-600">{row.laneType}</td>
                  ) : (
                    <td className="px-4 py-3 text-gray-600">{row.assetType}</td>
                  )}
                  {(selectedCategory === 'Structures' || selectedCategory === 'TMS' || selectedCategory === 'Landscaping') && <td className="px-4 py-3 text-gray-600">{row.subCategory}</td>}
                  <td className="px-4 py-3 text-gray-600">{row.direction}</td>
                  {selectedCategory !== 'Structures' && <td className="px-4 py-3 text-gray-600">{row.roadType}</td>}
                  <td className="px-4 py-3 text-gray-600">{row.chainage}</td>
                  <td className="px-4 py-3 text-gray-600">{row.date}</td>
                  <td className="px-4 py-3 text-gray-600">{row.reporter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination at bottom */}
        <div className="shrink-0 pt-4 border-t border-borderColor -mx-6">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </div>
    </div>
  );
};

export default RoadSummaryPage;
