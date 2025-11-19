// src/components/PatientModal/PersonalInfo.jsx

import React from "react";

const PersonalInfo = ({ patientData }) => {
  const user = patientData?.userId || patientData || {};

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
      </div>

      {/* Profile Image */}
      <div className="flex items-center gap-6 mb-6 pb-6 border-b">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name || "N/A"}</h3>
          <p className="text-sm text-gray-500">{user.email || "N/A"}</p>
          <p className="text-xs text-gray-400 mt-1">
            Profile image can be updated by admin
          </p>
        </div>
      </div>

      {/* Personal info fields - READ ONLY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReadOnlyField 
          label="Full Name" 
          value={user.name}
          icon={
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        <ReadOnlyField 
          label="Email" 
          value={user.email}
          icon={
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <ReadOnlyField 
          label="Phone" 
          value={user.phone}
          icon={
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        />
        <ReadOnlyField 
          label="Date of Birth" 
          value={user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "N/A"}
          icon={
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <ReadOnlyField 
          label="Gender" 
          value={user.gender}
          icon={
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        <ReadOnlyField 
          label="Address" 
          value={user.address} 
          spanFull
          icon={
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

const ReadOnlyField = ({ label, value, spanFull = false, icon }) => (
  <div className={spanFull ? "md:col-span-2" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 flex items-center">
      {icon && <span className="mr-3">{icon}</span>}
      <span>{value || "Not provided"}</span>
    </div>
  </div>
);

export default PersonalInfo;