import { cache, useState } from 'react';
import { Phone, Lock, User, Mail, ArrowRight, MessageSquare, Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function CreateAccount() {
  const [currentStep, setCurrentStep] = useState(1); // 1: phone, 2: otp, 3: user details
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendOTP = async () => {
    if (!formData.phoneNumber) {
      Swal.fire({ icon: 'warning', title: 'Missing Phone Number', text: 'Please enter your phone number' });
      //alert('Please enter your phone number');
      return;
    }

    setIsLoading(true);
    // Simulate sending OTP
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/getOTP`, 
        {phoneNumber: formData.phoneNumber},
        {headers: {'content-Type': 'application/json',},}
      );
      
      Swal.fire('Succcess', 'OTP sent successfully to your phone number!', 'success');
      setOtpSent(true);
      setCurrentStep(2);
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.message;

      if (message === 'user already exist') {
        Swal.fire('Warning', 'This phone number is already registered. Please login instead.', 'warning');
      } else {
        Swal.fire('Error', message || 'Failed to send OTP', 'error');
      }
    } finally {
      setIsLoading(false);
    }
    // setTimeout(() => {
    //   console.log('Sending OTP to:', formData.phoneNumber);
    //   setOtpSent(true);
    //   setCurrentStep(2);
    //   setIsLoading(false);
    //   alert('OTP sent successfully to your phone number!');
    // }, 2000);
  };

  const verifyOTP = async () => {
    if (!formData.otp) {
      Swal.fire({ icon: 'warning', title: 'Missing OTP', text: 'Please enter the OTP' });
      //alert('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, 
        {
          phoneNumber: formData.phoneNumber, 
          otp: formData.otp,
        },
        {headers: {'Content-Type': 'application/json',}}
      );
      Swal.fire('Success', 'Phone number verified successfully!', 'success');
      setCurrentStep(3);
      
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to verify OTP', 'error');
    } finally {
      setIsLoading(false);
    }
    // setTimeout(() => {
    //   console.log('Verifying OTP:', formData.otp);
    //   setCurrentStep(3);
    //   setIsLoading(false);
    //   alert('Phone number verified successfully!');
    // }, 1500);
  };

  const handleSubmit = async () => {
    if (!agreeToTerms) {
      Swal.fire({icon: 'warning', title: 'Terms and Conditions agreement', text: 'Please agree to the Terms and Conditions'})
      //alert('Please agree to the Terms and Conditions');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({icon: 'warning', title: 'Passwords do not match', text: 'Please enter the match password'})
      //alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    // Simulate account creation
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, 
        {
          phoneNumber: formData.phoneNumber, 
          password: formData.password,
          role: 'USER',
        },
        {headers: {'Content-Type': 'application/json',}}
      );
      
      Swal.fire({ icon: 'success', title: 'Account created successfully!'}).then(() => {
        navigate('/')
      });
      
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to create account', 'error');
    } finally {
      setIsLoading(false);
    }
    // setTimeout(() => {
    //   console.log('Creating account:', formData);
    //   setIsLoading(false);
    //   alert('Account created successfully!');
    // }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">Enter Phone Number</h2>
              <p className="mt-2 text-gray-600">We'll send you an OTP to verify your number</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button
                className={`w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={sendOTP}
                disabled={isLoading}
              >
                <span>{isLoading ? 'Sending OTP...' : 'Send OTP'}</span>
                {!isLoading && <ArrowRight size={20} />}
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">Verify OTP</h2>
              <p className="mt-2 text-gray-600">Enter the 6-digit code sent to {formData.phoneNumber}</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="otp">
                  OTP Code
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center text-lg tracking-widest"
                    id="otp"
                    name="otp"
                    placeholder="000000"
                    maxLength="6"
                    value={formData.otp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button
                className={`w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={verifyOTP}
                disabled={isLoading}
              >
                <span>{isLoading ? 'Verifying...' : 'Verify OTP'}</span>
                {!isLoading && <ArrowRight size={20} />}
              </button>

              <div className="text-center">
                <button 
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                  onClick={sendOTP}
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800">Complete Your Profile</h2>
              <p className="mt-2 text-gray-600">Fill in your details to create your account</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="fullName">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="terms"
                  className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a className="font-medium text-green-600 hover:text-green-700" href="#">
                    Terms and Conditions
                  </a>
                  {' '}and{' '}
                  <a className="font-medium text-green-600 hover:text-green-700" href="#">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                className={`w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                {!isLoading && <ArrowRight size={20} />}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="grid md:grid-cols-2 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-green-600/90"></div>
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
            alt="Fresh produce and farming" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Join PhsarFarm</h2>
            <p className="text-lg text-green-100 mb-8">Start your journey with fresh, local produce. Connect with farmers in your community and enjoy farm-to-table freshness.</p>
            
            {/* Step Indicator */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 1 ? 'bg-green-300 text-green-800' : 'bg-green-600 text-white'
                }`}>
                  1
                </div>
                <span className="text-green-100">Phone Verification</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 2 ? 'bg-green-300 text-green-800' : 'bg-green-600 text-white'
                }`}>
                  2
                </div>
                <span className="text-green-100">OTP Verification</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 3 ? 'bg-green-300 text-green-800' : 'bg-green-600 text-white'
                }`}>
                  3
                </div>
                <span className="text-green-100">Complete Profile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Dynamic Form Content */}
        <div className="p-8 md:p-12">
          {renderStepContent()}
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-700" href="#">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}