import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../store/services/AuthApi";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../../store/authSlice/Auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", data.name);
      formDataToSend.append("email", data.email);
      formDataToSend.append("password", data.password);
      formDataToSend.append("phone", data.phone);
      formDataToSend.append("address", data.address);
      formDataToSend.append("dateOfBirth", data.dateOfBirth);
      formDataToSend.append("gender", data.gender);
      formDataToSend.append("role", "patient"); // Always patient

      if (file) {
        formDataToSend.append("profileImage", file);
      }

      const response = await registerUser(formDataToSend).unwrap();

      dispatch(registerSuccess({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      }));

      toast.success("Registration Successful!");
      navigate("/patient/dashboard");

    } catch (err) {
      toast.error(err?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-2xl mx-auto z-10 relative">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Patient Registration</h2>
            <p className="mt-2 text-sm text-gray-600">Create your patient account to get started</p>
          </div>

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg cursor-pointer transition-transform hover:scale-105"
                onClick={handleImageClick}
              >
                <img
                  src={preview || "https://via.placeholder.com/150x150.png?text=Upload"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 shadow-lg cursor-pointer hover:bg-blue-700 transition-colors" onClick={handleImageClick}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <p className="mt-2 text-xs text-gray-500">Click to upload profile picture</p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
                  type="password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  {...register("phone", { required: "Phone is required", pattern: { value: /^[0-9]{10}$/, message: "10 digits required" } })}
                  type="tel"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="1234567890"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <input
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input
                {...register("address", { required: "Address is required" })}
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="123 Main St, City, Country"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-800">Patient Registration Only</p>
                  <p className="text-xs text-blue-600 mt-1">This form is for patient registration. Healthcare professionals should contact administration for registration.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Create Patient Account"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                  Sign in →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;