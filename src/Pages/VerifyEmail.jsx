import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../Services/Opertations/authAPI';
import { signUp } from '../Services/Opertations/authAPI';
import { Link } from 'react-router-dom';
import { FaRedo } from "react-icons/fa";



const VerifyEmail = () => {
    const {signupData, loading} = useSelector( (state) => state.auth);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( () => {
        if(!signupData){
            navigate("/signup");
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        
        const {
            accountType,
            firstName,
            lastName,
            email, 
            contactNumber,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, contactNumber, password, confirmPassword, otp, navigate));
    }

  return (
    <div className='h-[90vh] flex justify-center items-center'>
        {
            loading ? 
            (
                <div className="loader"></div>
            ) : (
                <div className='w-[80%] md:w-[60%] lg:w-[25%] md:min-w-[400px] m-auto h-[90vh] flex flex-col justify-center items-start'>
                    <h1 className='text-richblack-5 font-bold text-3xl mb-4'>
                        Verify Email
                    </h1>
                    <p className='text-richblack-200 mb-4'>
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={submitHandler} className='w-full'>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[30%] sm:w-[15%] md:w-[60px] lg:w-[50px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 text-xl"
                                />
                                )}
                                containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                                }}
                            />

                        <button type='submit' className='bg-yellow-200 py-2 px-4 rounded-lg flex justify-center mt-8 w-full'> 
                            Verify Email
                        </button>
                    </form>

                    <div className='w-full flex justify-between items-center'>
                        <div>
                            <Link to="/login"  className='text-white flex gap-2 flex-row items-center text-base my-4' >
                            <HiMiniArrowLongLeft /><p>Back to Login</p>
                            </Link>
                        </div>
                        
                        <button className='text-[#47A5C5]' onClick={() => dispatch(sendOtp(signupData.email, navigate))} >
                            <div className='flex gap-2 items-center'>
                                <FaRedo />
                                Resend it
                            </div>
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail