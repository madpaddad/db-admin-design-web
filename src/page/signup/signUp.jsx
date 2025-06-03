import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignUpPhonePage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSendOTP = () => {
    if (!phoneNumber) {
      alert('Please enter your phone number first.');
      return;
    }

    setIsLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      alert('OTP sent! Use 123456 for testing.');
      setIsOTPSent(true);
      setIsLoading(false);
    }, 1000);
  };


  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (otpCode !== '123456') {
      alert('Incorrect OTP code.');
      return;
    }

    // All inputs are valid (simulation)
    alert('Sign up successful!');

      // 👇 Redirect to login page
    navigate('/login');
    // You can clear the form or send data to server here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600"
          >
            {isLoading ? 'Sending OTP...' : 'Get OTP'}
          </button>

          {isOTPSent && (
            <>
              <input
                type="text"
                className="w-full border p-2 rounded mb-4"
                placeholder="Enter OTP code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Sign Up
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
