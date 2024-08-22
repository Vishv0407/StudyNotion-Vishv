import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../Services/Opertations/authAPI';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { HiMiniArrowLongLeft } from "react-icons/hi2";



const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    
    const [formData,setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    
    const { password, confirmPassword } = formData;
    
    const { loading } = useSelector( (state) => state.auth);
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    

    const changehandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);


        dispatch(resetPassword(password, confirmPassword, token));
    }

  return (
    <div className='h-[90vh] flex justify-center items-center'>
        {
            loading ? (
                <div class="loader"></div>
            ) : (
                <div className=' w-[80%] md:w-[60%] lg:w-[25%] md:min-w-[400px] m-auto h-[90vh] flex flex-col justify-center items-start'>
                    <h1 className='text-richblack-5 font-bold text-3xl mb-4'>Choose new Password</h1>
                    <p className='text-richblack-200 mb-4'>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={submitHandler} className='w-full'>

                        <label>
                            <p className='text-richblack-50 text-[14px] mb-2 mt-2'>New Password<span className='text-pink-500'> *</span></p>
                            <div className='relative'>
                                <input 
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={password}
                                    onChange={changehandler}
                                    placeholder='password'
                                    className='input-shadow w-[100%] bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100 mb-4'
                                />
                                <span 
                                    onClick={() => setShowPassword( (prev) => !prev)}
                                    className='absolute right-4 top-3 text-richblack-200 text-2xl'>
                                    {showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
                                </span>
                            </div>
                        </label>

                        <label>
                            <p className='text-richblack-50 text-[14px] mb-2 mt-2'>Confirm New Password<span className='text-pink-500'> *</span></p>
                            <div className='relative'>
                                <input 
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={changehandler}
                                    placeholder='Confirm Password'
                                    className='input-shadow w-[100%] bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100'
                                />
                                <span 
                                    onClick={() => setShowConfirmPassword( (prev) => !prev)}
                                    className='absolute right-4 top-3 text-richblack-200 text-2xl'>
                                    {showConfirmPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
                                </span>
                            </div>
                        </label>

                        <button type='submit' className='bg-yellow-200 py-2 px-4 rounded-lg flex justify-center mt-8 w-full'>
                            Reset Password
                        </button>

                    </form>

                    <div>
                        <Link to="/login"  className='text-white flex gap-2 flex-row items-center text-sm my-4' >
                        <HiMiniArrowLongLeft /><p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword