import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    recentActivities: [],
    systemStats: {}
  });

  const [loading, setLoading] = useState(true);

  // APIs simulation
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Multiple APIs call honge yahan
        // GET /admin/doctors, GET /admin/patients, GET /admin/appointments
        
        // Dummy data - APIs response ke hisaab se
        setDashboardData({
          totalDoctors: 24,
          totalPatients: 1567,
          totalAppointments: 289,
          todayAppointments: 18,
          recentActivities: [
            { id: 1, action: 'New doctor registered', user: 'Dr. Sarah Wilson', time: '2 hours ago' },
            { id: 2, action: 'Appointment completed', user: 'John Smith', time: '3 hours ago' },
            { id: 3, action: 'Patient registered', user: 'Emily Davis', time: '5 hours ago' },
            { id: 4, action: 'Doctor availability updated', user: 'Dr. Mike Brown', time: '1 day ago' }
          ],
          systemStats: {
            activeDoctors: 20,
            inactiveDoctors: 4,
            newPatientsThisWeek: 45,
            appointmentCompletionRate: '85%'
          }
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map(n => (
                  <div key={n} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Administrator! 👑</h1>
          <p className="text-gray-600">Here's your system overview and management dashboard.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl mb-2">👨‍⚕️</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{dashboardData.totalDoctors}</div>
            <div className="text-gray-600 font-medium">Total Doctors</div>
            <div className="text-sm text-green-600 mt-1">
              {dashboardData.systemStats.activeDoctors} active
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-2xl font-bold text-green-600 mb-1">{dashboardData.totalPatients}</div>
            <div className="text-gray-600 font-medium">Total Patients</div>
            <div className="text-sm text-blue-600 mt-1">
              +{dashboardData.systemStats.newPatientsThisWeek} this week
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-2xl font-bold text-purple-600 mb-1">{dashboardData.totalAppointments}</div>
            <div className="text-gray-600 font-medium">Total Appointments</div>
            <div className="text-sm text-orange-600 mt-1">
              {dashboardData.todayAppointments} today
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-orange-600 mb-1">{dashboardData.systemStats.appointmentCompletionRate}</div>
            <div className="text-gray-600 font-medium">Completion Rate</div>
            <div className="text-sm text-gray-500 mt-1">Appointments</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Management</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/admin/doctors"
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition duration-200"
              >
                <div className="text-blue-600 text-lg mb-2">👨‍⚕️</div>
                <div className="font-medium text-blue-900 text-sm">Manage Doctors</div>
              </Link>
              
              <Link 
                to="/admin/patients"
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition duration-200"
              >
                <div className="text-green-600 text-lg mb-2">👥</div>
                <div className="font-medium text-green-900 text-sm">Manage Patients</div>
              </Link>
              
              <Link 
                to="/admin/appointments"
                className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 transition duration-200"
              >
                <div className="text-purple-600 text-lg mb-2">📅</div>
                <div className="font-medium text-purple-900 text-sm">All Appointments</div>
              </Link>
              
              <Link 
                to="/admin/reports"
                className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center hover:bg-orange-100 transition duration-200"
              >
                <div className="text-orange-600 text-lg mb-2">📊</div>
                <div className="font-medium text-orange-900 text-sm">View Reports</div>
              </Link>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {dashboardData.recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Activities →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="text-green-600 text-lg mb-2">🟢</div>
              <div className="font-medium text-green-900">System Online</div>
              <div className="text-sm text-green-700">All services operational</div>
            </div>
            <div className="text-center p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="text-blue-600 text-lg mb-2">💾</div>
              <div className="font-medium text-blue-900">Database</div>
              <div className="text-sm text-blue-700">Healthy</div>
            </div>
            <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="text-green-600 text-lg mb-2">🔐</div>
              <div className="font-medium text-green-900">Security</div>
              <div className="text-sm text-green-700">Protected</div>
            </div>
            <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="text-green-600 text-lg mb-2">⚡</div>
              <div className="font-medium text-green-900">Performance</div>
              <div className="text-sm text-green-700">Optimal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;