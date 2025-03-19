"use client"
import React, { useState } from 'react'

const Faqs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
      setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const data = [
    {
        question: 'What is Trimmo Bio?',
        answer:
            `Trimmo Bio is a tool that allows users to create a customizable link-in-bio page where they can share multiple links in one place, making it easier to connect their audience to various platforms or content.`,
    },
    {
        question: 'How does Trimmo Bio work?',
        answer: `Trimmo Bio works by providing users with a simple interface to add and organize links on a single page. This page can then be shared with others via a unique URL.`,
    },
    {
        question: `Is Trimmo Bio free to use?`,
        answer: ` Yes, Trimmo Bio offers a free version. Additional premium features may be available for paid users`,
    },
    {
        question: `What kind of links can I add to my Trimmo Bio page?`,
        answer: ` You can add a variety of links to your Trimmo Bio page, including social media profiles, websites, online stores, videos, and more.`,
    },
    {
        question: `Is my Trimmo Bio page customizable?`,
        answer: `Yes, Trimmo Bio pages are customizable. Users can adjust the design, colors, and layout to match their personal or brand identity.`,
    },
    {
        question: `How do I share my Trimmo Bio page?`,
        answer: `Sharing your Trimmo Bio page is easy! Simply copy your page link and share it on social media platforms, emails, or other communication channels. Trimmo Bio also provides options to integrate your page into your social profiles.`,
    },
    {
        question: `Can I use a custom domain for my Trimmo Bio page?`,
        answer: `Yes, you can use a custom domain for your Trimmo Bio page. This feature allows you to maintain your brand identity and create a more professional appearance for your audience.`,
    },
]
  return (
    <section className='py-10 lg:py-20'>
      <div className="container">
        <h2 className='text-[50px] font-bold text-center containe-font'>Frequently asked questions</h2>
            <div className=" wow fadeInUp mt-8 space-y-2">
              <div className="accordion divide-y-5 divide-gray-500">
                  {data?.map((item, index) => (
                      <div className="accordion-item" key={index}>
                          <button
                              className="accordion-button"
                              aria-expanded={expandedIndex === index ? 'true' : 'false'}
                              onClick={() => toggleAccordion(index)}
                          >
                              <span className={`accordion-title text-sm md:text-base font-semibold containe-font`}>{item.question}</span>
                              <span aria-hidden="true" className={`icon transition-all duration-200 ${expandedIndex === index ? 'rotate-180' : ''}`}>
                                  <svg
                                      width="23px"
                                      height="23px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                      <path
                                          d="M7 10L12 15L17 10"
                                          stroke="#222222"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                      />
                                  </svg>
                              </span>
                          </button>
                          <div className={`accordion-content ${expandedIndex === index ? 'expanded' : ''}`}>
                              <p>{item.answer}</p>
                          </div>
                      </div>
                  ))}
              </div>
            </div>
      </div>
    </section>
  )
}

export default Faqs