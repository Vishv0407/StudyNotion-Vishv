import React from 'react'
import { useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../Services/Opertations/profileAPI';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';



const DeleteAccount = () => {
  
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  const userData = {token: user.token, id: user.id};

  // const deleteHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(deleteAccount(userData, navigate));

  // }

 

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

            <button 
            
              onClick={() => { setConfirmationModal({
                text1: "Are you sure ?",
                text2: "You will lost your all data for this account.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => {dispatch(deleteAccount(userData, navigate))},
                btn2Handler: () => {setConfirmationModal(null)},
            })}}
            className='font-bold text-[#f8485a] italic'
             >
                I want to delete my account.
            </button>


        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default DeleteAccount