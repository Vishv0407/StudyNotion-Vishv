import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";


const DeleteAccount = () => {
  return (
    <div  className='bg-[#340019] p-6 rounded-lg border-[1px] border-[#650d16] flex flex-row '>
        <div className='pr-6 flex items-center'>   
            <div className='w-20 h-20 rounded-full bg-[#581e24] flex justify-center items-center '>
            
            <RiDeleteBin5Line className='text-3xl text-[#ff6171]'/>

            </div>
        </div>
        <div>
            <h1 className='text-lg font-bold'>Delete Account</h1>
            <p className='text-[#FBC7D1] my-2'>Would you like to delete account?</p>
            <p className='text-[#FBC7D1] my-2'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>

            <button className='font-bold text-[#f8485a] italic'>
                I want to delete my account.
            </button>
        </div>
    </div>
  )
}

export default DeleteAccount