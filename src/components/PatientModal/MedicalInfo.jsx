// src/components/PatientModal/MedicalInfo.jsx

import React from "react";
import { useFieldArray } from "react-hook-form";

const MedicalInfo = ({ isEditing, register, control, errors, patientData }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "allergies",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900">Medical Information</h2>
      </div>

      <div className="space-y-6">
        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group
          </label>
          {isEditing ? (
            <>
              <select
                {...register("bloodGroup")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                defaultValue={patientData?.bloodGroup || ""}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.bloodGroup.message}
                </p>
              )}
            </>
          ) : (
            <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 font-medium">
                {patientData?.bloodGroup || <span className="text-gray-400">Not provided</span>}
              </span>
            </div>
          )}
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allergies
          </label>
          <div className="space-y-3">
            {isEditing ? (
              <>
                {fields.length === 0 && (
                  <div className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-200">
                    No allergies added. Click "Add Allergy" to add one.
                  </div>
                )}
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      {...register(`allergies.${index}`)}
                      placeholder="Enter allergy name (e.g., Penicillin)"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      defaultValue={field.value || ""}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-100 text-red-600 px-4 rounded-lg hover:bg-red-200 transition duration-200 flex items-center"
                      title="Remove allergy"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append("")}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition duration-200 flex items-center justify-center shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Allergy
                </button>
              </>
            ) : (
              <div className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 min-h-[100px]">
                {patientData?.allergies && patientData.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patientData.allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm">No allergies recorded</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfo;