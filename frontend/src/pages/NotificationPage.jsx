import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { dummyData as ratingDummyData } from '../data/ratingData';
import {
  LuUsers,
  LuUserCheck,
  LuClock,
  LuCircleCheck,
  LuClipboardPlus,
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
  LuCircleAlert,
  LuChevronDown,
  LuSend,
  LuEye,
  LuPen,
  LuTrash2,
  LuCheck
} from 'react-icons/lu';

// Fallback seed of 24 users (exactly 18 Active and 6 Inactive)
const fallbackUsers = [
  { id: '1234201', name: 'Sravya', username: 'sravya', email: 'sravyagokada@gmail.com', role: 'Administrator', status: 'Active', avatarColor: 'bg-blue-600' },
  { id: '1234202', name: 'Rahul Kumar', username: 'rahul', email: 'rahulkumar@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-emerald-600' },
  { id: '1234203', name: 'Kiran Reddy', username: 'kiran', email: 'kiranreddy@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-indigo-600' },
  { id: '1234204', name: 'Mahesh', username: 'mahesh', email: 'mahesh@gmail.com', role: 'User', status: 'Inactive', avatarColor: 'bg-rose-600' },
  { id: '1234205', name: 'Anil Kumar', username: 'anil', email: 'anilkumar@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-amber-600', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: '1234206', name: 'Priyanshu Sharma', username: 'priyanshu', email: 'priyanshu@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-purple-600' },
  { id: '1234207', name: 'Pooja Patel', username: 'pooja', email: 'poojapatel@gmail.com', role: 'Administrator', status: 'Active', avatarColor: 'bg-teal-600' },
  { id: '1234208', name: 'Swaraj Patnaik', username: 'swaraj', email: 'swaraj@gmail.com', role: 'User', status: 'Inactive', avatarColor: 'bg-slate-600' },
  { id: '1234209', name: 'Amit Singh', username: 'amit', email: 'amitsingh@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-blue-500' },
  { id: '1234210', name: 'Neha Sharma', username: 'neha', email: 'nehasharma@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-pink-500' },
  { id: '1234211', name: 'Vikram Malhotra', username: 'vikram', email: 'vikramm@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-orange-500' },
  { id: '1234212', name: 'Deepa Rao', username: 'deepa', email: 'deeparao@gmail.com', role: 'User', status: 'Inactive', avatarColor: 'bg-red-500' },
  { id: '1234213', name: 'Rajesh Patel', username: 'rajesh', email: 'rajeshp@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-cyan-600' },
  { id: '1234214', name: 'Sneha Reddy', username: 'sneha', email: 'snehareddy@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-violet-600' },
  { id: '1234215', name: 'Sanjay Kumar', username: 'sanjay', email: 'sanjayk@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-lime-600' },
  { id: '1234216', name: 'Divya Teja', username: 'divya', email: 'divyateja@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-emerald-500' },
  { id: '1234217', name: 'Harish Rao', username: 'harish', email: 'harishrao@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-sky-600' },
  { id: '1234218', name: 'Kavitha S.', username: 'kavitha', email: 'kavithas@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-amber-500' },
  { id: '1234219', name: 'Manoj Kumar', username: 'manoj', email: 'manojk@gmail.com', role: 'User', status: 'Inactive', avatarColor: 'bg-rose-500' },
  { id: '1234220', name: 'Nidhi Gupta', username: 'nidhi', email: 'nidhig@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-violet-500' },
  { id: '1234221', name: 'Pavan Kalyan', username: 'pavan', email: 'pavank@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-fuchsia-600' },
  { id: '1234222', name: 'Ramya Krishna', username: 'ramya', email: 'ramyak@gmail.com', role: 'User', status: 'Inactive', avatarColor: 'bg-indigo-500' },
  { id: '1234223', name: 'Suresh Raina', username: 'suresh', email: 'sureshr@gmail.com', role: 'User', status: 'Active', avatarColor: 'bg-blue-700' },
  { id: '1234224', name: 'Swapna Reddy', username: 'swapna', email: 'swapnar@gmail.com', role: 'User', status: 'Inactive', avatarColor: 'bg-emerald-700' }
];

const categories = [
  "Roadway",
  "Road Signage and Furniture",
  "Project Facilities",
  "Structures",
  "ATMS",
  "TMS",
  "Landscaping"
];

const roadProjects = ["HO PROCESS", "ON-GOING", "SPV RATED", "HO RATED", "NOT RATED"];

// Helper to format date into "DD MMM YYYY"
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

