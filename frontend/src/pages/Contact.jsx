// eslint-disable-next-line no-unused-vars
import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      {/* Contact Section */}
      <div className='my-10 flex flex-col justify-center items-center md:flex-row gap-10 mb-28 text-sm'>
        {/* Image Section */}
        <img className='w-full md:max-w-[700px] object-cover' src={assets.Contact} alt="Contact" />

        {/* Text Section */}
        <div className='flex flex-col justify-center items-start text-left gap-6 max-w-xs md:text-lg'>
          <p className='text-gray-700 font-semibold'>OUR OFFICE</p>
          <p>No 250, <br/> Walasmulle road, Beliatta</p>
          <p>047-2243183 <br/>info@singhtech.lk</p>
        </div>
      </div>
    </div>
  )
}

export default Contact