import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ImageCarousel from '../components/Rating/ImageCarousel';

// Using a placeholder image since we can't extract the uploaded image directly.
// You can replace this URL with the actual path to your image when you have it.
const imgUrl = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const RatingDetailPage = () => {
  const location = useLocation();
  const rowData = location.state || {};

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded shadow-sm border border-borderColor p-6 flex flex-col min-h-full overflow-y-auto">
      {/* Header Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-2">
        <div className="border border-borderColor p-3 rounded bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Category</div>
          <div className="font-medium text-gray-800">{rowData.category || 'N/A'}</div>
        </div>
        <div className="border border-borderColor p-3 rounded bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Asset type</div>
          <div className="font-medium text-gray-800">{rowData.assetType || 'N/A'}</div>
        </div>
        <div className="border border-borderColor p-3 rounded bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Direction</div>
          <div className="font-medium text-gray-800">{rowData.direction || 'N/A'}</div>
        </div>
        <div className="border border-borderColor p-3 rounded bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Road Type</div>
          <div className="font-medium text-gray-800">{rowData.roadType || 'N/A'}</div>
        </div>
        <div className="border border-borderColor p-3 rounded bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Placement</div>
          <div className="font-medium text-gray-800">Shoulder</div>
        </div>
        <div className="border border-borderColor p-3 rounded bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Chainage</div>
          <div className="font-medium text-gray-800">{rowData.chainage || 'N/A'}</div>
        </div>
      </div>

      {/* Images Carousel - Moved Above Rating Parameters */}
      <ImageCarousel images={[imgUrl, imgUrl, imgUrl]} />

      <h2 className="text-lg font-medium text-center mb-2 mt-0 border-b pb-1 text-gray-800">Rating Parameters</h2>

      {/* Parameters Row */}
      <div className="flex flex-col md:flex-row gap-6 w-full mb-0">
        {/* Block 1: Cracks */}
        <div className="flex flex-col border border-borderColor p-4 rounded bg-gray-50/30 shadow-sm flex-1">
          <h3 className="font-medium text-lg mb-4 text-gray-800">Cracks</h3>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="cracks" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">0</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="cracks" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">0.5</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="cracks" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">10</span>
            </label>
          </div>
          <div className="mt-auto">
            <input type="text" placeholder="Remark" className="w-full border border-borderColor rounded px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        {/* Block 2: Rutting */}
        <div className="flex flex-col border border-borderColor p-4 rounded bg-gray-50/30 shadow-sm flex-1">
          <h3 className="font-medium text-lg mb-4 text-gray-800">Rutting</h3>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="rutting" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">0</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="rutting" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">0.5</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="rutting" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">10</span>
            </label>
          </div>
          <div className="mt-auto">
            <input type="text" placeholder="Remark" className="w-full border border-borderColor rounded px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        {/* Block 3: Pothole */}
        <div className="flex flex-col border border-borderColor p-4 rounded bg-gray-50/30 shadow-sm flex-1">
          <h3 className="font-medium text-lg mb-4 text-gray-800">Pothole</h3>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="pothole" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">0</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="pothole" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">5</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="pothole" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">10</span>
            </label>
          </div>
          <div className="mt-auto">
            <input type="text" placeholder="Remark" className="w-full border border-borderColor rounded px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingDetailPage;
