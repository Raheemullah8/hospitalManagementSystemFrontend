import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Dummy user data - baad mein Redux se aayega
  const user = {
    name: "John Doe",
    role: "patient", // patient, doctor, admin
    isAuthenticated: true
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  const getDashboardPath = () => {
    switch (user.role) {
      case 'patient': return '/patient/dashboard';
      case 'doctor': return '/doctor/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:block">
                HealthCare
              </span>
            </Link>
          </div>

          {/* Navigation - Show only if authenticated */}
          {user.isAuthenticated && (
            <nav className="hidden md:flex space-x-8">
              <Link 
                to={getDashboardPath()}
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  isActiveRoute(getDashboardPath()) 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </Link>
              
              {user.role === 'patient' && (
                <>
                  <Link 
                    to="/patient/appointments"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                      isActiveRoute('/patient/appointments') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    Appointments
                  </Link>
                  <Link 
                    to="/patient/medical-records"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                      isActiveRoute('/patient/medical-records') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    Medical Records
                  </Link>
                </>
              )}
            </nav>
          )}

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {user.isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user.isAuthenticated && (
          <div className="md:hidden border-t border-gray-200 pt-2 pb-3">
            <div className="flex space-x-4 overflow-x-auto">
              <Link 
                to={getDashboardPath()}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  isActiveRoute(getDashboardPath()) 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              
              {user.role === 'patient' && (
                <>
                  <Link 
                    to="/patient/appointments"
                    className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                      isActiveRoute('/patient/appointments') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Appointments
                  </Link>
                  <Link 
                    to="/patient/medical-records"
                    className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                      isActiveRoute('/patient/medical-records') 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    Records
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;