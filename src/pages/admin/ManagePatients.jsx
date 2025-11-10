import React, { useState, useEffect } from 'react';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // APIs simulation - Get all patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // API: GET /admin/patients
        const mockPatients = [
          {
            _id: '1',
            userId: {
              _id: 'user101',
              name: 'John Smith',
              email: 'john.smith@example.com',
              phone: '+1 (555) 123-4567',
              dateOfBirth: '1985-06-15',
              gender: 'Male',
              isActive: true
            },
            bloodGroup: 'A+',
            allergies: ['Penicillin', 'Dust'],
            emergencyContact: {
              name: 'Jane Smith',
              phone: '+1 (555) 987-6543',
              relation: 'Spouse'
            },
            createdAt: '2024-01-10T08:30:00Z'
          },
          {
            _id: '2',
            userId: {
              _id: 'user102',
              name: 'Sarah Johnson',
              email: 'sarah.j@example.com',
              phone: '+1 (555) 234-5678',
              dateOfBirth: '1990-03-20',
              gender: 'Female',
              isActive: true
            },
            bloodGroup: 'B+',
            allergies: ['Shellfish'],
            emergencyContact: {
              name: 'Mike Johnson',
              phone: '+1 (555) 876-5432',
              relation: 'Husband'
            },
            createdAt: '2024-01-08T10:15:00Z'
          },
          {
            _id: '3',
            userId: {
              _id: 'user103',
              name: 'Mike Brown',
              email: 'mike.brown@example.com',
              phone: '+1 (555) 345-6789',
              dateOfBirth: '1978-11-08',
              gender: 'Male',
              isActive: false
            },
            bloodGroup: 'O+',
            allergies: ['Peanuts', 'Latex'],
            emergencyContact: {
              name: 'Lisa Brown',
              phone: '+1 (555) 765-4321',
              relation: 'Wife'
            },
            createdAt: '2024-01-05T14:20:00Z'
          },
          {
            _id: '4',
            userId: {
              _id: 'user104',
              name: 'Emily Davis',
              email: 'emily.davis@example.com',
              phone: '+1 (555) 456-7890',
              dateOfBirth: '1995-08-12',
              gender: 'Female',
              isActive: true
            },
            bloodGroup: 'AB+',
            allergies: [],
            emergencyContact: {
              name: 'Robert Davis',
              phone: '+1 (555) 654-3210',
              relation: 'Father'
            },
            createdAt: '2024-01-03T11:45:00Z'
          }
        ];
        setPatients(mockPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.userId.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && patient.userId.isActive;
    if (filter === 'inactive') return matchesSearch && !patient.userId.isActive;
    
    return matchesSearch;
  });

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleToggleStatus = async (patientId, currentStatus) => {
    try {
      // API: Patient status update (custom endpoint)
      console.log(`Toggling patient ${patientId} status to ${!currentStatus}`);
      
      // Update local state
      setPatients(prev => prev.map(patient =>
        patient._id === patientId 
          ? { 
              ...patient, 
              userId: { ...patient.userId, isActive: !currentStatus }
            } 
          : patient
      ));
      
      alert(`Patient ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error updating patient status:', error);
      alert('Error updating patient status');
    }
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(n => (
                  <div key={n} className="h-20 bg-gray-200 rounded"></div>
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
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Manage Patients</h1>
          <p className="text-gray-600">View and manage all patient accounts</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{patients.length}</div>
            <div className="text-gray-600 text-sm">Total Patients</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {patients.filter(p => p.userId.isActive).length}
            </div>
            <div className="text-gray-600 text-sm">Active Patients</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {new Set(patients.map(p => p.bloodGroup)).size - 1} {/* Exclude null */}
            </div>
            <div className="text-gray-600 text-sm">Blood Groups</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {patients.filter(p => p.allergies.length > 0).length}
            </div>
            <div className="text-gray-600 text-sm">With Allergies</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Patients
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'active' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('inactive')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'inactive' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Patients List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredPatients.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600">No patients match your search criteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPatients.map(patient => (
                <div key={patient._id} className="p-6 hover:bg-gray-50 transition duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Patient Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {patient.userId.name}
                          </h3>
                          <p className="text-gray-600">
                            {calculateAge(patient.userId.dateOfBirth)} years • {patient.userId.gender}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            patient.userId.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {patient.userId.isActive ? 'Active' : 'Inactive'}
                          </span>
                          {patient.bloodGroup && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {patient.bloodGroup}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Email:</span> {patient.userId.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {patient.userId.phone}
                        </div>
                        <div>
                          <span className="font-medium">Registered:</span> {formatDate(patient.createdAt)}
                        </div>
                        {patient.allergies.length > 0 && (
                          <div className="md:col-span-2 lg:col-span-3">
                            <span className="font-medium">Allergies:</span>{' '}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {patient.allergies.map((allergy, index) => (
                                <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleViewDetails(patient)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleToggleStatus(patient._id, patient.userId.isActive)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                          patient.userId.isActive
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {patient.userId.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Patient Details Modal */}
        {showPatientDetails && selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Patient Details - {selectedPatient.userId.name}
                  </h3>
                  <button
                    onClick={() => setShowPatientDetails(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Full Name:</span>
                        <p className="text-gray-900">{selectedPatient.userId.name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <p className="text-gray-900">{selectedPatient.userId.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <p className="text-gray-900">{selectedPatient.userId.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Date of Birth:</span>
                        <p className="text-gray-900">{formatDate(selectedPatient.userId.dateOfBirth)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Age:</span>
                        <p className="text-gray-900">{calculateAge(selectedPatient.userId.dateOfBirth)} years</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Gender:</span>
                        <p className="text-gray-900">{selectedPatient.userId.gender}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedPatient.userId.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedPatient.userId.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Medical Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Blood Group:</span>
                        <p className="text-gray-900">{selectedPatient.bloodGroup || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Allergies:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.allergies.length > 0 ? (
                            selectedPatient.allergies.map((allergy, index) => (
                              <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                                {allergy}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">No known allergies</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Name:</span>
                          <p className="text-gray-900">{selectedPatient.emergencyContact.name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Phone:</span>
                          <p className="text-gray-900">{selectedPatient.emergencyContact.phone}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Relation:</span>
                          <p className="text-gray-900">{selectedPatient.emergencyContact.relation}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Account Information</h4>
                    <div className="text-sm text-gray-600">
                      <p>Registered on: {formatDate(selectedPatient.createdAt)}</p>
                      <p>Patient ID: {selectedPatient._id}</p>
                      <p>User ID: {selectedPatient.userId._id}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowPatientDetails(false)}
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePatients;