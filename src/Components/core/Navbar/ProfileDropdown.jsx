import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../Services/Opertations/authAPI';
import toast from 'react-hot-toast';

function ProfileDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.flex.items-center.relative')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const logoutAction = () => {
    toast((t) => (
      <div>
        <p className='pb-4 pt-2'>Are you sure you want to logout?</p>
        <div className="flex justify-between">
          <button
            className="hover:bg-richblack-200 border-[1px] border-richblack-400 text-black font-bold py-2 px-4 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="bg-[#ff000030] hover:bg-[#ff000050] border-[1px] border-[#ff000040] text-[#ff0000] font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(logout(navigate));
              toast.dismiss(t.id);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex items-center relative">
      <button className="w-[30px] rounded-full" onClick={handleToggle}>
        <img className="w-full rounded-full" src={user.image} alt="" />
      </button>
      {isOpen && (
        <ul className="absolute bg-white/10 text-white border-[1px] border-richblack-300 backdrop-blur-sm p-4 top-[100%] translate-y-3 left-[-75%] flex gap-2 flex-col rounded-lg">
          <li>
            <a href="/dashboard/profile">Profile</a>
          </li>
          <hr />
          <li>
            <a onClick={logoutAction} className="cursor-pointer">Logout</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileDropdown;