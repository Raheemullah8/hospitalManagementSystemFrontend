import React from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
          <p className="text-gray-600">Here's your healthcare overview and recent activities.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">3</div>
            <div className="text-gray-600 font-medium">Upcoming Appointments</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-2xl font-bold text-green-600 mb-1">12</div>
            <div className="text-gray-600 font-medium">Medical Records</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl mb-2">💊</div>
            <div className="text-2xl font-bold text-purple-600 mb-1">2</div>
            <div className="text-gray-600 font-medium">Active Prescriptions</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/patient/book-appointment"  // ✅ Correct route
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition duration-200"
            >
              <div className="text-blue-600 text-lg mb-2">📅</div>
              <div className="font-medium text-blue-900">Book Appointment</div>
            </Link>

            <Link
              to="/patient/appointments"
              className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition duration-200"
            >
              <div className="text-green-600 text-lg mb-2">👁️</div>
              <div className="font-medium text-green-900">View Appointments</div>
            </Link>

            <Link
              to="/patient/medical-records"
              className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 transition duration-200"
            >
              <div className="text-purple-600 text-lg mb-2">📋</div>
              <div className="font-medium text-purple-900">Medical Records</div>
            </Link>
            <Link 
            to={"/patient/profile"}>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-gray-600 text-lg mb-2">👤</div>
              <div className="font-medium text-gray-900">Profile</div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;