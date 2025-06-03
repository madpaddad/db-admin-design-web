import React, { useState } from 'react';
import axios from 'axios';
import { Phone, Lock, ArrowRight } from 'lucide-react'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const phoneNumber = formData.get('phoneNumber');
    const password    = formData.get('password');

    const formValues = {
      phoneNumber : phoneNumber,
      password    : password,
    }

    setIsLoading(true);

    try {
            const response = await axios.post(
                            `${import.meta.env.VITE_API_BASE_URL}/auth/login`, 
                            formValues, 
                            {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
            )
            
            localStorage.setItem('accessToken', response.data.accessToken)
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 1 day in milliseconds
            localStorage.setItem('tokenExpiration', expirationTime.toString());
            
            // Redirect to previous page or home
            navigate(from, { replace: true });
            
        } catch (err) {
          console.log(err);
          setIsLoading(false);
    }
    };
      
        return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
          <div className="grid md:grid-cols-2 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Left Side - Image */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-green-600/90"></div>
              <img 
                src="/path-to-your-farm-image.jpg" 
                alt="Fresh produce" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
                <h2 className="text-4xl font-bold mb-6">Welcome to PhsarFarm</h2>
                <p className="text-lg text-green-100">Connect directly with local farmers and get fresh produce delivered to your doorstep.</p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-12 space-y-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
                <p className="mt-2 text-gray-600">Access your PhsarFarm account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      id="string"
                      placeholder="Enter your phone number"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a className="text-sm font-medium text-green-600 hover:text-green-700" href="#">
                    Forgot Password?
                  </a>
                </div>

                <button
                  className={`w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                  {!isLoading && <ArrowRight size={20} />}
                </button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-green-600 hover:text-green-700">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }