import React, { useState } from 'react';

const DoctorAvailability = () => {
  // Dummy data - backend Doctor model ke availableSlots ke hisaab se
  const [availability, setAvailability] = useState({
    maxPatientsPerDay: 20,
    isAvailable: true,
    availableSlots: [
      {
        day: "Monday",
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        isAvailable: true
      },
      {
        day: "Tuesday", 
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        isAvailable: true
      },
      {
        day: "Wednesday",
        startTime: "09:00 AM", 
        endTime: "05:00 PM",
        isAvailable: true
      },
      {
        day: "Thursday",
        startTime: "09:00 AM",
        endTime: "05:00 PM", 
        isAvailable: true
      },
      {
        day: "Friday",
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        isAvailable: true
      },
      {
        day: "Saturday", 
        startTime: "10:00 AM",
        endTime: "02:00 PM",
        isAvailable: false
      },
      {
        day: "Sunday",
        startTime: "",
        endTime: "",
        isAvailable: false
      }
    ]
  });

  const timeOptions = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", 
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  const handleDayToggle = (dayIndex) => {
    const updatedSlots = [...availability.availableSlots];
    updatedSlots[dayIndex].isAvailable = !updatedSlots[dayIndex].isAvailable;
    
    // Agar available nahi hai toh time slots clear karo
    if (!updatedSlots[dayIndex].isAvailable) {
      updatedSlots[dayIndex].startTime = "";
      updatedSlots[dayIndex].endTime = "";
    } else {
      // Default time slots set karo
      updatedSlots[dayIndex].startTime = "09:00 AM";
      updatedSlots[dayIndex].endTime = "05:00 PM";
    }
    
    setAvailability(prev => ({
      ...prev,
      availableSlots: updatedSlots
    }));
  };

  const handleTimeChange = (dayIndex, field, value) => {
    const updatedSlots = [...availability.availableSlots];
    updatedSlots[dayIndex][field] = value;
    
    setAvailability(prev => ({
      ...prev,
      availableSlots: updatedSlots
    }));
  };

  const handleMaxPatientsChange = (value) => {
    setAvailability(prev => ({
      ...prev,
      maxPatientsPerDay: value
    }));
  };

  const handleAvailabilityToggle = () => {
    setAvailability(prev => ({
      ...prev,
      isAvailable: !prev.isAvailable
    }));
  };

  const handleSaveAvailability = () => {
    // Baad mein API call hoga: PUT /api/v1/doctors/availability
    console.log('Saving availability:', availability);
    alert('Availability settings saved successfully!');
  };

  const generateTimeSlotsPreview = (day) => {
    if (!day.isAvailable) return "Not Available";
    
    const start = day.startTime;
    const end = day.endTime;
    
    if (!start || !end) return "Time not set";
    
    return `${start} - ${end}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Availability Management</h1>
          <p className="text-gray-600">Set your working hours and appointment availability</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Availability Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h2>
              
              {/* Overall Availability Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                <div>
                  <h3 className="font-medium text-gray-900">Overall Availability</h3>
                  <p className="text-sm text-gray-600">
                    {availability.isAvailable ? 'You are available for appointments' : 'You are not accepting appointments'}
                  </p>
                </div>
                <button
                  onClick={handleAvailabilityToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    availability.isAvailable ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      availability.isAvailable ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Days Schedule */}
              <div className="space-y-4">
                {availability.availableSlots.map((day, index) => (
                  <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleDayToggle(index)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            day.isAvailable ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              day.isAvailable ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className="font-medium text-gray-900 min-w-24">{day.day}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {generateTimeSlotsPreview(day)}
                      </span>
                    </div>

                    {day.isAvailable && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Time
                          </label>
                          <select
                            value={day.startTime}
                            onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select start time</option>
                            {timeOptions.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Time
                          </label>
                          <select
                            value={day.endTime}
                            onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select end time</option>
                            {timeOptions.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Settings & Preview */}
          <div className="space-y-6">
            {/* Patient Capacity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Capacity</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Patients Per Day
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={availability.maxPatientsPerDay}
                      onChange={(e) => handleMaxPatientsChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-lg font-bold text-blue-600 min-w-12">
                      {availability.maxPatientsPerDay}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This limits the number of appointments you can accept per day
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Preview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability Preview</h2>
              
              <div className="space-y-3">
                {availability.availableSlots.map(day => (
                  <div key={day.day} className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-700">{day.day}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      day.isAvailable && day.startTime && day.endTime 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {day.isAvailable && day.startTime && day.endTime 
                        ? `${day.startTime} - ${day.endTime}` 
                        : 'Not Available'
                      }
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Patients will only see available time slots based on these settings.
                </p>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveAvailability}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              Save Availability Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;