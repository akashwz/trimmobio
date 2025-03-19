'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const NotFoundPage = () => {
    const router = useRouter();
  return (
    <div className='flex items-center justify-center w-screen h-screen text-center bg-gray-100'>
      <div>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-2'>Page not found</h2>
        <p className='text-gray-500 mb-6'>The page you requested could not be found.</p>
        <div className='space-x-2'>
          <button
            type='button'
            className='bg-white text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300'
            onClick={() => router.push('/')}
          >
            Home
          </button>
          <button
            type='button'
            className='bg-white text-gray-700 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300'
            onClick={() => router.push('/register')}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
