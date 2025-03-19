"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Cms1 = () => {
    const router = useRouter();
  return (
    <section className='herosection'>
      <div className='container'>
        <div className='block my-10 lg:flex items-center'>
          <div className='w-full cms-1 lg:w-[50%]'>
            <img
              src='/images/Phone.svg'
              alt='hero'
              className='block max-w-full mb-5 lg:mb-0 mx-auto'
            />
          </div>
          <div className='w-full lg:w-[50%] py-5 lg:py-20'>
            <h2 className='mb-2 containe-font'>
              {' '}
              Build Your Trimo Bio Link in Minutes: Enhance Your Online Profile.
            </h2>
            <p className='info-text'>
              Easily create your unique Trimo.bio link. Customize your bio link quickly and easily,
              then share it across all of your social media sites.
            </p>
            <button
              type='button'
              className='btn-black mt-8 hover:bg-[#ebff57] hover:text-[#000]'
              onClick={() => router.push('/register')}
            >
              Claim Your URL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cms1