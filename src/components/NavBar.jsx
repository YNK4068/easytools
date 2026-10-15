import React, { useState } from 'react'
import instagram from '../icons/instagram.png';
import communication from '../icons/communication.png';
import Easytoolslogo from '../icons/Easytoolslogo.png';


export default function NavBar() {

  let [showMenu,setShowMenu] = useState(false);
  return (
    <>
        {/* for mobile sceen heading */}
        <div className='w-full bg-[#F2F2F7] flex items-center justify-center my-6 sm:hidden '>
              <div className='flex items-center gap-3'>
                  <img src={Easytoolslogo} alt="" className='w-12' />
                  <p className='font-bold text-4xl'>Easy Tools</p>
              </div>
        </div>

        <div className='relative bg-white p-1'>


        <nav className='h-11  bg-white sm:m-auto sm:h-[8vh] sm:w-[75%] px-1 py-3 flex items-center justify-center sm:justify-between relative'>
              {/* Logo and Name */}
              <div className='sm:flex items-end justify-center gap-2 hidden'>
                  <img src={Easytoolslogo} alt="" className='w-10' />
                  <p className='font-bold text-3xl'>Easy Tools</p>
              </div>

              {/* Menu button */}
              <span onClick={()=>{setShowMenu(!showMenu)}} className='absolute right-5 sm:hidden'>{showMenu ?<>&#10005;</>:<>&#9776;</>}</span>

              {/* List item */}
              <ul className='*:p-6 sm:flex items-center hidden absolute left-[50%] -translate-x-1/2'>
                    <li>Home</li>
                    <li>Contact</li>
                    <li>About Us</li>
                    <li>Services</li>
                  </ul>

                <div className='sm:flex gap-6 hidden'>
                  <a href="" ><img src={instagram} alt="" className='w-7'/></a>
                  <a href="" ><img src={communication} alt="" className='w-7'/></a>
                </div>
                
              
        </nav>
          <div className={`w-[100%] bg-gray-300 h-[60vh] absolute ${showMenu ? "left-0": "-left-[100%]" } border-1 sm:hidden border-black transition-all duration-900 ease-in-out`}>
              <ul className='*:p-2'>
                <li>Home</li>
                <li>Contact</li>
                <li>About Us</li>
                <li>Services</li>
              </ul>
          </div>
        </div>
    </>
  ) 
}
