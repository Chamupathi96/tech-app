// eslint-disable-next-line no-unused-vars
import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
       <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
       </div>

       <div className='my-10 flex flex-col md:flex-row gap-12'>
           <img className='w-full md:max-w-[700px]' src={assets.About} alt=""/>
           <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>We Singh Technologies (Pvt) Ltd. commenced our humble journey in 2003, today we have achieved many milestones after 2 decades in IT Industry. Our accolades and recognition by well-known multinational brands prove that we are No 1 position in southern province of Sri Lanka. We are wide spread in whole of southern province for easy access to customers with 5 branches namely in Beliatta and Matara.
            </p>
            <p>We cater a wide range of products and represent all the multinational brands such as HP, ASUS, Dell, EPSON, Canon, .. and HIK Vision, which includes product portfolio of Desktop computers, Laptops, Printers, Computer Accessories, Office Automation products, CCTV and Security Solutions with a renowned expertise in Gaming Computers. We are pioneers in providing end to end solutions for business and house hold which includes Network Solutions, Camera Solutions, Security and Access Control Solutions, Private Automatic Branch Exchange (PABX) Solutions, Public Address Sound Systems (PASS).</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>To be the trusted market leader in Computer Sales and IT solution Industry of Sri Lanka.

</p>
           </div>
       </div>
    </div>
  )
}

export default About
