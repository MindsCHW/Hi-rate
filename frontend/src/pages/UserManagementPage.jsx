import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { 
  LuUsers, 
  LuUserCheck, 
  LuUserX, 
  LuShield, 
  LuSearch, 
  LuFilterX,
  LuCheck,
  LuUserPlus,
  LuPencil,
  LuTrash2
} from 'react-icons/lu';

const UserManagementPage = () => {
  const [activePageTab, setActivePageTab] = useState('all-users'); // 'all-users' or 'add-user'
  
  // React state for storing created users locally, initialized from localStorage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('hirate-users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Synchronize users state changes to localStorage automatically
  useEffect(() => {
    localStorage.setItem('hirate-users', JSON.stringify(users));
  }, [users]);

  // React state for tracking which user is currently being edited (by email)
  const [editingUserId, setEditingUserId] = useState(null);

  // React state for deletion modal confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // React state for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Ref to name input field to focus cursor after successful creation/edit
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    role: 'User', // Default User
    roadAssignment: '',
    mobile: '',
    manager: '',
    designation: '',
    password: '',
    jobDescription: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      username: '',
      role: 'User',
      roadAssignment: '',
      mobile: '',
      manager: '',
      designation: '',
      password: '',
      jobDescription: ''
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleCancel = () => {
    handleReset();
    setEditingUserId(null);
    setActivePageTab('all-users');
  };

  const getFormattedDate = () => {
    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeStr = `${hours}:${minutes} ${ampm}`;
    return `${day} ${month} ${year}, ${timeStr}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Required fields check (Password is optional during Edit Mode)
    const isPasswordRequired = !editingUserId;

    if (
      !formData.name.trim() || 
      !formData.email.trim() || 
      !formData.username.trim() || 
      !formData.role.trim() || 
      !formData.roadAssignment.trim() || 
      !formData.mobile.trim() || 
      !formData.manager.trim() || 
      !formData.designation.trim() ||
      (isPasswordRequired && !formData.password.trim()) || 
      !formData.jobDescription.trim()
    ) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (editingUserId) {
      // EDIT MODE: Update existing record
      setUsers(prev => prev.map(u => u.email === editingUserId ? {
        ...u,
        name: formData.name.trim(),
        username: formData.username.trim(),
        manager: formData.manager.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        role: formData.role, // Administrator or User
        roadAssignment: formData.roadAssignment.trim(),
        designation: formData.designation.trim(),
        jobDescription: formData.jobDescription.trim(),
        // Status remains unchanged
        status: u.status
      } : u));

      setSuccessMessage('User updated successfully.');
      setErrorMessage('');

      // Focus back to Name input
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 50);

      // Clear toast after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } else {
      // CREATE MODE: Add new user
      const newUser = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        manager: formData.manager.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        role: formData.role, // Administrator or User
        roadAssignment: formData.roadAssignment.trim(),
        designation: formData.designation.trim(),
        jobDescription: formData.jobDescription.trim(),
        status: 'Active', // Default Active
        adminLastActive: getFormattedDate(),
        appLastActive: getFormattedDate(),
        deviceInfo: 'Web Browser',
        androidVersion: 'Android 13',
        appVersion: 'v1.2.0'
      };

      setUsers(prev => [newUser, ...prev]);

      setSuccessMessage('User created successfully.');
      setErrorMessage('');

      // Reset form to defaults
      setFormData({
        name: '',
        email: '',
        username: '',
        role: 'User',
        roadAssignment: '',
        mobile: '',
        manager: '',
        designation: '',
        password: '',
        jobDescription: ''
      });

      // Auto-focus back to Name input field
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 50);

      // Keep message visible for 3 seconds, then clear it
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.email);
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      roadAssignment: user.roadAssignment,
      mobile: user.mobile,
      manager: user.manager,
      designation: user.designation,
      password: '', // Leave password blank / optional on edit
      jobDescription: user.jobDescription
    });
    setActivePageTab('add-user');
  };

  const handleStatusChange = (email, newStatus) => {
    setUsers(prev => prev.map(u => u.email === email ? {
      ...u,
      status: newStatus
    } : u));

    setSuccessMessage('User status updated successfully.');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.email !== userToDelete.email));
      
      // Reset editing if we deleted the currently edited user
      if (editingUserId === userToDelete.email) {
        setEditingUserId(null);
        handleReset();
      }

      setSuccessMessage('User deleted successfully.');
      setShowDeleteModal(false);
      setUserToDelete(null);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setRoleFilter('');
    setStatusFilter('');
  };

  // Derive stats dynamically from the main state
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const administrators = users.filter(
    u => u.role.toLowerCase() === 'administrator' || u.role.toLowerCase() === 'admin'
  ).length;

  const stats = [
    { label: 'Total Users', value: totalUsers.toString(), icon: LuUsers, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Active Users', value: activeUsers.toString(), icon: LuUserCheck, color: 'text-green-600 bg-green-50 border-green-100' },
    { label: 'Inactive Users', value: inactiveUsers.toString(), icon: LuUserX, color: 'text-red-600 bg-red-50 border-red-100' },
    { label: 'Administrators', value: administrators.toString(), icon: LuShield, color: 'text-purple-600 bg-purple-50 border-purple-100' }
  ];

  // Client-side search and filters combination logic
  const filteredUsers = users.filter(user => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      user.name.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.mobile.toLowerCase().includes(q);

    const matchesRole = !roleFilter || 
      user.role.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus = !statusFilter || 
      user.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-pageBg">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold text-textColor">User Management</h1>
              <p className="text-muted text-sm mt-1">Manage employee roles, access permissions, and account status across departments.</p>
            </div>

            {/* Top Action Bar */}
            <div className="flex items-center justify-between h-[46px] w-full shrink-0">
              {/* Left: All Users tab */}
              <button
                onClick={() => {
                  setActivePageTab('all-users');
                  setEditingUserId(null);
                  handleReset();
                }}
                className={`group relative flex items-center gap-3 h-full px-5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
                  activePageTab === 'all-users'
                    ? 'bg-[#2563EB] text-white border-none'
                    : 'bg-white border border-borderColor border-l-4 border-l-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] hover:-translate-y-0.5'
                }`}
              >
                <LuUsers className={`text-[20px] transition-colors duration-200 ${
                  activePageTab === 'all-users' ? 'text-white' : 'text-[#2563EB]'
                }`} />
                <span>All Users</span>
              </button>

              {/* Right: Add User Button */}
              {activePageTab === 'all-users' && (
                <button
                  onClick={() => setActivePageTab('add-user')}
                  className="group flex items-center gap-2 h-[46px] px-[26px] bg-white border border-[#2563EB] text-[#2563EB] rounded-xl text-sm font-medium shadow-sm hover:shadow hover:-translate-y-0.5 hover:bg-[#2563EB] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <LuUserPlus className="text-[20px] text-[#2563EB] group-hover:text-white transition-colors duration-200" />
                  <span>Add User</span>
                </button>
              )}
            </div>
          </div>

          {/* Alert Success / Error Toast Banners on Listing Page */}
          {activePageTab === 'all-users' && successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
              <span className="font-bold">✓</span> {successMessage}
            </div>
          )}

          {/* Conditional Content based on selected Tab */}
          {activePageTab === 'all-users' ? (
            <>
              {/* Stats Overview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-white rounded p-4 border border-borderColor shadow-sm flex items-center gap-4">
                      <div className={`p-3 rounded-lg border ${item.color.split(' ').slice(1).join(' ')}`}>
                        <Icon className={`text-xl ${item.color.split(' ')[0]}`} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</p>
                        <h3 className="text-2xl font-bold text-textColor mt-0.5">{item.value}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Main Table Card */}
              <div className="bg-white rounded shadow-sm border border-borderColor flex flex-col overflow-hidden">
                {/* Enterprise Search & Filter Toolbar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border-b border-borderColor bg-white">
                  {/* Left Side: Large rounded search bar */}
                  <div className="relative flex-1 max-w-md group">
                    <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by Name, Username, Email or Mobile Number..."
                      className="w-full pl-11 pr-4 h-[40px] border border-borderColor rounded-full text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-all duration-200 text-textColor placeholder-gray-400"
                    />
                  </div>

                  {/* Right Side: Dropdown filters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="border border-borderColor rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-700 font-medium cursor-pointer shadow-sm transition-all duration-200"
                    >
                      <option value="">Role: All</option>
                      <option value="Administrator">Administrator</option>
                      <option value="User">User</option>
                    </select>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-borderColor rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-gray-700 font-medium cursor-pointer shadow-sm transition-all duration-200"
                    >
                      <option value="">Status: All</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <button
                      onClick={handleClearFilters}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200 border border-transparent hover:border-blue-100 shadow-sm cursor-pointer"
                    >
                      <LuFilterX className="text-base" />
                      Clear Filters
                    </button>
                  </div>
                </div>

                {/* Empty Table Section */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left text-textColor table-auto">
                    <thead className="text-xs text-gray-500 uppercase border-b border-borderColor bg-white sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Name</th>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">User Name</th>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Reporting Manager</th>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Mobile Number</th>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Email</th>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Designation</th>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Job Description</th>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Role</th>
                        <th className="px-4 py-3.5 font-semibold text-center whitespace-nowrap">Status</th>
                        <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Last Active</th>
                        <th className="px-4 py-3.5 font-semibold text-center whitespace-nowrap w-[120px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr className="bg-white">
                          <td colSpan={11} className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 border border-blue-100 shadow-sm">
                                <LuUsers className="text-3xl" />
                              </div>
                              <h3 className="text-lg font-semibold text-textColor mb-1">No users found</h3>
                              <p className="text-sm text-muted text-center leading-relaxed">
                                There are currently no users available.
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : filteredUsers.length === 0 ? (
                        <tr className="bg-white">
                          <td colSpan={11} className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 border border-blue-100 shadow-sm animate-pulse">
                                <LuUsers className="text-3xl" />
                              </div>
                              <h3 className="text-lg font-semibold text-textColor mb-1">No matching users found</h3>
                              <p className="text-sm text-muted text-center mb-6 leading-relaxed">
                                Try changing your search or filter criteria.
                              </p>
                              <button
                                onClick={handleClearFilters}
                                className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-[#0056B3] text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer"
                              >
                                <LuFilterX className="text-base" />
                                Reset Filters
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user, index) => (
                          <tr
                            key={index}
                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                              index % 2 === 0 ? 'bg-white' : 'bg-[#F4F8FB]'
                            }`}
                          >
                            <td className="px-4 py-3.5 font-medium text-gray-700 whitespace-nowrap">{user.name}</td>
                            <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{user.username}</td>
                            <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{user.manager}</td>
                            <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{user.mobile}</td>
                            <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{user.email}</td>
                            <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{user.designation}</td>
                            <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis">{user.jobDescription}</td>
                            <td className="px-4 py-3.5 font-medium text-gray-700 whitespace-nowrap">{user.role}</td>
                            <td className="px-4 py-3.5 text-center whitespace-nowrap">
                              <select
                                value={user.status}
                                onChange={(e) => handleStatusChange(user.email, e.target.value)}
                                className={`h-[34px] px-3.5 rounded-full text-xs font-bold border border-gray-200 outline-none transition-all duration-200 cursor-pointer text-center appearance-none ${
                                  user.status === 'Active' 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200 focus:border-green-300' 
                                    : 'bg-red-100 text-red-800 hover:bg-red-200 focus:border-red-300'
                                }`}
                                style={{ textAlignLast: 'center' }}
                              >
                                <option value="Active" className="bg-white text-gray-800">🟢 Active</option>
                                <option value="Inactive" className="bg-white text-gray-800">🔴 Inactive</option>
                              </select>
                            </td>
                            <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{user.adminLastActive}</td>
                            <td className="px-4 py-3.5 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleEditClick(user)}
                                  className="w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#2563EB] text-[#2563EB] rounded-lg shadow-sm hover:bg-[#2563EB] hover:text-white transition-all duration-200 cursor-pointer"
                                  title="Edit User"
                                >
                                  <LuPencil className="text-base" />
                                </button>
                                <button
                                  onClick={() => {
                                    setUserToDelete(user);
                                    setShowDeleteModal(true);
                                  }}
                                  className="w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#EF4444] text-[#EF4444] rounded-lg shadow-sm hover:bg-[#EF4444] hover:text-white transition-all duration-200 cursor-pointer"
                                  title="Delete User"
                                >
                                  <LuTrash2 className="text-base" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Add User View: Form Container */
            <div className="bg-white rounded-2xl border border-borderColor shadow-sm max-w-4xl p-6">
              {/* Section Header */}
              <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-gray-100">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <LuCheck className="text-xs font-bold" />
                </div>
                <h3 className="text-base font-bold text-textColor">
                  {editingUserId ? 'Edit User' : 'Enter User Details'}
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Success & Error alerts */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <span className="font-bold">✓</span> {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <span className="font-bold">⚠</span> {errorMessage}
                  </div>
                )}

                {/* Form Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Left Column */}
                  <div className="flex flex-col gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">Name *</label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Name"
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200"
                        required
                        disabled={!!editingUserId} // Disallow email editing as it is the unique key
                      />
                    </div>

                    {/* User Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">User Name *</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter User Name"
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* User Role */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">User Role *</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor cursor-pointer"
                        required
                      >
                        <option value="User">User</option>
                        <option value="Administrator">Administrator</option>
                      </select>
                    </div>

                    {/* Designation */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">Designation *</label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="Enter Designation"
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Add Roads */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">Add Roads *</label>
                      <input
                        type="text"
                        name="roadAssignment"
                        value={formData.roadAssignment}
                        onChange={handleInputChange}
                        placeholder="Enter Road Name"
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-6">
                    {/* Mobile Number */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter Mobile Number"
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Reporting Manager */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">Reporting Manager *</label>
                      <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleInputChange}
                        placeholder="Enter Reporting Manager Name"
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">
                        Password {editingUserId ? '(Optional)' : '*'}
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter Password"
                        className="h-[46px] px-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200"
                        required={!editingUserId}
                      />
                    </div>

                    {/* Job Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-textColor">Job Description *</label>
                      <textarea
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        placeholder="Enter Job Description"
                        className="h-[120px] p-4 border border-borderColor rounded-xl text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-textColor placeholder-gray-400 transition-all duration-200 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-borderColor mt-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-5 h-[46px] border border-borderColor rounded-xl text-sm font-semibold text-textColor hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 h-[46px] border border-borderColor rounded-xl text-sm font-semibold text-textColor hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    >
                      Reset
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="px-6 h-[46px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                  >
                    {editingUserId ? 'Save Changes' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal Dialog */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-2xl border border-borderColor shadow-lg p-6 max-w-sm w-full mx-4 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-textColor">Delete User?</h3>
              <p className="text-sm text-muted mt-2">
                Are you sure you want to delete this user?
              </p>
              <p className="text-sm text-muted mt-1 font-semibold text-red-600">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 border border-borderColor rounded-xl text-sm font-semibold text-textColor hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
