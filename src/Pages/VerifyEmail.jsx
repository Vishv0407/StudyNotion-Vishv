import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../Services/Opertations/authAPI';
import { signUp } from '../Services/Opertations/authAPI';
import { Link } from 'react-router-dom';


const VerifyEmail = () => {
    const {signupData, loading} = useSelector( (state) => state.auth);
    const {otp, setOtp} = useState("");
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
            password,
            confirmPassword,
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp));
    }

  return (
    <div>
        {
            loading ? 
            (
                <div class="loader"></div>
            ) : (
                <div>
                    <h1>
                        Verify Email
                    </h1>
                    <p>
                        A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={submitHandler}>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={ (props) => <input {...props} />}

                        />

                        <button type='submit'> 
                            Verify Email
                        </button>
                    </form>

                    <div>
                        <div>
                            <Link to="/login"  className='text-white flex gap-2 flex-row items-center text-sm my-4' >
                            <HiMiniArrowLongLeft /><p>Back to Login</p>
                            </Link>
                        </div>
                        
                        <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                            Resend it
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail