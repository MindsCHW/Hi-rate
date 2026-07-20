import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { projectCoordinates } from '../data/projectCoordinates';
import ProjectMap from '../components/ProjectMap';
import DashboardChart from '../components/DashboardChart';

import GlobalFilters from '../components/dashboard/GlobalFilters';
import KPICards from '../components/dashboard/KPICards';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import InspectorLeaderboard from '../components/dashboard/InspectorLeaderboard';
import RecentActivityTimeline from '../components/dashboard/RecentActivityTimeline';
import AllProjectsMap from '../components/dashboard/AllProjectsMap';

import ExecutiveCards from '../components/dashboard/ExecutiveCards';
import ExecutiveCharts from '../components/dashboard/ExecutiveCharts';

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProject = searchParams.get('project');
  const coordinates = selectedProject ? projectCoordinates[selectedProject] : null;

  const setSelectedProject = (project) => {
    if (project) {
      setSearchParams({ project });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto flex flex-col custom-scrollbar">
          
          <GlobalFilters 
            selectedProject={selectedProject} 
            setSelectedProject={setSelectedProject} 
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {!selectedProject ? (
              // GLOBAL VIEW - EXECUTIVE SUMMARY
              <div className="bg-white p-4 shadow-sm border border-gray-300 rounded mb-10">
                {/* Header */}
                <div className="flex items-center justify-between bg-green-800 text-white p-3 rounded-t mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-1 rounded">
                      <span className="text-green-800 font-bold text-xl px-2">HiRATE</span>
                    </div>
                    <div className="border-l border-white pl-4">
                      <h1 className="text-xl font-bold uppercase tracking-wide">Monthly Performance Summary</h1>
                      <p className="text-sm text-green-200">MAY 2026</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-lg font-bold bg-white text-gray-800 px-3 py-1 rounded">CUBEHIGHWAYS</span>
                    <span className="text-lg font-bold bg-white text-green-600 px-3 py-1 rounded">CUBETECH</span>
                  </div>
                </div>

                <h2 className="text-gray-800 font-bold text-sm uppercase tracking-wide border-b border-gray-300 pb-1 mb-4">Executive Summary</h2>
                <ExecutiveCards />
                
                <ExecutiveCharts />

                <div className="mt-4">
                   <AllProjectsMap />
                </div>
                
                <div className="w-full bg-white border border-gray-300 rounded shadow-sm flex flex-col p-6 mt-6">
                  <h2 className="text-gray-500 font-bold text-sm tracking-wide mb-8 uppercase">Roads Status</h2>
                  <div className="flex-1 flex flex-col items-center justify-center -mt-8">
                    <DashboardChart />
                    <div className="text-center mt-2">
                      <span className="font-bold text-gray-700 text-lg">Total Roads : 16</span>
                    </div>
                  </div>
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
                        Interactive Map: <span className="text-primary">{selectedProject}</span>
                      </h2>
                    </div>
                    <ProjectMap project={selectedProject} coordinates={coordinates} />
                  </div>
                )}

                <AnalyticsCharts />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                  <div className="lg:col-span-2">
                    <RecentActivityTimeline />
                  </div>
                  <div className="lg:col-span-1">
                    <InspectorLeaderboard />
                  </div>
                </div>
              </>
            )}
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
