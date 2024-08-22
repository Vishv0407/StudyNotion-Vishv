import React from 'react'
import HighlightText from '../Components/core/HomePage/HighlightText'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import frame from '../assets/Images/frame.png';
import loginImage from '../assets/Images/login.webp';
import { useDispatch } from 'react-redux';
import { login } from '../Services/Opertations/authAPI';


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email:"", password:""
    })

    const [showPassword , setShowPassword] = useState(false);
    const [accountType, setAccountType] = useState("Student");

    const {email, password} = formData;

    function changeHandler(event){
        setFormData((prevData) => (
            {
                ...prevData, 
                [event.target.name] : event.target.value
            }
        ) )
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email,password, navigate));
    }

    return (
    <form 
    onSubmit={submitHandler}
    className='flex flex-row justify-between w-11/12 max-w-maxContent mx-auto items-center'>
        <div className='mt-8 w-[40%]'>
            <div className=''>
                <p className='text-white text-3xl font-bold'>Welcome Back</p>
                <p className='text-pure-greys-200 text-xl mt-6'>Build skills for today, tomorrow, and beyond. <HighlightText text={"Education to future-proof your career."}/></p>
            </div>
            <div className='input-shadow bg-richblack-800 flex flex-row w-fit p-1 rounded-full items-center my-8'>
                <button 
                    className={` ${accountType === 'Student' ? "bg-richblack-900 rounded-full p-2 flex px-6 text-white" : "text-richblack-300 px-6"}`}
                    onClick={() => setAccountType("Student")}>
                    Student
                </button>
                <button 
                    className={` ${accountType === 'Instructor' ? "bg-richblack-900 rounded-full p-2 flex px-6 text-white" : "text-richblack-300 px-6"}`}
                    onClick={() => setAccountType("Instructor")}>
                    Instructor
                </button>
            </div>
            <div>
                <p className='text-richblack-50 text-[14px] mb-2'>Email Address <span className='text-pink-400'>*</span></p>
                <input 
                    type="text" 
                    name="email"
                    value={email}
                    onChange={changeHandler}
                    placeholder='Enter email address'
                    className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg mb-6 text-richblack-100'
                />
            </div>
            <div>
                <p className='text-richblack-50 text-[14px] mb-2'>Password <span className='text-pink-400'>*</span></p>
                <div className='relative'>
                    <input 
                        type={showPassword ? ("text") : ("password")}
                        required
                        placeholder='Enter Password'
                        name='password'
                        value={password}
                        onChange={changeHandler}
                        className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100'
                    />
                    <span 
                        onClick={() => setShowPassword( (prev) => !prev)}
                        className='absolute right-4 top-3 text-richblack-200 text-2xl'
                    >
                        {showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
                    </span>
                </div>
            </div>
            <div className='flex flex-row justify-end text-blue-100 mt-1'>
                <Link to="/forgot-password">
                    <p className='text-[14px]'>Forgot password</p>
                </Link>
            </div>

            <div className='bg-yellow-200 py-2 px-4 rounded-lg flex justify-center mt-8'>
                <button type='submit'>
                    Sign in
                </button>
            </div>

            <div className='flex flex-row text-richblack-50 items-center my-4'>
                <div className='h-[2px] bg-richblack-600 w-[50%]'></div>
                <p className='mx-2 font-bold text-richblack-600'>OR</p>
                <div className='h-[2px] bg-richblack-600 w-[50%]'></div>
            </div>   

            <button className='flex flex-row gap-4 items-center border-[1px] px-4 py-2 rounded-lg border-richblack-600 w-full justify-center'>
                <FcGoogle className=''/>
                <p className='text-white'>Sign in with Google</p>
            </button>

            <div className='my-4 flex justify-center'>
                <div className='flex gap-2 text-[#999DAA]'>Don't have an account?
                    <Link to={"/signup"} className='text-blue-200 font-semibold underline'>
                        Sign up
                    </Link>
                </div>
            </div>

        </div>
        <div className=''>   
            <div className='relative'>
                <img 
                    src={frame} 
                    alt="frame" 
                />
                <div className=''>
                <img 
                    src={loginImage}
                    alt="loginImage" 
                    className='absolute z-10 bottom-4 -left-4'
                />
                </div>
            </div>
            
        </div>
    </form>
  )
}

export default Login