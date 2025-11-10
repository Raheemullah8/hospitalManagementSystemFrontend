import React, { useState, useEffect } from 'react';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    consultationFee: '',
    roomNumber: '',
    department: ''
  });

  // APIs simulation - Get all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // API: GET /admin/doctors
        const mockDoctors = [
          {
            _id: '1',
            userId: {
              _id: 'user1',
              name: 'Dr. Sarah Smith',
              email: 'sarah.smith@hospital.com',
              phone: '+1 (555) 123-4567',
              specialization: 'Cardiology',
              experience: 12,
              consultationFee: 150,
              isActive: true
            },
            roomNumber: '301-A',
            maxPatientsPerDay: 20,
            isAvailable: true,
            todayPatientCount: 8
          },
          {
            _id: '2',
            userId: {
              _id: 'user2',
              name: 'Dr. Mike Johnson',
              email: 'mike.johnson@hospital.com',
              phone: '+1 (555) 234-5678',
              specialization: 'Dermatology',
              experience: 8,
              consultationFee: 120,
              isActive: true
            },
            roomNumber: '205-B',
            maxPatientsPerDay: 15,
            isAvailable: true,
            todayPatientCount: 5
          },
          {
            _id: '3',
            userId: {
              _id: 'user3',
              name: 'Dr. Emily Brown',
              email: 'emily.brown@hospital.com',
              phone: '+1 (555) 345-6789',
              specialization: 'Pediatrics',
              experience: 10,
              consultationFee: 100,
              isActive: false
            },
            roomNumber: '102-C',
            maxPatientsPerDay: 18,
            isAvailable: false,
            todayPatientCount: 0
          }
        ];
        setDoctors(mockDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.userId.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && doctor.userId.isActive;
    if (filter === 'inactive') return matchesSearch && !doctor.userId.isActive;
    if (filter === 'available') return matchesSearch && doctor.isAvailable;
    
    return matchesSearch;
  });

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      // API: POST /admin/doctors
      console.log('Adding new doctor:', newDoctor);
      
      // Add to local state
      const doctorToAdd = {
        _id: Date.now().toString(),
        userId: {
          ...newDoctor,
          isActive: true
        },
        roomNumber: newDoctor.roomNumber,
        maxPatientsPerDay: 20,
        isAvailable: true,
        todayPatientCount: 0
      };
      
      setDoctors(prev => [doctorToAdd, ...prev]);
      setShowAddForm(false);
      setNewDoctor({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        licenseNumber: '',
        experience: '',
        consultationFee: '',
        roomNumber: '',
        department: ''
      });
      
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Error adding doctor');
    }
  };

  const handleToggleStatus = async (doctorId, currentStatus) => {
    try {
      // API: PUT /admin/doctors/:id (for deactivation)
      console.log(`Toggling doctor ${doctorId} status to ${!currentStatus}`);
      
      // Update local state
      setDoctors(prev => prev.map(doctor =>
        doctor._id === doctorId 
          ? { 
              ...doctor, 
              userId: { ...doctor.userId, isActive: !currentStatus },
              isAvailable: !currentStatus
            } 
          : doctor
      ));
      
      alert(`Doctor ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error updating doctor status:', error);
      alert('Error updating doctor status');
    }
  };

  const handleDeleteDoctor = async (doctorId, doctorName) => {
    if (window.confirm(`Are you sure you want to delete ${doctorName}? This action cannot be undone.`)) {
      try {
        // API: DELETE /admin/doctors/:id
        console.log('Deleting doctor:', doctorId);
        
        // Remove from local state
        setDoctors(prev => prev.filter(doctor => doctor._id !== doctorId));
        
        alert('Doctor deleted successfully!');
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Error deleting doctor');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({
      ...prev,
      [name]: value
    }));
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
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Doctors</h1>
            <p className="text-gray-600">Add, edit, and manage hospital doctors</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            + Add New Doctor
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{doctors.length}</div>
            <div className="text-gray-600 text-sm">Total Doctors</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {doctors.filter(d => d.userId.isActive).length}
            </div>
            <div className="text-gray-600 text-sm">Active Doctors</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {doctors.filter(d => d.isAvailable).length}
            </div>
            <div className="text-gray-600 text-sm">Available Today</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {new Set(doctors.map(d => d.userId.specialization)).size}
            </div>
            <div className="text-gray-600 text-sm">Specializations</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or specialization..."
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
                All Doctors
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
              <button
                onClick={() => setFilter('available')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'available' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Available
              </button>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredDoctors.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">👨‍⚕️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">No doctors match your search criteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredDoctors.map(doctor => (
                <div key={doctor._id} className="p-6 hover:bg-gray-50 transition duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {doctor.userId.name}
                          </h3>
                          <p className="text-gray-600">{doctor.userId.specialization}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            doctor.userId.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {doctor.userId.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            doctor.isAvailable 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {doctor.isAvailable ? 'Available' : 'Not Available'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Email:</span> {doctor.userId.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {doctor.userId.phone}
                        </div>
                        <div>
                          <span className="font-medium">Experience:</span> {doctor.userId.experience} years
                        </div>
                        <div>
                          <span className="font-medium">Fee:</span> ${doctor.userId.consultationFee}
                        </div>
                        <div>
                          <span className="font-medium">Room:</span> {doctor.roomNumber}
                        </div>
                        <div>
                          <span className="font-medium">Patients Today:</span> {doctor.todayPatientCount}/{doctor.maxPatientsPerDay}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleToggleStatus(doctor._id, doctor.userId.isActive)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                          doctor.userId.isActive
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {doctor.userId.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDoctor(doctor._id, doctor.userId.name)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Doctor Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Add New Doctor</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleAddDoctor}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={newDoctor.name}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={newDoctor.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newDoctor.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                      <input
                        type="text"
                        name="specialization"
                        value={newDoctor.specialization}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={newDoctor.licenseNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years) *</label>
                      <input
                        type="number"
                        name="experience"
                        value={newDoctor.experience}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee ($) *</label>
                      <input
                        type="number"
                        name="consultationFee"
                        value={newDoctor.consultationFee}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room Number *</label>
                      <input
                        type="text"
                        name="roomNumber"
                        value={newDoctor.roomNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={newDoctor.department}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                    >
                      Add Doctor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDoctors;