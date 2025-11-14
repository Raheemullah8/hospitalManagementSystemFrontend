import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetAllDoctorsQuery } from '../../store/services/DoctorApi';
import { useGetAvailableSlotsQuery, useCreateAppointmentMutation } from '../../store/services/AppointmentApi';

const BookAppointment = () => {
  const { data: doctorsData, isLoading, isError } = useGetAllDoctorsQuery();
  const doctors = doctorsData?.data?.doctors || [];

  // RHF setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      doctorId: '',
      appointmentDate: '',
      timeSlot: '',
      reason: '',
    },
  });

  const selectedDoctor = watch('doctorId');
  const selectedDate = watch('appointmentDate');
  const selectedTime = watch('timeSlot');

  const currentDoctor = doctors.find((doc) => doc._id === selectedDoctor);

  // Available slots API
  const { data: slotsData, isLoading: slotsLoading } = useGetAvailableSlotsQuery(
    { doctorId: selectedDoctor, date: selectedDate },
    { skip: !selectedDoctor || !selectedDate }
  );

  const availableTimeSlots = slotsData?.data?.availableSlots || [];

  // Create appointment mutation
  const [createAppointment, { isLoading: isBooking }] = useCreateAppointmentMutation();

  // Get available days for the selected doctor
  const availableDays = useMemo(() => {
    if (!currentDoctor) return [];
    return (
      currentDoctor.availableSlots
        ?.filter((slot) => slot.isAvailable)
        .map((slot) => slot.day) || []
    );
  }, [currentDoctor]);

  // Check if selected date is valid
  const isDateAvailable = (dateString) => {
    if (!dateString || !currentDoctor) return false;
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
    return availableDays.includes(dayName);
  };

  // Form Submit Handler
  const onSubmit = async (data) => {
    if (!isDateAvailable(data.appointmentDate)) {
      alert('Doctor is not available on this selected day!');
      return;
    }

    try {
      const result = await createAppointment(data).unwrap();
      console.log('Appointment booked:', result);
      alert('Appointment booked successfully! ✅');
      reset(); // reset RHF form
    } catch (error) {
      console.error('Booking error:', error);
      alert(error?.data?.message || 'Failed to book appointment. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-800">Error loading doctors. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600">Schedule your visit with our healthcare professionals</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Doctor Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor *
              </label>
              <select
                {...register('doctorId', { required: 'Doctor selection is required' })}
                onChange={(e) => {
                  setValue('doctorId', e.target.value);
                  setValue('appointmentDate', '');
                  setValue('timeSlot', '');
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.userId?.name} - {doctor.userId?.specialization}
                  </option>
                ))}
              </select>
              {errors.doctorId && (
                <p className="text-sm text-red-600 mt-1">{errors.doctorId.message}</p>
              )}
            </div>

            {/* Doctor Availability Info */}
            {currentDoctor && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3">✓ Doctor Availability Schedule</h3>
                <div className="space-y-2">
                  {currentDoctor.availableSlots
                    ?.filter((slot) => slot.isAvailable)
                    .map((slot, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white rounded-lg p-3 border border-green-200"
                      >
                        <span className="font-medium text-green-900">{slot.day}</span>
                        <span className="text-green-700 text-sm font-medium">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                    ))}
                </div>
                {currentDoctor.roomNumber && (
                  <div className="mt-3 text-sm text-green-800">
                    📍 Room Number: <span className="font-semibold">{currentDoctor.roomNumber}</span>
                  </div>
                )}
              </div>
            )}

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date *
              </label>
              <input
                type="date"
                {...register('appointmentDate', { required: 'Appointment date is required' })}
                min={new Date().toISOString().split('T')[0]}
                disabled={!selectedDoctor}
                onChange={(e) => {
                  setValue('appointmentDate', e.target.value);
                  setValue('timeSlot', '');
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.appointmentDate && (
                <p className="text-sm text-red-600 mt-1">{errors.appointmentDate.message}</p>
              )}
              {selectedDate && !isDateAvailable(selectedDate) && (
                <p className="mt-2 text-sm text-red-600">
                  ⚠️ Doctor is not available on this day. Please select another date.
                </p>
              )}
            </div>

            {/* Time Slot Selection */}
            {selectedDate && isDateAvailable(selectedDate) && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Time Slots *
                </label>
                {slotsLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-sm text-gray-600">Loading available slots...</p>
                  </div>
                ) : availableTimeSlots.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-600 mb-3">
                      {availableTimeSlots.length} slots available
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setValue('timeSlot', slot)}
                          className={`p-3 border rounded-lg text-center transition duration-200 font-medium ${
                            selectedTime === slot
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.timeSlot && (
                      <p className="text-sm text-red-600 mt-1">{errors.timeSlot.message}</p>
                    )}
                  </>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800">
                      😔 No time slots available for this date. Please try another date.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Reason for Appointment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Appointment *
              </label>
              <textarea
                {...register('reason', { required: 'Reason is required' })}
                placeholder="Describe your symptoms or reason for visit..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.reason && (
                <p className="text-sm text-red-600 mt-1">{errors.reason.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isBooking}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isBooking ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Booking...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </button>
              <Link
                to="/patient/appointments"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-200 text-center"
              >
                View My Appointments
              </Link>
            </div>
          </form>
        </div>

        {/* Quick Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Before Your Visit</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Arrive 15 minutes before your scheduled time</li>
            <li>• Bring your ID and insurance card</li>
            <li>• Note down any medications you're currently taking</li>
            <li>• Prepare questions for your doctor</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
