import React, { useState, useEffect } from 'react';

const DoctorMedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // APIs simulation
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        // API: GET /medical/doctor/my-records
        // Response backend MedicalRecord model ke hisaab se
        const mockRecords = [
          {
            _id: '1',
            patientId: {
              _id: 'patient123',
              userId: {
                name: 'John Smith',
                gender: 'Male',
                dateOfBirth: '1985-06-15'
              }
            },
            appointmentId: {
              _id: 'appointment123',
              appointmentDate: '2024-01-10',
              appointmentTime: '10:00 AM'
            },
            diagnosis: 'Hypertension Stage 1',
            symptoms: ['Headache', 'Dizziness', 'High BP'],
            prescription: [
              { medicine: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
              { medicine: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }
            ],
            testsRecommended: ['Blood Pressure Monitoring', 'ECG', 'Blood Tests'],
            notes: 'Patient advised to reduce salt intake and exercise regularly. Follow up in 4 weeks.',
            createdAt: '2024-01-10T10:30:00Z'
          },
          {
            _id: '2',
            patientId: {
              _id: 'patient124',
              userId: {
                name: 'Sarah Johnson',
                gender: 'Female',
                dateOfBirth: '1990-03-20'
              }
            },
            appointmentId: {
              _id: 'appointment124',
              appointmentDate: '2024-01-08',
              appointmentTime: '11:00 AM'
            },
            diagnosis: 'Type 2 Diabetes',
            symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue'],
            prescription: [
              { medicine: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' }
            ],
            testsRecommended: ['Blood Sugar Test', 'HbA1c'],
            notes: 'Patient advised to monitor blood sugar levels regularly and follow diet plan.',
            createdAt: '2024-01-08T11:30:00Z'
          },
          {
            _id: '3',
            patientId: {
              _id: 'patient125',
              userId: {
                name: 'Mike Brown',
                gender: 'Male',
                dateOfBirth: '1978-11-08'
              }
            },
            appointmentId: {
              _id: 'appointment125',
              appointmentDate: '2024-01-05',
              appointmentTime: '02:30 PM'
            },
            diagnosis: 'Contact Dermatitis',
            symptoms: ['Skin rash', 'Itching', 'Redness'],
            prescription: [
              { medicine: 'Hydrocortisone Cream', dosage: '1%', frequency: 'Twice daily', duration: '14 days' }
            ],
            testsRecommended: ['Patch Test'],
            notes: 'Avoid suspected allergens. Use fragrance-free products.',
            createdAt: '2024-01-05T15:00:00Z'
          }
        ];
        setMedicalRecords(mockRecords);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  // Filter and search records
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patientId.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    
    // Date filters
    const recordDate = new Date(record.appointmentId.appointmentDate);
    const today = new Date();
    const lastWeek = new Date(today.setDate(today.getDate() - 7));
    
    switch (filter) {
      case 'today':
        return matchesSearch && recordDate.toDateString() === new Date().toDateString();
      case 'week':
        return matchesSearch && recordDate >= lastWeek;
      case 'month':
        const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
        return matchesSearch && recordDate >= lastMonth;
      default:
        return matchesSearch;
    }
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

  const handleUpdateRecord = async (recordId, updatedData) => {
    try {
      // API: PUT /medical/:id
      console.log('Updating medical record:', recordId, updatedData);
      
      // Update local state
      setMedicalRecords(prev => prev.map(record =>
        record._id === recordId ? { ...record, ...updatedData } : record
      ));
      
      setSelectedRecord(null);
      alert('Medical record updated successfully!');
    } catch (error) {
      console.error('Error updating medical record:', error);
      alert('Error updating medical record');
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">Manage and review patient medical records</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{medicalRecords.length}</div>
            <div className="text-gray-600 text-sm">Total Records</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {new Set(medicalRecords.map(record => record.patientId._id)).size}
            </div>
            <div className="text-gray-600 text-sm">Unique Patients</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {medicalRecords.filter(record => record.testsRecommended.length > 0).length}
            </div>
            <div className="text-gray-600 text-sm">With Tests</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {medicalRecords.filter(record => 
                new Date(record.appointmentId.appointmentDate).toDateString() === new Date().toDateString()
              ).length}
            </div>
            <div className="text-gray-600 text-sm">Today's Records</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by patient name or diagnosis..."
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
                All Records
              </button>
              <button
                onClick={() => setFilter('today')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'today' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setFilter('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'week' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setFilter('month')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'month' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                This Month
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Records List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Medical Records ({filteredRecords.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredRecords.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                    <p className="text-gray-600">No medical records match your search criteria.</p>
                  </div>
                ) : (
                  filteredRecords.map(record => (
                    <div 
                      key={record._id}
                      className={`p-4 cursor-pointer transition duration-200 ${
                        selectedRecord?._id === record._id ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedRecord(record)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.patientId.userId.name}</h3>
                          <p className="text-sm text-gray-600">
                            {calculateAge(record.patientId.userId.dateOfBirth)} years • {record.patientId.userId.gender}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(record.appointmentId.appointmentDate)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Diagnosis:</span> {record.diagnosis}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {record.symptoms.slice(0, 3).map((symptom, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {symptom}
                          </span>
                        ))}
                        {record.symptoms.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            +{record.symptoms.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Record Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedRecord ? 'Record Details' : 'Select a Record'}
                </h2>
              </div>
              
              <div className="p-4">
                {selectedRecord ? (
                  <div className="space-y-4">
                    {/* Patient Info */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Patient Information</h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{selectedRecord.patientId.userId.name}</p>
                        <p className="text-sm text-gray-600">
                          {calculateAge(selectedRecord.patientId.userId.dateOfBirth)} years • {selectedRecord.patientId.userId.gender}
                        </p>
                        <p className="text-sm text-gray-500">
                          Visit: {formatDate(selectedRecord.appointmentId.appointmentDate)} at {selectedRecord.appointmentId.appointmentTime}
                        </p>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Diagnosis</h3>
                      <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                        {selectedRecord.diagnosis}
                      </p>
                    </div>

                    {/* Symptoms */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Symptoms</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedRecord.symptoms.map((symptom, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Prescription */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Prescription</h3>
                      <div className="space-y-2">
                        {selectedRecord.prescription.map((med, index) => (
                          <div key={index} className="bg-green-50 p-2 rounded text-sm">
                            <div className="font-medium text-green-900">{med.medicine}</div>
                            <div className="text-green-700">
                              {med.dosage} • {med.frequency} • {med.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tests Recommended */}
                    {selectedRecord.testsRecommended.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Tests Recommended</h3>
                        <div className="flex flex-wrap gap-1">
                          {selectedRecord.testsRecommended.map((test, index) => (
                            <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                              {test}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {selectedRecord.notes && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Doctor's Notes</h3>
                        <p className="text-sm text-gray-700 bg-yellow-50 p-2 rounded">
                          {selectedRecord.notes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          // Edit functionality implement karna hoga
                          console.log('Edit record:', selectedRecord._id);
                        }}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
                      >
                        Edit Record
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <p className="text-gray-600">Select a medical record to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorMedicalRecords;