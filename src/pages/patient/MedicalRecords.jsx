import React, { useState } from 'react';

const PatientMedicalRecords = () => {
  // Dummy data - backend MedicalRecord model ke hisaab se
  const medicalRecords = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Smith',
      specialization: 'Cardiology',
      appointmentDate: '2024-01-10',
      diagnosis: 'Hypertension Stage 1',
      symptoms: ['Headache', 'Dizziness', 'High BP'],
      prescription: [
        { medicine: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
        { medicine: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }
      ],
      testsRecommended: ['Blood Pressure Monitoring', 'ECG', 'Blood Tests'],
      notes: 'Patient advised to reduce salt intake and exercise regularly. Follow up in 4 weeks.'
    },
    {
      id: 2,
      doctorName: 'Dr. Mike Johnson',
      specialization: 'Dermatology',
      appointmentDate: '2023-12-15',
      diagnosis: 'Contact Dermatitis',
      symptoms: ['Skin rash', 'Itching', 'Redness'],
      prescription: [
        { medicine: 'Hydrocortisone Cream', dosage: '1%', frequency: 'Twice daily', duration: '14 days' },
        { medicine: 'Antihistamine', dosage: '10mg', frequency: 'Once daily', duration: '7 days' }
      ],
      testsRecommended: ['Patch Test'],
      notes: 'Avoid suspected allergens. Use fragrance-free products.'
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Brown',
      specialization: 'General Medicine',
      appointmentDate: '2023-11-20',
      diagnosis: 'Seasonal Flu',
      symptoms: ['Fever', 'Cough', 'Body ache', 'Fatigue'],
      prescription: [
        { medicine: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '5 days' },
        { medicine: 'Vitamin C', dosage: '1000mg', frequency: 'Once daily', duration: '10 days' }
      ],
      testsRecommended: [],
      notes: 'Rest and hydrate well. Return if symptoms worsen.'
    }
  ];

  const [selectedRecord, setSelectedRecord] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">Your complete medical history and treatment records</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{medicalRecords.length}</div>
            <div className="text-gray-600 text-sm">Total Records</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {medicalRecords.filter(record => record.testsRecommended.length > 0).length}
            </div>
            <div className="text-gray-600 text-sm">With Tests</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {new Set(medicalRecords.map(record => record.doctorName)).size}
            </div>
            <div className="text-gray-600 text-sm">Doctors Visited</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Records List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Medical History</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {medicalRecords.map(record => (
                  <div 
                    key={record.id}
                    className={`p-4 cursor-pointer transition duration-200 ${
                      selectedRecord?.id === record.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{record.doctorName}</h3>
                        <p className="text-sm text-gray-600">{record.specialization}</p>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(record.appointmentDate)}</span>
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
                ))}
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
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Doctor Information</h3>
                      <p className="text-sm text-gray-700">{selectedRecord.doctorName}</p>
                      <p className="text-sm text-gray-600">{selectedRecord.specialization}</p>
                      <p className="text-sm text-gray-500">{formatDate(selectedRecord.appointmentDate)}</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Diagnosis</h3>
                      <p className="text-sm text-gray-700">{selectedRecord.diagnosis}</p>
                    </div>

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

                    {selectedRecord.notes && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Doctor's Notes</h3>
                        <p className="text-sm text-gray-700 bg-yellow-50 p-2 rounded">
                          {selectedRecord.notes}
                        </p>
                      </div>
                    )}
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

export default PatientMedicalRecords;