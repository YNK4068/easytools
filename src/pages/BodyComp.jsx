import React from 'react'
import upload_filr_ico from '../icons/upload_filr_ico.png'

export default function BodyComp() {
  return (
    <>
        <div className='h-[8vh]'>

        </div>

        {/* image container div */}
        <div className='sm:flex justify-center items-center my-5 
                          sm:w-[60%] sm:h-[50vh] sm:m-auto sm:bg-white sm:rounded-2xl sm:p-3
                          md:h-[60vh]'>
          
            {/* file select outer div */}
            <div className=' w-[95vw] h-[42vh]  m-auto p-2 bg-white flex items-center justify-center border-[2px] border-dashed  border-blue-400 rounded-2xl hover:border-blue-600 hover:border-[3px] hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]
                            sm:w-[65%]
                            md:w-[50%]'>

                {/* file select inner div */}
                <div className='m-3 flex flex-col justify-center items-center'>
                    <input type="file" name="" id="image-input"  className='hidden'/>
                    <label htmlFor="image-input"> <img src={upload_filr_ico} alt="" className='w-[140px] my-4' /></label>
                    <label htmlFor="image-input" className='font-bold text-2xl'> Select Image</label>
                    <label htmlFor="" className='font-light'> or drag and drop image here</label>
                </div>
                
            </div>
      

        </div>
      
    </>
  )
}
