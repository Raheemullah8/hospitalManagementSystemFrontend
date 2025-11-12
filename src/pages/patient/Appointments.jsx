import React, { useState, useMemo } from 'react';
import { 
  useGetPatientAppointmentsQuery,
  useCancelAppointmentMutation // Import the mutation hook
} from '../../store/services/AppointmentApi';

const PatientAppointments = () => {

  const { data: patientAppoinments, isLoading, isError, refetch } = useGetPatientAppointmentsQuery();
  const [cancelAppointment, { isLoading: isCancelling }] = useCancelAppointmentMutation();
  
  const appointmentsData = patientAppoinments?.data?.appointments || [];

  const [filter, setFilter] = useState('all');

  // --- Utility Functions/Hooks for Data Processing ---

  const stats = useMemo(() => {
    const scheduled = appointmentsData.filter(a => a.status === 'scheduled').length;
    const completed = appointmentsData.filter(a => a.status === 'completed').length;
    const cancelled = appointmentsData.filter(a => a.status === 'cancelled').length;
    const total = appointmentsData.length;
    return { scheduled, completed, cancelled, total };
  }, [appointmentsData]);


  const filteredAppointments = useMemo(() => {
    if (filter === 'all') return appointmentsData;
    return appointmentsData.filter(apt => apt.status === filter);
  }, [appointmentsData, filter]);


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

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
      try {
        await cancelAppointment(appointmentId).unwrap();
        // RTK Query handles refetching via invalidatesTags, but we can refetch manually too
        // refetch(); 
        alert('Appointment cancelled successfully!');
      } catch (error) {
        console.error("Cancellation failed:", error);
        alert(`Failed to cancel appointment. ${error.data?.message || 'Please try again.'}`);
      }
    }
  };

  // --- Rendering Logic for States ---

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center p-10">
        <p className="text-xl font-medium text-blue-600">Loading Appointments... ⏳</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-center p-10 bg-red-50 rounded-lg shadow">
        <h3 className="text-xl font-bold text-red-600 mb-2">Error Fetching Appointments 🚨</h3>
        <p className="text-gray-700">Something went wrong while retrieving your appointments. Please try again later.</p>
      </div>
    );
  }

  // --- Main Component Render ---

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
              {stats.scheduled}
            </div>
            <div className="text-gray-600 text-sm">Upcoming</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {stats.completed}
            </div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {stats.cancelled}
            </div>
            <div className="text-gray-600 text-sm">Cancelled</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-600 mb-1">
              {stats.total}
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
              <p className="text-gray-600">You don't have any **{filter !== 'all' ? filter : ''}** appointments.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map(appointment => (
                <div key={appointment._id} className="p-6 hover:bg-gray-50 transition duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Appointment Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.doctorId?.userId?.name || 'Doctor Name Not Found'} 
                          </h3>
                          <p className="text-gray-600">
                            {appointment.doctorId?.userId?.specialization || 'Specialization Not Found'}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date & Time:</span>{' '}
                          {new Date(appointment.appointmentDate).toLocaleDateString()} at **{appointment.appointmentTime}**
                        </div>
                        <div>
                          <span className="font-medium">Fee:</span> **Rs. {appointment.doctorId?.userId?.consultationFee || 'N/A'}**
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium">Reason:</span> {appointment.reason}
                        </div>
                        
                        {/* Show diagnosis and prescription for completed appointments */}
                        {appointment.status === 'completed' && (
                          <>
                            <div className="md:col-span-2">
                              <span className="font-medium">Diagnosis:</span> {appointment.diagnosis || 'N/A'}
                            </div>
                            <div className="md:col-span-2">
                              <span className="font-medium">Prescription:</span> {appointment.prescription || 'N/A'}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                      {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                        <button
                          onClick={() => handleCancelAppointment(appointment._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-200 disabled:bg-red-300"
                          disabled={isCancelling}
                        >
                          {isCancelling ? 'Cancelling...' : 'Cancel'}
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