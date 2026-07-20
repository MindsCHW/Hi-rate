import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import GlobalFilters from '../components/dashboard/GlobalFilters';
import KPICards from '../components/dashboard/KPICards';
import AllProjectsMap from '../components/dashboard/AllProjectsMap';
import ExecutiveCards from '../components/dashboard/ExecutiveCards';
import ExecutiveCharts from '../components/dashboard/ExecutiveCharts';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import InspectorLeaderboard from '../components/dashboard/InspectorLeaderboard';
import RecentActivityTimeline from '../components/dashboard/RecentActivityTimeline';
import ProjectMap from '../components/ProjectMap';
import DashboardChart from '../components/DashboardChart';
import { projectCoordinates } from '../data/projectCoordinates';

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProject = searchParams.get('project');

  const setSelectedProject = (project) => {
    if (project) {
      setSearchParams({ project });
    } else {
      setSearchParams({});
    }
  };

  // If a project is selected, we can get its coordinates for ProjectMap
  const coordinates = selectedProject ? projectCoordinates[selectedProject] : null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto p-8 pt-6 relative scroll-smooth">
          <div className="max-w-[1800px] mx-auto w-full h-full flex flex-col">
            
            {/* Global Filters on top */}
            <GlobalFilters 
              selectedProject={selectedProject} 
              setSelectedProject={setSelectedProject} 
            />

            {!selectedProject ? (
              // ALL PROJECTS VIEW
              <div className="flex flex-col gap-6">
                
                {/* Roads Status original view */}
                <div className="w-full bg-white border border-borderColor rounded shadow-sm flex flex-col p-6 mb-6">
                  <h2 className="text-gray-500 font-bold text-sm tracking-wide mb-8 uppercase">Roads Status</h2>
                  <div className="flex-1 flex flex-col items-center justify-center -mt-8">
                    <DashboardChart />
                    <div className="text-center mt-2">
                      <span className="font-bold text-gray-700 text-lg">Total Roads : 16</span>
                    </div>
                  </div>
                </div>

                <ExecutiveCards />
                
                <div className="mt-4">
                   <AllProjectsMap />
                </div>
                
                <ExecutiveCharts />
                <AnalyticsCharts />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InspectorLeaderboard />
                  <RecentActivityTimeline />
                </div>
              </div>
            ) : (
              // PROJECT SPECIFIC VIEW
              <>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-gray-800 font-bold text-xl tracking-wide flex items-center gap-2">
                    Project Overview: <span className="text-primary bg-blue-50 px-3 py-1 rounded-md">{selectedProject}</span>
                  </h2>
                </div>

                <KPICards />

                {/* Map Section */}
                {coordinates && (  
                  <div className="p-5 bg-white border border-borderColor rounded-xl shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-gray-700 font-bold text-base tracking-wide uppercase">
                        Project Location
                      </h2>
                    </div>
                    <ProjectMap project={selectedProject} coordinates={coordinates} /> 
                  </div>
                )}
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
