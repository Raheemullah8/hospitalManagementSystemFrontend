// src/pages/patient/PatientProfile.jsx

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import PersonalInfo from "../../components/PatientModal/PersonalInfo";
import ProfileHeader from "../../components/PatientModal/ProfileHeader";
import MedicalInfo from "../../components/PatientModal/MedicalInfo";
import EmergencyContact from "../../components/PatientModal/EmergencyContact";
import toast from "react-hot-toast";
import { useGetPatientProfileQuery, useUpdatePatientProfileMutation } from "../../store/services/Patient";

const PatientProfile = () => {
  const { data: patientData, isLoading, isError, refetch } = useGetPatientProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdatePatientProfileMutation();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm();

  // Load data into form when fetched
  useEffect(() => {
    if (patientData?.data) {
      const patient = patientData.data;
      reset({
        bloodGroup: patient.bloodGroup || "",
        allergies: patient.allergies || [],
        emergencyContact: {
          name: patient.emergencyContact?.name || "",
          phone: patient.emergencyContact?.phone || "",
          relation: patient.emergencyContact?.relation || "",
        },
      });
    }
  }, [patientData, reset]);

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      const response = await updateProfile(data).unwrap();
      
      if (response.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        refetch(); // Refresh data
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (patientData?.data) {
      const patient = patientData.data;
      reset({
        bloodGroup: patient.bloodGroup || "",
        allergies: patient.allergies || [],
        emergencyContact: {
          name: patient.emergencyContact?.name || "",
          phone: patient.emergencyContact?.phone || "",
          relation: patient.emergencyContact?.relation || "",
        },
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 text-lg mb-4">Failed to load profile</p>
          <button 
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const patient = patientData?.data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader 
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          patientData={patient}
          onCancel={handleCancel}
        />

        <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information - READ ONLY */}
            <div className="lg:col-span-2">
              <PersonalInfo patientData={patient} />
            </div>

            {/* Medical Information + Emergency Contact - EDITABLE */}
            <div className="lg:col-span-1 space-y-6">
              <MedicalInfo 
                isEditing={isEditing}
                register={register}
                control={control}
                errors={errors}
                patientData={patient}
              />
              
              <EmergencyContact
                isEditing={isEditing}
                register={register}
                errors={errors}
                patientData={patient}
              />
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          {isEditing && (
            <div className="mt-6 flex justify-end space-x-4 bg-white p-4 rounded-lg shadow-md">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isUpdating}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isUpdating || !isDirty}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg"
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;