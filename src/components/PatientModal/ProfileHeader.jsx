// src/components/PatientModal/ProfileHeader.jsx

import React from "react";

const ProfileHeader = ({ isEditing, setIsEditing, patientData, onCancel }) => {
  const userName = patientData?.userId?.name || patientData?.name || "User";

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your personal and medical information
          </p>
          <div className="mt-2 flex items-start">
            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-500">
              Personal information can only be updated by admin
            </p>
          </div>
        </div>
        <button
          onClick={() => isEditing ? onCancel() : setIsEditing(true)}
          type="button"
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md ${
            isEditing 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
          }`}
        >
          {isEditing ? (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Editing
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;