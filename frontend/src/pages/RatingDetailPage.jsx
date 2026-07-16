import React from 'react';

// Using a placeholder image since we can't extract the uploaded image directly.
// You can replace this URL with the actual path to your image when you have it.
const imgUrl = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const RatingDetailPage = () => {
  return (
    <div className="bg-white rounded shadow-sm border border-borderColor p-6 flex flex-col min-h-full overflow-y-auto">
      {/* Header Boxes */}
      <div className="flex gap-4 mb-8">
        <div className="border border-borderColor p-3 rounded flex-1 bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Category</div>
          <div className="font-medium text-gray-800">Roadway</div>
        </div>
        <div className="border border-borderColor p-3 rounded flex-1 bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Asset type</div>
          <div className="font-medium text-gray-800">Pavement</div>
        </div>
        <div className="border border-borderColor p-3 rounded flex-1 bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Direction</div>
          <div className="font-medium text-gray-800">RHS</div>
        </div>
        <div className="border border-borderColor p-3 rounded flex-1 bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">Road Type</div>
          <div className="font-medium text-gray-800">MCW</div>
        </div>
        <div className="border border-borderColor p-3 rounded flex-1 bg-gray-50/30">
          <div className="text-xs text-gray-500 mb-1">chainage</div>
          <div className="font-medium text-gray-800">198.16</div>
        </div>
      </div>

      <h2 className="text-lg font-medium text-center mb-8 border-b pb-2 text-gray-800">Rating Parameters</h2>

      {/* Parameters Row */}
      <div className="flex flex-row gap-6 w-full mb-8">
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

      {/* Images Row */}
      <div className="flex flex-row items-center justify-center gap-6 w-full mt-2">
        <div className="flex-[2] aspect-video bg-gray-100 rounded overflow-hidden border border-borderColor shadow-sm">
          <img src={imgUrl} alt="Road snapshot left" className="w-full h-full object-cover" />
        </div>
        <div className="flex-[3] aspect-video bg-gray-100 rounded overflow-hidden border border-borderColor shadow-sm">
          <img src={imgUrl} alt="Road snapshot center" className="w-full h-full object-cover" />
        </div>
        <div className="flex-[2] aspect-video bg-gray-100 rounded overflow-hidden border border-borderColor shadow-sm">
          <img src={imgUrl} alt="Road snapshot right" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default RatingDetailPage;
