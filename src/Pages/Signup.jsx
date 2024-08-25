import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../slices/authSlice';
import { sendOtp } from '../Services/Opertations/authAPI';
import { toast } from 'react-hot-toast';
import HighlightText from '../Components/core/HomePage/HighlightText';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import frame from '../assets/Images/frame.png';
import signupImage from '../assets/Images/signup.webp';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("Student");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
    });

    const {password, confirmPassword } = formData;
    
    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    function submitHandler(event) {
        event.preventDefault();
        console.log(formData);

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match");
            return;
        }

        const signupData = {
            ...formData,
            accountType,
        };

        dispatch(setSignupData(signupData));
        dispatch(sendOtp(formData.email, navigate));
    }

    return (
        <div className='flex flex-row justify-between w-11/12 max-w-maxContent mx-auto items-center'>
            <div className='mt-8 w-[40%]'>
                <div>
                    <p className='text-white text-3xl font-bold'>Join the millions learning to code with StudyNotion for free</p>
                    <p className='text-pure-greys-200 text-xl mt-6'>
                        Build skills for today, tomorrow, and beyond. 
                        <HighlightText text={"Education to future-proof your career."} />
                    </p>
                </div>

                <form onSubmit={submitHandler}>
                    <div className='input-shadow bg-richblack-800 flex flex-row w-fit p-1 rounded-full items-center my-8'>
                        <button 
                            type="button"
                            className={` ${accountType === 'Student' ? "bg-richblack-900 rounded-full p-2 flex px-6 text-white" : "text-richblack-300 px-6"}`}
                            onClick={() => setAccountType("Student")}
                            name='userType'>
                            Student
                        </button>
                        <button 
                            type="button"
                            className={` ${accountType === 'Instructor' ? "bg-richblack-900 rounded-full p-2 flex px-6 text-white" : "text-richblack-300 px-6"}`}
                            onClick={() => setAccountType("Instructor")}
                            name='userType'>
                            Instructor
                        </button>
                    </div>
                    <div className='flex flex-row gap-6 justify-between'>
                        <div className='w-full'>
                            <p className='text-richblack-50 text-[14px] mb-2'>First Name <span className='text-pink-400'>*</span></p>
                            <input 
                                type="text" 
                                placeholder='Enter first name'
                                onChange={changeHandler}
                                required
                                name='firstName'
                                className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg mb-6 text-richblack-100'
                            />
                        </div>
                        <div className='w-full'>
                            <p className='text-richblack-50 text-[14px] mb-2'>Last Name <span className='text-pink-400'>*</span></p>
                            <input 
                                type="text" 
                                placeholder='Enter last name'
                                name='lastName'
                                required
                                onChange={changeHandler}
                                className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg mb-6 text-richblack-100'
                            />
                        </div>
                    </div>

                    <div>
                        <p className='text-richblack-50 text-[14px] mb-2'>Email Address <span className='text-pink-400'>*</span></p>
                        <input 
                            type="email" 
                            placeholder='Enter email address'
                            name='email'
                            required
                            onChange={changeHandler}
                            className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg mb-6 text-richblack-100'
                        />
                    </div>

                    <div className='flex flex-col justify-between w-full'>
                        <div>
                            <p className='text-richblack-50 text-[14px] '>Contact Number <span className='text-pink-400'>*</span></p>
                        </div>
                        <div className='w-[100%]'>
                            <input 
                                type="text" 
                                placeholder='01234 56789'
                                onChange={changeHandler}
                                name='contactNumber'
                                required
                                className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg mb-6 text-richblack-100'
                            />
                        </div>
                    </div>
                    
                    <div className='w-full'>
                        <div className='flex flex-row gap-6 justify-between w-full'>
                            <div className='relative w-full flex flex-col'>
                                <p className='text-richblack-50 text-[14px] mb-2'>Create Password <span className='text-pink-400'>*</span></p>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder='Enter Password'
                                    onChange={changeHandler}
                                    name='password'
                                    className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100'
                                />
                                <span 
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className='absolute right-4 top-10 text-richblack-200 text-2xl'
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </div>
                            <div className='relative w-full'>
                                <p className='text-richblack-50 text-[14px] mb-2'>Confirm Password <span className='text-pink-400'>*</span></p>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    placeholder='Confirm Password'
                                    onChange={changeHandler}
                                    name='confirmPassword'
                                    className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100'
                                />
                                <span 
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className='absolute right-4 top-10 text-richblack-200 text-2xl'
                                >
                                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-yellow-200 rounded-lg flex justify-center mt-8'>
                        <button type='submit' className='py-2 px-4 w-full'>
                            Create Account
                        </button>
                    </div>
                </form>

                <div className='my-4 flex justify-center'>
                    <div className='flex gap-2 text-[#999DAA]'>Already have an account?
                        <Link to={"/login"} className='text-blue-200 font-semibold underline'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <div className='relative'>
                    <img 
                        src={frame} 
                        alt="frame" 
                    />
                    <div className=''>
                        <img 
                            src={signupImage}
                            alt="signupImage" 
                            className='absolute z-10 bottom-4 -left-4'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
