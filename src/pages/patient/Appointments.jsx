import React, { useState } from 'react';

const PatientAppointments = () => {
  // Dummy data - backend APIs ke hisaab se structure
  const appointments = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Smith',
      specialization: 'Cardiology',
      appointmentDate: '2024-01-15',
      appointmentTime: '10:00 AM',
      timeSlot: '10:00 AM - 10:30 AM',
      status: 'scheduled',
      reason: 'Heart checkup and consultation',
      diagnosis: '',
      prescription: ''
    },
    {
      id: 2,
      doctorName: 'Dr. Mike Johnson',
      specialization: 'Dermatology',
      appointmentDate: '2024-01-10',
      appointmentTime: '02:30 PM',
      timeSlot: '02:30 PM - 03:00 PM',
      status: 'completed',
      reason: 'Skin allergy treatment',
      diagnosis: 'Contact Dermatitis',
      prescription: 'Antihistamine tablets for 5 days'
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Brown',
      specialization: 'Pediatrics',
      appointmentDate: '2024-01-18',
      appointmentTime: '11:00 AM',
      timeSlot: '11:00 AM - 11:30 AM',
      status: 'scheduled',
      reason: 'Child vaccination',
      diagnosis: '',
      prescription: ''
    },
    {
      id: 4,
      doctorName: 'Dr. Sarah Smith',
      specialization: 'Cardiology',
      appointmentDate: '2024-01-05',
      appointmentTime: '09:00 AM',
      timeSlot: '09:00 AM - 09:30 AM',
      status: 'cancelled',
      reason: 'Routine heart checkup',
      diagnosis: '',
      prescription: ''
    }
  ];

  const [filter, setFilter] = useState('all');

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      // Baad mein API call hoga: PUT /api/v1/appointments/:id/cancel
      console.log('Cancelling appointment:', appointmentId);
      alert('Appointment cancelled successfully!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600">Manage and track your medical appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {appointments.filter(a => a.status === 'scheduled').length}
            </div>
            <div className="text-gray-600 text-sm">Upcoming</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {appointments.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {appointments.filter(a => a.status === 'cancelled').length}
            </div>
            <div className="text-gray-600 text-sm">Cancelled</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-600 mb-1">
              {appointments.length}
            </div>
            <div className="text-gray-600 text-sm">Total</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Appointments
            </button>
            <button
              onClick={() => setFilter('scheduled')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'scheduled' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'completed' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'cancelled' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600">You don't have any {filter !== 'all' ? filter : ''} appointments.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map(appointment => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Appointment Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.doctorName}
                          </h3>
                          <p className="text-gray-600">{appointment.specialization}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date & Time:</span>{' '}
                          {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
                        </div>
                        <div>
                          <span className="font-medium">Slot:</span> {appointment.timeSlot}
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium">Reason:</span> {appointment.reason}
                        </div>
                        
                        {/* Show diagnosis and prescription for completed appointments */}
                        {appointment.status === 'completed' && (
                          <>
                            <div className="md:col-span-2">
                              <span className="font-medium">Diagnosis:</span> {appointment.diagnosis}
                            </div>
                            <div className="md:col-span-2">
                              <span className="font-medium">Prescription:</span> {appointment.prescription}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                      {appointment.status === 'scheduled' && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-200"
                        >
                          Cancel
                        </button>
                      )}
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;