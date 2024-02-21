// Ensure you have Tailwind CSS installed and configured in your Next.js project
"use client"
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Link from 'next/link';

const LoginPage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitStatus, setSubmitStatus] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('');

    if (!executeRecaptcha) {
      console.error('ReCAPTCHA not available');
      return;
    }

    const gRecaptchaToken = await executeRecaptcha('loginSubmit');

    try {
      const response = await axios.post('/api/recaptchaVerify', {
        gRecaptchaToken,
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        console.log(`Success with score: ${response.data.score}`);
        setSubmitStatus('Login Successful. Welcome!');
      } else {
        console.error(`Failure with score: ${response.data.score}`);
        setSubmitStatus('Login Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? 
            <Link href="/register">
              <button className="text-blue-500 hover:underline">Register here</button>
            </Link>
        </p>

        {submitStatus && <p className="mt-4 text-center text-sm text-red-600">{submitStatus}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
