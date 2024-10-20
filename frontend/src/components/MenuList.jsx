// eslint-disable-next-line no-unused-vars
import React from 'react'
import {menu_list} from '../assets/assets'
import { Link } from 'react-router-dom'

const MenuList = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800 ' id='menu_list'>
         <h1 className='text-3xl font-medium'>Find Our List</h1>
         <p className='sm:w-1/3 text-center text-sm '> Get Quality Products..</p>
         <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {menu_list.map((item,index)=>(
               <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 ' key={index} to={`/menu/${item.menu_name}`}>
                   <img className='w-32 sm:w-48 mb-2' src={item.menu_image} alt=""/>
                   <p>{item.menu_name}</p>
               </Link>
            ))}
         </div>
    </div>
    
  )
}

export default MenuList
