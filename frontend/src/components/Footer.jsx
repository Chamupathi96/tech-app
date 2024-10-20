// eslint-disable-next-line no-unused-vars
import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
         

         {/* ----Left Section--- */}
         <div>
               <img className='mb-5 w-60' src={assets.logo} alt=""/>
               <p className='w-full md:w-2/3 text-gray-600 leading-6'>We Singh technologies (Pvt) Ltd. commenced our humble journey in 2000, today we have achieved many milestones after 2 decades in IT Industry. Our accolades and recognition by well-known multinational brands prove that we are No 1 position in southern province of Sri Lanka. We are wide spread in whole of southern province for easy access to customers with 5 branches namely in Beliatta and Matara.</p>
         </div>

          {/* ----Center Section--- */}
          <div>
               <p className='text-xl font-medium mb-5'>COMPANY</p>
               <ul className='flex flex-col gap-2 text-gray-600'>
                  <li>Home</li>
                  <li>About us</li>
                  <li>Contact us</li>
                  <li>Privacy policy</li>
               </ul>
            </div>

             {/* ----Right Section--- */}
         <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>047-2243183</li>
                    <li>info@singhtech.lk </li>
                </ul>
            </div>
      </div>
        {/* ---Copyright Text--- */}
      <div>
          <hr/>
          <p className='py-5 text-sm text-center'>Copyright 2024@ Singhtech - All Right Reserved.</p>
      </div>
      
    </div>
  )
}

export default Footer
