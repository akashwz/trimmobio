import React from 'react'

const Services = () => {
  return (
    <div className='bg-[#EBFF57] services w-[90%] py-7 md:py-20 mx-auto rounded-[20px]'>
        <div className="container">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center'>
                <div>
                    <h4 className='text-[18px] lg:text-[30px] font-extrabold containe-font'>Simplify Your Online Identity</h4>
                    <p className='text-base lg:text-lg mt-2 lg:mt-3 font-semibold'>One Link to Showcase Everything You Do</p>
                    <span className='text-sm mt-2 lg:mt-3 inline-block'>Connect all your platforms with one personalized bio link</span>
                </div>
                <div>
                    <h4 className='text-[18px] lg:text-[30px] font-extrabold containe-font'>Engage with Your Audience Easily </h4>
                    <p className='text-base lg:text-lg mt-2 lg:mt-3 font-semibold'>Track, Optimize, and Grow</p>
                    <span className='text-sm mt-2 lg:mt-3 inline-block'>Analyze link performance, track engagement, and refine your strategy with Trimmo Bio's advanced analytics</span>
                </div>
                <div>
                    <h4 className='text-[18px] lg:text-[30px] font-extrabold containe-font'>Designed for You or Your Brand</h4>
                    <p className='text-base lg:text-lg mt-2 lg:mt-3 font-semibold'>Customizable and Mobile-Friendly.</p>
                    <span className='text-sm mt-2 lg:mt-3 inline-block'>Create a page that reflects your style with customizable designs and mobile responsiveness for seamless access on any device.</span>
                </div>
            </div>
            {/* <div className='w-full h-[3px] bg-[#333333] rounded-[2px] bg-opacity-10'>
                <div className='w-[33%] h-[100%] rounded-[5px] bg-[#29292B]'></div>
            </div> */}
        </div>
    </div>
  )
}

export default Services