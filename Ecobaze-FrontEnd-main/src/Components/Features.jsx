import React from 'react'
import { BsTruck,BsHeadset,BsBagCheck,BsBoxSeam } from "react-icons/bs";

const Features = () => {
  return (
    <div className='w-[90%] items-center justify-center px-5 py-4 grid grid-cols-4 gap-5  mt-[-16px] drop-shadow-2xl shadow-black mb-10 bg-white font-Poppins md:grid-cols-2 md:gap-5 sm:grid-cols-1 sm:gap-7'>
      <div className='flex justify-start items-center gap-5'>
        <BsTruck className='text-green-500 text-4xl'/>
        <div className='flex flex-col items-start justify-center'>
            <h1 className='sm:text-sm'>Free Shipping</h1>
            <p className='opacity-60 text-sm sm:text-xs'>Free shipping on all your order</p>
        </div>
      </div>
      <div className='flex justify-start  items-center gap-3'>
        <BsHeadset className='text-green-500 text-4xl'/>
        <div>
            <h1 className='sm:text-sm'>Customer Support 24/7</h1>
            <p className='opacity-60 text-sm sm:text-xs'>Instant access to Support</p>
        </div>
      </div>
      <div className='flex justify-start  items-center gap-3'>
        <BsBagCheck className='text-green-500 text-4xl'/>
        <div>
            <h1 className='sm:text-sm'>100% Secure Payment</h1>
            <p className='opacity-60 text-sm sm:text-xs'>We ensure your money is save</p>
        </div>
      </div>
      <div className='flex justify-start  items-center gap-3'>
        <BsBoxSeam className='text-green-500 text-4xl'/>
        <div>
            <h1 className='sm:text-sm'>Money-Back Guarantee</h1>
            <p className='opacity-60 text-sm sm:text-xs'>30 Days Money-Back Guarantee</p>
        </div>
      </div>
    </div>
  )
}

export default Features
