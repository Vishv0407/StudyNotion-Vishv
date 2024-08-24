import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getPasswordResetToken } from '../Services/Opertations/authAPI';
import { HiMiniArrowLongLeft } from "react-icons/hi2";



const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent, navigate))
    }

  return (
    <div className='h-[90vh] flex justify-center items-center'>
        {
            loading ? (
                <div class="loader"></div>
            ) : (
                <div className='w-[80%] md:w-[60%] lg:w-[25%] md:min-w-[400px]  m-auto h-[90vh] flex flex-col justify-center items-start'>
                    <h1 className='text-richblack-5 font-bold text-3xl mb-4'>
                        {
                            emailSent ? "Check your Email" : "Reset your Password"
                        }
                    </h1>

                    <p className='text-richblack-200 mb-4'>
                        {
                            !emailSent ? 
                            "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={submitHandler} className='w-full'>
                        {
                            !emailSent && (
                                <label>
                                    <p className='text-richblack-50 text-[14px] mb-2 mt-2'>Email Address <span className='text-pink-500'>*</span></p>
                                    
                                    <input 
                                    type="email"
                                    required 
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your Email Address'
                                    className='input-shadow w-[100%] bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100 mb-4'
                                    />
                                </label>
                            )
                        }

                        <button type='submit' className='w-full bg-yellow-200 py-2 px-4 rounded-lg flex justify-center mt-4 text-[16px]'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
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

export default ForgotPassword