// Helper to format current date and time
const formatDateTime = (date) => {
  const day = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${day}, ${time}`;
};

const NotificationPage = () => {
  // 1. Fetch existing users from User Management module database (localStorage)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('hirate-users');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    }
    // Pre-seed fallback users if database is empty so it replicates mockup visually
    localStorage.setItem('hirate-users', JSON.stringify(fallbackUsers));
    return fallbackUsers;
  });

  // Keep state synced in case of updates from User Management tab
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('hirate-users');
      if (saved) {
        setUsers(JSON.parse(saved));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 2. Fetch rating projects dynamically from Rating page source array without duplicating data
  const ratingProjects = ratingDummyData
    .map(item => {
      // Clean SPV prefix if present to fetch clean road full name
      const cleanedFullName = item.roadFullName.replace(/^SPV Name\s*:\s*/i, '').trim();
      return {
        id: item.roadName,
        displayName: `${item.roadName} – ${cleanedFullName}`,
        fullName: cleanedFullName
      };
    })
    // Sort projects alphabetically by Road Name (ID)
    .sort((a, b) => a.id.localeCompare(b.id));

  // Filter and Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [userPage, setUserPage] = useState(1);
  const USERS_PER_PAGE = 5;

  // Selected User ID state (defaults to first user with role 'User')
  const [selectedUserId, setSelectedUserId] = useState(() => {
    const firstUser = users.find(u => u.role.toLowerCase() === 'user');
    return firstUser ? firstUser.id || firstUser.email : '';
  });

  const selectedEmployee = users.find(u => (u.id || u.email) === selectedUserId);

  // Form State (initialized exactly to match the Sravya values in the reference mockup)
  const [formData, setFormData] = useState({
    roadProject: 'HO PROCESS', // Reverted back to HO PROCESS default
    routeSection: 'APFI', // Maps to Andhra Pradesh Expressway Limited (APFI) ID
    category: 'Roadway',
    subSection: 'Pages 10-20',
    priority: 'High',
    dueDate: '2026-07-20',
    remarks: 'Please complete the rating for the HO process images. Ensure accuracy and submit before the due date.'
  });

  // Searchable combobox dropdown states - Road / Project
  const [isProjDropdownOpen, setIsProjDropdownOpen] = useState(false);
  const [projDropdownSearch, setProjDropdownSearch] = useState('');
  const [projActiveIndex, setProjActiveIndex] = useState(-1);
  const projDropdownRef = useRef(null);

  // Searchable combobox dropdown states - Route / Section
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const [activeRouteIndex, setActiveRouteIndex] = useState(-1);
  const dropdownRef = useRef(null);

  // Filter project codes
  const filteredRoadProjects = roadProjects.filter(project =>
    project.toLowerCase().includes(projDropdownSearch.toLowerCase())
  );

  // Filter route sections
  const filteredProjects = ratingProjects.filter(p =>
    p.displayName.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  // Key handlers for Road / Project
  const handleProjKeyDown = (e) => {
    if (!isProjDropdownOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsProjDropdownOpen(true);
        setProjActiveIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setProjActiveIndex(prev => (prev + 1) % filteredRoadProjects.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setProjActiveIndex(prev => (prev - 1 + filteredRoadProjects.length) % filteredRoadProjects.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (projActiveIndex >= 0 && projActiveIndex < filteredRoadProjects.length) {
        const selected = filteredRoadProjects[projActiveIndex];
        setFormData(prev => ({ ...prev, roadProject: selected }));
        setIsProjDropdownOpen(false);
        setProjDropdownSearch('');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsProjDropdownOpen(false);
    }
  };

  // Key handlers for Route / Section
  const handleRouteKeyDown = (e) => {
    if (!isDropdownOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsDropdownOpen(true);
        setActiveRouteIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveRouteIndex(prev => (prev + 1) % filteredProjects.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveRouteIndex(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeRouteIndex >= 0 && activeRouteIndex < filteredProjects.length) {
        const selected = filteredProjects[activeRouteIndex];
        setFormData(prev => ({ ...prev, routeSection: selected.id }));
        setIsDropdownOpen(false);
        setDropdownSearch('');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsDropdownOpen(false);
    }
  };

  // Click outside to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (projDropdownRef.current && !projDropdownRef.current.contains(e.target)) {
        setIsProjDropdownOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keyboard navigation scroll sync
  useEffect(() => {
    if (isProjDropdownOpen && projActiveIndex >= 0) {
      const el = document.getElementById(`proj-opt-${projActiveIndex}`);
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [projActiveIndex, isProjDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen && activeRouteIndex >= 0) {
      const el = document.getElementById(`route-opt-${activeRouteIndex}`);
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [activeRouteIndex, isDropdownOpen]);

  // Get active selected project details
  const activeSelectedProject = ratingProjects.find(p => p.id === formData.routeSection);
  const routeSectionDisplayValue = activeSelectedProject ? activeSelectedProject.fullName : 'Select Route / Section';

  // Recent Assignments State (loaded and persisted via localStorage)
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('hirate-assignments');
    if (saved) return JSON.parse(saved);
    
    // Seed mockup initial assignments to look identical to reference, including seeded timelines
    const initialAssignments = [
      {
        id: 'task-1',
        userName: 'Sravya',
        project: 'APFI',
        category: 'Roadway',
        routeSection: 'APFI',
        routeSectionName: 'Andhra Pradesh Expressway Limited (APFI)',
        subSection: 'Pages 10-20',
        priority: 'High',
        status: 'Pending',
        due: '2026-07-20',
        assignedOn: '14 Jul 2026, 05:28 PM',
        timeline: [
          {
            timestamp: '14 Jul 2026, 05:28 PM',
            action: 'Assigned by Admin',
            performedBy: 'Admin',
            remarks: 'Please complete the rating for the HO process images. Ensure accuracy and submit before the due date.'
          }
        ]
      },
      {
        id: 'task-2',
        userName: 'Rahul Kumar',
        project: 'SPPL',
        category: 'Structures',
        routeSection: 'SPPL',
        routeSectionName: 'KNR Shankarampet Projects Private Limited (SPPL)',
        subSection: 'Pages 5-10',
        priority: 'Medium',
        status: 'In Progress',
        due: '2026-07-21',
        assignedOn: '14 Jul 2026, 04:45 PM',
        timeline: [
          {
            timestamp: '14 Jul 2026, 04:45 PM',
            action: 'Assigned by Admin',
            performedBy: 'Admin',
            remarks: 'Verify structures rating.'
          },
          {
            timestamp: '14 Jul 2026, 05:00 PM',
            action: 'Opened by User',
            performedBy: 'Rahul Kumar',
            remarks: 'Task is visible on my dashboard.'
          }
        ]
      },
      {
        id: 'task-3',
        userName: 'Kiran Reddy',
        project: 'JMTPL',
        category: 'ATMS',
        routeSection: 'JMTPL',
        routeSectionName: 'Jaipur-Mahua Tollway Private Limited (JMTPL)',
        subSection: 'Page 1',
        priority: 'Low',
        status: 'Completed',
        due: '2026-07-13',
        assignedOn: '13 Jul 2026, 11:20 AM',
        timeline: [
          {
            timestamp: '13 Jul 2026, 11:20 AM',
            action: 'Assigned by Admin',
            performedBy: 'Admin',
            remarks: 'Review ATMS images.'
          },
          {
            timestamp: '13 Jul 2026, 11:35 AM',
            action: 'Opened by User',
            performedBy: 'Kiran Reddy',
            remarks: 'Started rating images.'
          },
          {
            timestamp: '13 Jul 2026, 12:25 PM',
            action: 'Marked Completed',
            performedBy: 'Kiran Reddy',
            remarks: 'All rating details submitted.'
          }
        ]
      }
    ];
    localStorage.setItem('hirate-assignments', JSON.stringify(initialAssignments));
    return initialAssignments;
  });

  const [duplicateError, setDuplicateError] = useState(null);
  const [activeTimelineAssignment, setActiveTimelineAssignment] = useState(null);
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);

  // --- Bulk Assignment Feature States ---
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [bulkFormData, setBulkFormData] = useState({
    roadProject: 'HO PROCESS',
    routeSection: 'APFI',
    category: 'Roadway',
    totalPages: '',
    autoSplit: true,
    selectedUserIds: []
  });

  // Bulk dropdown combobox states
  const [isBulkProjOpen, setIsBulkProjOpen] = useState(false);
  const [bulkProjSearch, setBulkProjSearch] = useState('');
  const [bulkProjActiveIndex, setBulkProjActiveIndex] = useState(-1);
  const bulkProjDropdownRef = useRef(null);

  const [isBulkRouteOpen, setIsBulkRouteOpen] = useState(false);
  const [bulkRouteSearch, setBulkRouteSearch] = useState('');
  const [bulkRouteActiveIndex, setBulkRouteActiveIndex] = useState(-1);
  const bulkRouteDropdownRef = useRef(null);

  // Bulk options filters
  const bulkFilteredRoadProjects = roadProjects.filter(project =>
    project.toLowerCase().includes(bulkProjSearch.toLowerCase())
  );
  const bulkFilteredProjects = ratingProjects.filter(p =>
    p.displayName.toLowerCase().includes(bulkRouteSearch.toLowerCase())
  );

  // Keyboard navigation key handlers for Bulk dropdowns
  const handleBulkProjKeyDown = (e) => {
    if (!isBulkProjOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsBulkProjOpen(true);
        setBulkProjActiveIndex(0);
        e.preventDefault();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setBulkProjActiveIndex(prev => (prev + 1) % bulkFilteredRoadProjects.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setBulkProjActiveIndex(prev => (prev - 1 + bulkFilteredRoadProjects.length) % bulkFilteredRoadProjects.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (bulkProjActiveIndex >= 0 && bulkProjActiveIndex < bulkFilteredRoadProjects.length) {
        const selected = bulkFilteredRoadProjects[bulkProjActiveIndex];
        setBulkFormData(prev => ({ ...prev, roadProject: selected }));
        setIsBulkProjOpen(false);
        setBulkProjSearch('');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsBulkProjOpen(false);
    }
  };

  const handleBulkRouteKeyDown = (e) => {
    if (!isBulkRouteOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsBulkRouteOpen(true);
        setBulkRouteActiveIndex(0);
        e.preventDefault();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setBulkRouteActiveIndex(prev => (prev + 1) % bulkFilteredProjects.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setBulkRouteActiveIndex(prev => (prev - 1 + bulkFilteredProjects.length) % bulkFilteredProjects.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (bulkRouteActiveIndex >= 0 && bulkRouteActiveIndex < bulkFilteredProjects.length) {
        const selected = bulkFilteredProjects[bulkRouteActiveIndex];
        setBulkFormData(prev => ({ ...prev, routeSection: selected.id }));
        setIsBulkRouteOpen(false);
        setBulkRouteSearch('');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsBulkRouteOpen(false);
    }
  };

  // Close bulk dropdowns click-outside
  useEffect(() => {
    const handleBulkOutsideClick = (e) => {
      if (bulkProjDropdownRef.current && !bulkProjDropdownRef.current.contains(e.target)) {
        setIsBulkProjOpen(false);
      }
      if (bulkRouteDropdownRef.current && !bulkRouteDropdownRef.current.contains(e.target)) {
        setIsBulkRouteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleBulkOutsideClick);
    return () => document.removeEventListener('mousedown', handleBulkOutsideClick);
  }, []);

  // Sync scroll for bulk highlighted index
  useEffect(() => {
    if (isBulkProjOpen && bulkProjActiveIndex >= 0) {
      const el = document.getElementById(`bulk-proj-opt-${bulkProjActiveIndex}`);
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [bulkProjActiveIndex, isBulkProjOpen]);

  useEffect(() => {
    if (isBulkRouteOpen && bulkRouteActiveIndex >= 0) {
      const el = document.getElementById(`bulk-route-opt-${bulkRouteActiveIndex}`);
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [bulkRouteActiveIndex, isBulkRouteOpen]);

  const bulkSelectedRouteProject = ratingProjects.find(p => p.id === bulkFormData.routeSection);
  const bulkRouteDisplayValue = bulkSelectedRouteProject ? bulkSelectedRouteProject.displayName : 'Select Route / Section';

  // Calculations for auto-splitting or full pages allocation
  const activeBulkUsers = users.filter(u => u.status === 'Active' && u.role.toLowerCase() === 'user');
  const selectedBulkUsers = activeBulkUsers.filter(u => bulkFormData.selectedUserIds.includes(u.id || u.email));
  const totalPagesNum = parseInt(bulkFormData.totalPages) || 0;
  const bulkPreviewList = [];

  if (selectedBulkUsers.length > 0 && totalPagesNum > 0) {
    if (bulkFormData.autoSplit) {
      const U = selectedBulkUsers.length;
      const basePages = Math.floor(totalPagesNum / U);
      let currentStart = 1;
      for (let i = 0; i < U; i++) {
        let end = currentStart + basePages - 1;
        if (i === U - 1) {
          end = totalPagesNum;
        }
        const rangeStr = currentStart === end ? `Page ${currentStart}` : `Pages ${currentStart}-${end}`;
        bulkPreviewList.push({
          user: selectedBulkUsers[i],
          range: rangeStr
        });
        currentStart = end + 1;
      }
    } else {
      selectedBulkUsers.forEach(u => {
        bulkPreviewList.push({
          user: u,
          range: totalPagesNum === 1 ? `Page 1` : `Pages 1-${totalPagesNum}`
        });
      });
    }
  }

  // Handle bulk assignment submission
  const handleBulkAssign = (e) => {
    e.preventDefault();

    if (!bulkFormData.roadProject || !bulkFormData.routeSection) {
      alert("Please select a valid Project and Route Section.");
      return;
    }
    if (selectedBulkUsers.length === 0) {
      alert("Please select at least one active user.");
      return;
    }
    if (totalPagesNum <= 0) {
      alert("Please specify a valid number of total pages.");
      return;
    }

    const currentAssignedTime = formatDateTime(new Date());
    
    // Create separate assignment records for every selected user
    const newAssignments = bulkPreviewList.map((item, idx) => {
      const taskId = `task-bulk-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`;
      return {
        id: taskId,
        userName: item.user.name,
        project: bulkFormData.roadProject,
        category: bulkFormData.category,
        routeSection: bulkFormData.routeSection,
        routeSectionName: bulkSelectedRouteProject ? bulkSelectedRouteProject.fullName : bulkFormData.routeSection,
        subSection: item.range,
        priority: 'Medium', // default priority
        status: 'Assigned',
        due: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // default due: 7 days later
        assignedOn: currentAssignedTime,
        timeline: [
          {
            timestamp: currentAssignedTime,
            action: 'Assigned by Admin (Bulk)',
            performedBy: 'Admin',
            remarks: `Distributed bulk allocation of ${totalPagesNum} pages.`
          }
        ]
      };
    });

    const updated = [...newAssignments, ...assignments];
    setAssignments(updated);
    localStorage.setItem('hirate-assignments', JSON.stringify(updated));

    // Reset bulk states
    setIsBulkOpen(false);
    setBulkFormData({
      roadProject: 'HO PROCESS',
      routeSection: 'APFI',
      category: 'Roadway',
      totalPages: '',
      autoSplit: true,
      selectedUserIds: []
    });
  };

  // Toggle user selection in bulk list
  const toggleBulkUser = (userId) => {
    setBulkFormData(prev => {
      const alreadySelected = prev.selectedUserIds.includes(userId);
      const nextList = alreadySelected
        ? prev.selectedUserIds.filter(id => id !== userId)
        : [...prev.selectedUserIds, userId];
      return { ...prev, selectedUserIds: nextList };
    });
  };

  // Select all active users
  const handleSelectAllBulkUsers = () => {
    setBulkFormData(prev => {
      const allActiveIds = activeBulkUsers.map(u => u.id || u.email);
      const isAllSelected = prev.selectedUserIds.length === allActiveIds.length;
      return {
        ...prev,
        selectedUserIds: isAllSelected ? [] : allActiveIds
      };
    });
  };

  // Page input change validation handler
  const handlePagesChange = (e) => {
    const val = e.target.value;
    // Allow only digits, commas, hyphens, spaces, and letters (P,a,g,e,s)
    const cleanVal = val.replace(/[^0-9a-zA-Z\s,-]/g, '');
    setFormData(prev => ({ ...prev, subSection: cleanVal }));

    // Custom HTML5 validity validation check
    const stripped = cleanVal.replace(/pages?/gi, '');
    const isValid = /^[0-9\s,-]*$/.test(stripped);
    if (!isValid) {
      e.target.setCustomValidity("Please enter page numbers using valid format (e.g. Page 1, Pages 10-20, 1-15). Only numbers, commas, hyphens, and the word Page/Pages are allowed.");
    } else {
      e.target.setCustomValidity("");
    }
  };

  // Reset form to defaults
  const handleResetForm = () => {
    setFormData({
      roadProject: '',
      routeSection: '',
      category: 'Roadway',
      subSection: '',
      priority: 'Medium',
      dueDate: '',
      remarks: ''
    });
  };

  // Handle Assign Work form submission
  const handleAssignWork = (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      alert("Please select a user from the table first.");
      return;
    }

    if (editingAssignmentId) {
      const original = assignments.find(item => item.id === editingAssignmentId);
      if (!original) return;

      // Compile updated fields
      const updatedFields = [];
      if (original.userName !== selectedEmployee.name) updatedFields.push("User");
      if (original.project !== formData.roadProject) updatedFields.push("Road / Project");
      if (original.routeSection !== formData.routeSection) updatedFields.push("Route / Section");
      if (original.category !== formData.category) updatedFields.push("Category");
      if (original.subSection !== formData.subSection) updatedFields.push("Sub Section / Pages");
      if (original.priority !== formData.priority) updatedFields.push("Priority");
      if (original.due !== formData.dueDate) updatedFields.push("Due");
      
      const originalRemarks = original.remarks || '';
      const newRemarks = formData.remarks || '';
      if (originalRemarks !== newRemarks) updatedFields.push("Instructions");

      const editRemarksText = updatedFields.length > 0
        ? `Updated:\n` + updatedFields.map(f => `• ${f}`).join('\n')
        : 'No changes made.';

      const editEvent = {
        timestamp: formatDateTime(new Date()),
        action: 'Edited by Administrator',
        performedBy: 'Administrator',
        remarks: editRemarksText
      };

      const updated = assignments.map(item => {
        if (item.id === editingAssignmentId) {
          return {
            ...item,
            userName: selectedEmployee.name,
            project: formData.roadProject,
            category: formData.category,
            routeSection: formData.routeSection,
            routeSectionName: activeSelectedProject ? activeSelectedProject.fullName : formData.routeSection,
            subSection: formData.subSection,
            priority: formData.priority,
            due: formData.dueDate,
            remarks: formData.remarks,
            timeline: item.timeline ? [...item.timeline, editEvent] : [editEvent]
          };
        }
        return item;
      });

      setAssignments(updated);
      localStorage.setItem('hirate-assignments', JSON.stringify(updated));
      setEditingAssignmentId(null);
      handleResetForm();
    } else {
      // Check if an identical active assignment already exists
      const duplicate = assignments.find(item => 
        item.userName === selectedEmployee.name &&
        item.project === formData.roadProject &&
        item.routeSection === formData.routeSection &&
        item.category === formData.category &&
        item.subSection === formData.subSection &&
        item.status !== 'Completed'
      );

      if (duplicate) {
        setDuplicateError(duplicate);
        return;
      }

      const currentAssignedTime = formatDateTime(new Date());

      const newAssignment = {
        id: `task-${Date.now()}`,
        userName: selectedEmployee.name,
        project: formData.roadProject,
        category: formData.category,
        routeSection: formData.routeSection,
        routeSectionName: activeSelectedProject ? activeSelectedProject.fullName : formData.routeSection,
        subSection: formData.subSection,
        priority: formData.priority,
        status: 'Assigned', // Automatically set to Assigned
        due: formData.dueDate,
        assignedOn: currentAssignedTime, // Current date & time
        timeline: [
          {
            timestamp: currentAssignedTime,
            action: 'Assigned by Admin',
            performedBy: 'Admin',
            remarks: formData.remarks
          }
        ]
      };

      const updated = [newAssignment, ...assignments]; // Newest assignment at the top
      setAssignments(updated);
      localStorage.setItem('hirate-assignments', JSON.stringify(updated));

      // Reset the form values
      handleResetForm();
    }
  };

  // Handle deleting assignment record
  const handleDeleteAssignment = (id) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      const updated = assignments.filter(item => item.id !== id);
      setAssignments(updated);
      localStorage.setItem('hirate-assignments', JSON.stringify(updated));
    }
  };

  // Handle marking assignment completed
  const handleCompleteAssignment = (id) => {
    if (confirm("Mark this assignment as Completed?\n\n[Cancel]   [Mark Completed]")) {
      const updated = assignments.map(item => {
        if (item.id === id) {
          const completedTime = formatDateTime(new Date());
          const newEvent = {
            timestamp: completedTime,
            action: 'Marked Completed',
            performedBy: 'Admin',
            remarks: 'Task marked as completed successfully.'
          };
          return { 
            ...item, 
            status: 'Completed',
            completedOn: completedTime,
            timeline: item.timeline ? [...item.timeline, newEvent] : [newEvent]
          };
        }
        return item;
      });
      setAssignments(updated);
      localStorage.setItem('hirate-assignments', JSON.stringify(updated));
    }
  };

  // Filter users based on query and filters
  const filteredUsers = users.filter(user => {
    if (user.role.toLowerCase() !== 'user') return false;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.username && user.username.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query));
    
    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesRole = !roleFilter || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalUserPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((userPage - 1) * USERS_PER_PAGE, userPage * USERS_PER_PAGE);

  useEffect(() => {
    setUserPage(1);
  }, [searchQuery, statusFilter, roleFilter]);

  // --- Dynamic Dashboard Stats Calculations ---
  const todayDateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); // e.g. "21 Jul 2026"

  // 1. Total Users
  const totalUsersCount = users.filter(u => u.role.toLowerCase() === 'user').length;

  // 2. Available Users = Active Users - Users with Assigned/In Progress/Pending tasks
  const namesWithUnfinished = new Set(
    assignments
      .filter(a => a.status !== 'Completed')
      .map(a => a.userName)
  );
  const activeUsersCount = users.filter(u => u.status === 'Active' && u.role.toLowerCase() === 'user');
  const availableUsersCount = activeUsersCount.filter(u => !namesWithUnfinished.has(u.name)).length;

  // 3. Assigned Today
  const assignedTodayCount = assignments.filter(a => a.assignedOn && a.assignedOn.startsWith(todayDateStr)).length;

  // 4. Pending Tasks = Total Assignments - Completed Assignments
  const pendingTasksCount = assignments.filter(a => a.status !== 'Completed').length;

  // 5. Completed Today
  const completedTodayCount = assignments.filter(a =>
    a.status === 'Completed' &&
    ((a.completedOn && a.completedOn.startsWith(todayDateStr)) ||
     (a.assignedOn && a.assignedOn.startsWith(todayDateStr)))
  ).length;

  // Helper to render Avatar
  const renderAvatar = (user) => {
    if (user.photo) {
      return (
        <img
          src={user.photo}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover shrink-0 shadow-inner"
        />
      );
    }
    const initials = user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U';
    return (
      <div className={`w-8 h-8 rounded-full ${user.avatarColor || 'bg-blue-600'} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
        {initials}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-pageBg">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between gap-4 shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-textColor">Notification & Work Assignment</h1>
              <p className="text-muted text-sm mt-1">Assign highway rating tasks to users and monitor assignment progress.</p>
            </div>
            
            {/* New Bulk Assignment Button */}
            <button
              onClick={() => setIsBulkOpen(true)}
              className="px-5 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              Bulk Assignment
            </button>
          </div>

          {/* Stats Cards - Recreated 1:1 with reference image spacing and styles, values starting at 0 */}
          <div className="grid grid-cols-5 gap-4 shrink-0">
            {/* Stat Card 1: Total Users */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
                <LuUsers />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Users</span>
                <span className="text-xl font-extrabold text-gray-900 mt-1 block">{totalUsersCount}</span>
                <span className="text-[10px] text-gray-400 font-medium block">All Registered Users</span>
              </div>
            </div>

            {/* Stat Card 2: Available Users */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                <LuUserCheck />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Available Users</span>
                <span className="text-xl font-extrabold text-gray-900 mt-1 block">{availableUsersCount}</span>
                <span className="text-[10px] text-gray-400 font-medium block">Ready for Assignment</span>
              </div>
            </div>

            {/* Stat Card 3: Assigned Today */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
                <LuClipboardPlus />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Assigned Today</span>
                <span className="text-xl font-extrabold text-gray-900 mt-1 block">{assignedTodayCount}</span>
                <span className="text-[10px] text-gray-400 font-medium block">Tasks Assigned</span>
              </div>
            </div>

            {/* Stat Card 4: Pending Tasks */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0">
                <LuClock />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Pending Tasks</span>
                <span className="text-xl font-extrabold text-gray-900 mt-1 block">{pendingTasksCount}</span>
                <span className="text-[10px] text-gray-400 font-medium block">Not Completed</span>
              </div>
            </div>

            {/* Stat Card 5: Completed Today */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                <LuCircleCheck />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Completed Today</span>
                <span className="text-xl font-extrabold text-gray-900 mt-1 block">{completedTodayCount}</span>
                <span className="text-[10px] text-gray-400 font-medium block">Tasks Completed</span>
              </div>
            </div>
          </div>

          {/* Split Layout: Left Card (All Users) / Right Card (Assign Work Panel) */}
          <div className="grid grid-cols-[48fr_52fr] gap-6 items-stretch">
            
            {/* Left Card: All Users User List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[520px] justify-between">
              <div>
                {/* Header & Filters */}
                <div className="p-5 border-b border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-md font-bold text-gray-900">All Users</h2>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                      <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name, username or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-textColor placeholder-gray-400 transition-colors"
                      />
                    </div>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-10 px-3 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer shrink-0"
                    >
                      <option value="">Status: All</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    {/* Role Filter */}
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="h-10 px-3 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 font-semibold focus:outline-none focus:border-blue-600 cursor-pointer shrink-0"
                    >
                      <option value="">Role: All</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto min-h-[300px]">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50 sticky top-0 z-10">
                        <th className="py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center w-12" />
                        <th className="py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">USER</th>
                        <th className="py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">ROLE</th>
                        <th className="py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">STATUS</th>
                        <th className="py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((user) => {
                          const currentId = user.id || user.email;
                          const isSelected = selectedUserId === currentId;
                          const isActive = user.status === 'Active';
                          return (
                            <tr
                              key={currentId}
                              onClick={() => {
                                if (isActive) {
                                  setSelectedUserId(currentId);
                                }
                              }}
                              className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${
                                isSelected ? 'bg-blue-50/40 border-l-[3px] border-l-blue-600' : 'border-l-[3px] border-l-transparent'
                              }`}
                            >
                              <td className="py-3 px-4 text-center">
                                <input
                                  type="radio"
                                  name="selectedUserRadio"
                                  checked={isSelected}
                                  disabled={!isActive}
                                  onChange={() => setSelectedUserId(currentId)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-1 cursor-pointer disabled:opacity-40"
                                />
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  {renderAvatar(user)}
                                  <div className="min-w-0">
                                    <span className="font-semibold text-gray-800 text-sm block truncate leading-normal">{user.name}</span>
                                    <span className="text-[11px] text-gray-400 block truncate leading-normal">@{user.username || 'user'}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-xs font-semibold text-gray-500">{user.role}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border ${
                                  isActive 
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                    : 'bg-rose-50 text-rose-600 border-rose-100'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (isActive) {
                                      setSelectedUserId(currentId);
                                    }
                                  }}
                                  disabled={!isActive}
                                  className={`px-4 py-1.5 border rounded-lg text-xs font-bold transition-all duration-200 ${
                                    !isActive
                                      ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
                                      : isSelected 
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm cursor-pointer' 
                                        : 'border-blue-600 text-blue-600 hover:bg-blue-50/50 bg-white cursor-pointer'
                                  }`}
                                  title={!isActive ? "Inactive users cannot receive assignments." : "Assign"}
                                >
                                  Assign
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-12 text-center text-sm text-gray-400">
                            <div className="flex flex-col items-center justify-center gap-1.5">
                              <LuCircleAlert className="text-xl" />
                              <span>No employees match filters.</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Left Pagination */}
              {totalUserPages > 1 && (
                <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Showing {(userPage - 1) * USERS_PER_PAGE + 1} to {Math.min(userPage * USERS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setUserPage(prev => Math.max(prev - 1, 1))}
                      disabled={userPage === 1}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      <LuChevronLeft className="text-sm" />
                    </button>
                    {Array.from({ length: totalUserPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setUserPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 border cursor-pointer ${
                          userPage === p 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setUserPage(prev => Math.min(prev + 1, totalUserPages))}
                      disabled={userPage === totalUserPages}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      <LuChevronRight className="text-sm" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Card: Assign Work Panel */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 min-h-[520px] flex flex-col justify-between">
              
              {/* Header & Subtitle displaying selected employee info */}
              <div>
                <h2 className="text-md font-bold text-gray-900 leading-none">
                  {editingAssignmentId 
                    ? `Edit Assignment For: ${selectedEmployee ? selectedEmployee.name : ''}` 
                    : (selectedEmployee ? `Assign Work To:  ${selectedEmployee.name}` : 'Assign Work')}
                </h2>
                {selectedEmployee ? (
                  <p className="text-[11px] text-gray-400 mt-2 font-medium">
                    {selectedEmployee.role}  •  {selectedEmployee.email}  •  {selectedEmployee.id || '1234201'}
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-400 mt-2 font-medium">No employee selected</p>
                )}
              </div>

              {/* Form Layout replicated exactly from the design mockup */}
              <form onSubmit={handleAssignWork} className="space-y-4 mt-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  
                  {/* Road / Project & Route / Section */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Road / Project (Searchable Combobox Component) */}
                    <div className="flex flex-col gap-1.5" ref={projDropdownRef}>
                      <label className="text-xs font-bold text-textColor">
                        Road / Project <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsProjDropdownOpen(!isProjDropdownOpen)}
                          onKeyDown={handleProjKeyDown}
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 text-textColor font-medium flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{formData.roadProject || 'Select Project'}</span>
                          <LuChevronDown className="text-gray-400 text-base" />
                        </button>
                        
                        {isProjDropdownOpen && (
                          <div className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60">
                            {/* Dropdown Search Box */}
                            <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                              <LuSearch className="text-gray-400 text-sm shrink-0" />
                              <input
                                type="text"
                                placeholder="Search project..."
                                value={projDropdownSearch}
                                onChange={(e) => {
                                  setProjDropdownSearch(e.target.value);
                                  setProjActiveIndex(0);
                                }}
                                onKeyDown={handleProjKeyDown}
                                className="w-full bg-transparent text-xs focus:outline-none placeholder-gray-400 text-textColor"
                              />
                            </div>
                            
                            {/* Dropdown Options List */}
                            <div className="overflow-y-auto divide-y divide-gray-50">
                              {filteredRoadProjects.length > 0 ? (
                                filteredRoadProjects.map((project, index) => (
                                  <button
                                    key={project}
                                    id={`proj-opt-${index}`}
                                    type="button"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, roadProject: project }));
                                      setIsProjDropdownOpen(false);
                                      setProjDropdownSearch('');
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50/50 transition-colors font-medium ${
                                      formData.roadProject === project 
                                        ? 'bg-blue-50 text-blue-600' 
                                        : projActiveIndex === index 
                                          ? 'bg-gray-50 text-textColor'
                                          : 'text-textColor'
                                    }`}
                                  >
                                    {project}
                                  </button>
                                ))
                              ) : (
                                <div className="p-3 text-center text-xs text-gray-400 font-medium">No projects found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Route / Section (Searchable Combobox Component) */}
                    <div className="flex flex-col gap-1.5" ref={dropdownRef}>
                      <label className="text-xs font-bold text-textColor">
                        Route / Section <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          onKeyDown={handleRouteKeyDown}
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 text-textColor font-medium flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{routeSectionDisplayValue}</span>
                          <LuChevronDown className="text-gray-400 text-base" />
                        </button>
                        
                        {isDropdownOpen && (
                          <div className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60">
                            {/* Dropdown Search Box */}
                            <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                              <LuSearch className="text-gray-400 text-sm shrink-0" />
                              <input
                                type="text"
                                placeholder="Search road or project..."
                                value={dropdownSearch}
                                onChange={(e) => {
                                  setDropdownSearch(e.target.value);
                                  setActiveRouteIndex(0);
                                }}
                                onKeyDown={handleRouteKeyDown}
                                className="w-full bg-transparent text-xs focus:outline-none placeholder-gray-400 text-textColor"
                              />
                            </div>
                            
                            {/* Dropdown Options List */}
                            <div className="overflow-y-auto divide-y divide-gray-50">
                              {filteredProjects.length > 0 ? (
                                filteredProjects.map((p, index) => (
                                  <button
                                    key={p.id}
                                    id={`route-opt-${index}`}
                                    type="button"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, routeSection: p.id }));
                                      setIsDropdownOpen(false);
                                      setDropdownSearch('');
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50/50 transition-colors font-medium ${
                                      formData.routeSection === p.id 
                                        ? 'bg-blue-50 text-blue-600' 
                                        : activeRouteIndex === index 
                                          ? 'bg-gray-50 text-textColor'
                                          : 'text-textColor'
                                    }`}
                                  >
                                    {p.displayName}
                                  </button>
                                ))
                              ) : (
                                <div className="p-3 text-center text-xs text-gray-400 font-medium">No roads found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category & Sub Section */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-textColor">
                        Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-textColor font-medium cursor-pointer"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Sub Section / Pages */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-textColor">
                        Sub Section / Pages <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subSection}
                        onChange={handlePagesChange}
                        placeholder="Enter Page Number(s)"
                        className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-textColor font-medium"
                      />
                    </div>
                  </div>

                  {/* Priority & Due Date */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Priority */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-textColor">
                        Priority <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center gap-4 mt-2">
                        {['Low', 'Medium', 'High'].map((p) => {
                          const isChecked = formData.priority === p;
                          return (
                            <label key={p} className="flex items-center gap-1.5 text-sm text-textColor font-semibold cursor-pointer">
                              <input
                                type="radio"
                                name="priorityRadio"
                                checked={isChecked}
                                onChange={() => setFormData(prev => ({ ...prev, priority: p }))}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-1 cursor-pointer"
                              />
                              {p}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Due */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-textColor">
                        Due <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dueDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-textColor font-semibold"
                      />
                    </div>
                  </div>

                  {/* Remarks */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-textColor">
                      Instructions / Remarks <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.remarks}
                      onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                      placeholder="Please complete the rating for the HO process images. Ensure accuracy and submit before the due date."
                      className="h-20 p-3.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-textColor placeholder-gray-400 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Bottom Buttons - Reset/Cancel on left, Assign/Update on right */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {editingAssignmentId ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAssignmentId(null);
                        handleResetForm();
                      }}
                      className="px-5 h-10 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-5 h-10 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  )}

                  {editingAssignmentId ? (
                    <button
                      type="submit"
                      className="px-6 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      Update Assignment
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <LuSend className="text-sm" />
                      Assign Work
                    </button>
                  )}
                </div>
              </form>
            </div>

          </div>

          {/* Bottom Table Section: Recent Assigned Tasks */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-md font-bold text-gray-900">Recent Assigned Tasks</h2>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                View All Assignments <span className="text-[10px]">&gt;</span>
              </a>
            </div>

            {/* Assignments Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-textColor">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">USER</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">PROJECT</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">CATEGORY</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">ROUTE / SECTION</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">SUB SECTION / PAGES</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">PRIORITY</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">STATUS</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">DUE</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">ASSIGNED ON</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center w-36">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {assignments.length > 0 ? (
                    assignments.map((item, index) => (
                      <tr
                        key={item.id}
                        id={item.id}
                        className={`hover:bg-gray-50/30 transition-colors duration-500 ${
                          editingAssignmentId === item.id
                            ? 'bg-blue-50/80 border-l-[3px] border-l-blue-600 border-y border-y-blue-100/50'
                            : item.status === 'Completed'
                              ? 'bg-green-50/20'
                              : index % 2 === 0
                                ? 'bg-white'
                                : 'bg-[#F4F8FB]/50'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-semibold text-gray-800">{item.userName}</td>
                        <td className="py-3.5 px-4 font-medium text-gray-600">{item.project}</td>
                        <td className="py-3.5 px-4 text-gray-600">{item.category}</td>
                        <td className="py-3.5 px-4 text-gray-600 max-w-[200px] truncate" title={item.routeSectionName}>
                          {item.routeSectionName}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 font-semibold">{item.subSection}</td>
                        
                        {/* Priority Badge */}
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                            item.priority === 'High'
                              ? 'bg-rose-50 text-rose-600 border-rose-100'
                              : item.priority === 'Medium'
                                ? 'bg-amber-50 text-amber-600 border-amber-100'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          }`}>
                            {item.priority}
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                            item.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : item.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-600 border-blue-100'
                                : item.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-600 border-amber-100'
                                  : 'bg-purple-50 text-purple-600 border-purple-100' // Assigned badge color
                          }`}>
                            {item.status === 'Completed' ? '✅ Completed' : item.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-gray-600 font-semibold whitespace-nowrap">
                          {formatDate(item.due)}
                        </td>
                        <td className="py-3.5 px-4 text-gray-400 text-xs whitespace-nowrap">
                          {item.assignedOn}
                        </td>

                        {/* Actions (View, Edit, Delete) */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setActiveTimelineAssignment(item)}
                              className="w-7 h-7 rounded-full border border-blue-100 bg-blue-50/50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors cursor-pointer"
                              title="View Assignment Details"
                            >
                              <LuEye className="text-xs" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAssignmentId(item.id);
                                setFormData({
                                  roadProject: item.project,
                                  routeSection: item.routeSection,
                                  category: item.category,
                                  subSection: item.subSection,
                                  priority: item.priority,
                                  dueDate: item.due,
                                  remarks: item.remarks || ''
                                });
                                // Highlight/select the associated user
                                const associatedUser = users.find(u => u.name === item.userName);
                                if (associatedUser) {
                                  setSelectedUserId(associatedUser.id || associatedUser.email);
                                }
                              }}
                              className="w-7 h-7 rounded-full border border-blue-100 bg-blue-50/50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors cursor-pointer"
                              title="Edit Assignment"
                            >
                              <LuPen className="text-xs" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteAssignment(item.id)}
                              className="w-7 h-7 rounded-full border border-red-100 bg-red-50/50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                              title="Delete Assignment"
                            >
                              <LuTrash2 className="text-xs" />
                            </button>
                            {item.status === 'Completed' ? (
                              <button
                                type="button"
                                disabled
                                className="w-7 h-7 rounded-full border border-gray-200 bg-gray-50 text-gray-400 flex items-center justify-center cursor-not-allowed"
                                title="Completed"
                              >
                                <LuCheck className="text-xs" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleCompleteAssignment(item.id)}
                                className="w-7 h-7 rounded-full border border-green-200 bg-green-50/50 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                title="Mark as Completed"
                              >
                                <LuCheck className="text-xs" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="py-12 text-center text-sm text-gray-400">
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          <LuCircleAlert className="text-xl" />
                          <span>No recent assignments found.</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Duplicate Warning Dialog Modal */}
      {duplicateError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-amber-500 border-b border-gray-100 pb-3">
              <span className="text-xl">⚠</span>
              <h3 className="text-md font-bold text-gray-900">Duplicate Assignment</h3>
            </div>
            
            <p className="text-xs text-gray-500 font-medium">This work has already been assigned.</p>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-xs border border-gray-100 text-gray-700">
              <div>
                <span className="font-bold text-gray-400 block uppercase tracking-wider text-[9px] mb-0.5">Assigned To:</span>
                <span className="font-semibold text-sm text-gray-800">{duplicateError.userName}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="font-bold text-gray-400 block uppercase tracking-wider text-[9px] mb-0.5">Project:</span>
                  <span className="font-semibold text-gray-800">{duplicateError.project}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-400 block uppercase tracking-wider text-[9px] mb-0.5">Category:</span>
                  <span className="font-semibold text-gray-800">{duplicateError.category}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="font-bold text-gray-400 block uppercase tracking-wider text-[9px] mb-0.5">Pages:</span>
                  <span className="font-semibold text-gray-800">{duplicateError.subSection}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-400 block uppercase tracking-wider text-[9px] mb-0.5">Status:</span>
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border mt-0.5 ${
                    duplicateError.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : duplicateError.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                        : duplicateError.status === 'Pending'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-purple-50 text-purple-600 border-purple-100'
                  }`}>
                    {duplicateError.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setDuplicateError(null)}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setDuplicateError(null);
                  const el = document.getElementById(duplicateError.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Visual flashing effect on row
                    el.classList.add('!bg-amber-100/50');
                    setTimeout(() => {
                      el.classList.remove('!bg-amber-100/50');
                    }, 2000);
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                View Existing Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Timeline right-side drawer */}
      {activeTimelineAssignment && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setActiveTimelineAssignment(null)}
          />
          
          {/* Inject dynamic self-contained styles for slide-in animation */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            .animate-slide-in-right {
              animation: slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}} />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in-right">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Assignment Timeline</h3>
                <p className="text-xs text-gray-400 font-medium mt-1">Task history for {activeTimelineAssignment.userName}</p>
              </div>
              <button
                onClick={() => setActiveTimelineAssignment(null)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Project Details Info Grid */}
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-gray-400 block uppercase tracking-wider text-[9px] mb-0.5">Project</span>
                <span className="font-semibold text-gray-800">{activeTimelineAssignment.project}</span>
              </div>
              <div>
                <span className="font-bold text-gray-400 block uppercase tracking-wider text-[9px] mb-0.5">Category</span>
                <span className="font-semibold text-gray-800">{activeTimelineAssignment.category}</span>
              </div>
              <div className="col-span-2">
                <span className="font-bold text-gray-400 block uppercase tracking-wider text-[9px] mb-0.5">Route / Section</span>
                <span className="font-semibold text-gray-800 block truncate" title={activeTimelineAssignment.routeSectionName}>
                  {activeTimelineAssignment.routeSectionName}
                </span>
              </div>
            </div>

            {/* Timeline Vertical Path */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTimelineAssignment.timeline && activeTimelineAssignment.timeline.length > 0 ? (
                <div className="relative border-l border-gray-200 ml-3 pl-6 space-y-6 py-2">
                  {activeTimelineAssignment.timeline.map((event, idx) => {
                    const isCompleted = event.action.includes('Completed');
                    const isAssigned = event.action.includes('Assigned');
                    const isOpened = event.action.includes('Opened');
                    return (
                      <div key={idx} className="relative">
                        {/* Circle marker */}
                        <span className={`absolute -left-[32px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                          isCompleted 
                            ? 'border-emerald-500 text-emerald-500' 
                            : isAssigned 
                              ? 'border-blue-500 text-blue-500'
                              : isOpened
                                ? 'border-amber-500 text-amber-500'
                                : 'border-purple-500 text-purple-500'
                        }`} />
                        
                        <div className="space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-sm text-gray-800 leading-tight">{event.action}</span>
                            <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">{event.timestamp}</span>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            <span className="font-semibold text-gray-400">By:</span> {event.performedBy}
                          </div>

                          {event.remarks && (
                            <div className="bg-gray-50 rounded p-2.5 text-[11px] text-gray-600 border border-gray-100/50 mt-1.5 italic whitespace-pre-line">
                              "{event.remarks}"
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-gray-400 font-medium">No timeline events recorded.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bulk Assignment Modal Panel */}
      {isBulkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsBulkOpen(false)}
          />

          {/* Modal Box */}
          <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 max-w-2xl w-full p-6 space-y-4 z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Bulk Work Assignment</h3>
                <p className="text-xs text-gray-400 font-medium mt-1">Assign ranges of pages to multiple active users simultaneously.</p>
              </div>
              <button
                onClick={() => setIsBulkOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleBulkAssign} className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Form Controls Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Road / Project Dropdown */}
                <div className="flex flex-col gap-1.5" ref={bulkProjDropdownRef}>
                  <label className="text-xs font-bold text-textColor">
                    Road / Project <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsBulkProjOpen(!isBulkProjOpen)}
                      onKeyDown={handleBulkProjKeyDown}
                      className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 text-textColor font-medium flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{bulkFormData.roadProject || 'Select Project'}</span>
                      <LuChevronDown className="text-gray-400 text-base" />
                    </button>
                    
                    {isBulkProjOpen && (
                      <div className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col overflow-hidden max-h-48">
                        <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                          <LuSearch className="text-gray-400 text-sm shrink-0" />
                          <input
                            type="text"
                            placeholder="Search project..."
                            value={bulkProjSearch}
                            onChange={(e) => {
                              setBulkProjSearch(e.target.value);
                              setBulkProjActiveIndex(0);
                            }}
                            onKeyDown={handleBulkProjKeyDown}
                            className="w-full bg-transparent text-xs focus:outline-none placeholder-gray-400 text-textColor"
                          />
                        </div>
                        <div className="overflow-y-auto divide-y divide-gray-50">
                          {bulkFilteredRoadProjects.map((project, index) => (
                            <button
                              key={project}
                              id={`bulk-proj-opt-${index}`}
                              type="button"
                              onClick={() => {
                                setBulkFormData(prev => ({ ...prev, roadProject: project }));
                                setIsBulkProjOpen(false);
                                setBulkProjSearch('');
                              }}
                              className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50/50 transition-colors font-medium ${
                                bulkFormData.roadProject === project 
                                  ? 'bg-blue-50 text-blue-600 font-bold' 
                                  : bulkProjActiveIndex === index 
                                    ? 'bg-gray-50 text-textColor'
                                    : 'text-textColor'
                              }`}
                            >
                              {project}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Route / Section Dropdown */}
                <div className="flex flex-col gap-1.5" ref={bulkRouteDropdownRef}>
                  <label className="text-xs font-bold text-textColor">
                    Route / Section <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsBulkRouteOpen(!isBulkRouteOpen)}
                      onKeyDown={handleBulkRouteKeyDown}
                      className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 text-textColor font-medium flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{bulkRouteDisplayValue}</span>
                      <LuChevronDown className="text-gray-400 text-base" />
                    </button>
                    
                    {isBulkRouteOpen && (
                      <div className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col overflow-hidden max-h-48">
                        <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                          <LuSearch className="text-gray-400 text-sm shrink-0" />
                          <input
                            type="text"
                            placeholder="Search road or project..."
                            value={bulkRouteSearch}
                            onChange={(e) => {
                              setBulkRouteSearch(e.target.value);
                              setBulkRouteActiveIndex(0);
                            }}
                            onKeyDown={handleBulkRouteKeyDown}
                            className="w-full bg-transparent text-xs focus:outline-none placeholder-gray-400 text-textColor"
                          />
                        </div>
                        <div className="overflow-y-auto divide-y divide-gray-50">
                          {bulkFilteredProjects.map((p, index) => (
                            <button
                              key={p.id}
                              id={`bulk-route-opt-${index}`}
                              type="button"
                              onClick={() => {
                                setBulkFormData(prev => ({ ...prev, routeSection: p.id }));
                                setIsBulkRouteOpen(false);
                                setBulkRouteSearch('');
                              }}
                              className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50/50 transition-colors font-medium ${
                                bulkFormData.routeSection === p.id 
                                  ? 'bg-blue-50 text-blue-600 font-bold' 
                                  : bulkRouteActiveIndex === index 
                                    ? 'bg-gray-50 text-textColor'
                                    : 'text-textColor'
                              }`}
                            >
                              {p.displayName}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-textColor">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={bulkFormData.category}
                    onChange={(e) => setBulkFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-textColor font-medium cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Total Pages Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-textColor">
                    Total Pages <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Enter total pages (e.g. 100)"
                    value={bulkFormData.totalPages}
                    onChange={(e) => setBulkFormData(prev => ({ ...prev, totalPages: e.target.value }))}
                    className="h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-textColor font-medium"
                  />
                </div>
              </div>

              {/* Checkbox: Auto Split */}
              <div className="flex items-center gap-2 py-1.5 border-y border-gray-100 bg-gray-50/50 px-3 rounded-lg">
                <input
                  type="checkbox"
                  id="autoSplitPagesCheck"
                  checked={bulkFormData.autoSplit}
                  onChange={(e) => setBulkFormData(prev => ({ ...prev, autoSplit: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="autoSplitPagesCheck" className="text-xs font-bold text-textColor cursor-pointer select-none">
                  Auto Split Pages Equally
                </label>
              </div>

              {/* Multi-select Users */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                  <label className="text-xs font-bold text-textColor">
                    Select Active Users ({bulkFormData.selectedUserIds.length} selected) <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleSelectAllBulkUsers}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {bulkFormData.selectedUserIds.length === activeBulkUsers.length ? 'Deselect All' : 'Select All Active'}
                  </button>
                </div>
                
                <div className="border border-gray-100 rounded-lg divide-y divide-gray-50 max-h-40 overflow-y-auto bg-white p-1">
                  {activeBulkUsers.length > 0 ? (
                    activeBulkUsers.map(user => {
                      const uId = user.id || user.email;
                      const isChecked = bulkFormData.selectedUserIds.includes(uId);
                      return (
                        <div 
                          key={uId}
                          onClick={() => toggleBulkUser(uId)}
                          className="flex items-center justify-between px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {renderAvatar(user)}
                            <div>
                              <span className="font-semibold text-gray-800 text-xs block">{user.name}</span>
                              <span className="text-[10px] text-gray-400 block">@{user.username || 'user'} • {user.role}</span>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // handled by click
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-400 font-medium">No active users found</div>
                  )}
                </div>
              </div>

              {/* Preview Table Display */}
              {bulkPreviewList.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-textColor block">Allocation Preview</span>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="py-2 px-3 font-semibold text-gray-500 uppercase tracking-wider text-[9px]">User</th>
                          <th className="py-2 px-3 font-semibold text-gray-500 uppercase tracking-wider text-[9px]">Calculated Range</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {bulkPreviewList.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50">
                            <td className="py-2 px-3 font-medium text-gray-700">{item.user.name}</td>
                            <td className="py-2 px-3 font-semibold text-blue-600 bg-blue-50/20">{item.range}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsBulkOpen(false)}
                  className="px-5 h-10 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedBulkUsers.length === 0 || totalPagesNum <= 0}
                  className="px-6 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                >
                  Assign Work
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default NotificationPage;
