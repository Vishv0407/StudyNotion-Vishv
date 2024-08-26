import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../../Services/apiConnector';
import { contactUsEnpoints } from '../../../Services/apis';
import countryCodes from '../../../data/countrycode.json';
import toast from 'react-hot-toast';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors, isSubmitSuccessful } 
    } = useForm();

    const submitContactUsForm = async (data) => {
        setLoading(true);
        try{
            const response = await apiConnector("POST", contactUsEnpoints.CONTACTUS_API, data);
            console.log(response);
            if(response.status === 200 ){
                setSuccess(true);
                toast.success('Your message has been sent successfully.');
                reset();
            } else {
                toast.error('Error sending message');
            }
        }
        catch(err){
            console.log("Error in submitContactUs",err);
            toast.error("Cannot submit form")
        } finally {
            setLoading(false);
        }
    }

    useEffect( () => {
        if (isSubmitSuccessful) {
            reset({
                firstName:"",
                lastName:"",
                email:"",
                contactNumber:"",
                message:"",
            });
        }
    }, [reset, isSubmitSuccessful]);
    
  return (
    <form onSubmit={handleSubmit(submitContactUsForm)}>
        <div className='flex flex-col gap-4 my-8'>
            <div className='flex flex-row gap-4'>

                {/* First Name */}
                <div className='flex flex-col'>
                    <label htmlFor='firstName' className='text-richblack-50 text-[14px] mb-1'>First Name</label>
                    <input 
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        {...register("firstName", {required:true})}
                        className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100'
                    />
                    {
                        errors.firstName && (
                            <span>Please enter First Name</span>
                        )
                    }
                </div>

                {/* Last Name */}
                <div className='flex flex-col'>
                    <label htmlFor='lastName' className='text-richblack-50 text-[14px] mb-1'>Last Name</label>
                    <input 
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last Name'
                        {...register("lastName", {required:true})}
                        className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100'
                    />
                    {
                        errors.lastName && (
                            <span>Please enter Last Name</span>
                        )
                    }
                </div>
            </div>

            {/* Email */}
            <div>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='text-richblack-50 text-[14px] mb-1'>Email</label>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email address'
                        {...register("email", {required:true})}
                        className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100'
                    />
                    {
                        errors.email && (
                            <span>Please enter Email Address</span>
                        )
                    }
                </div>
            </div>

            {/* Phone number */}
            <div className='flex flex-col'>
                <label htmlFor="contactNumber" className='text-richblack-50 text-[14px] mb-1'>Contact Number</label>
                
                <div className='w-full flex flex-row justify-between'>
                    <div className='input-shadow w-[24%] sm:w-[20%] lg:w-[16%] bg-richblack-800 py-3 px-2 rounded-lg text-richblack-100 text-center flex justify-center items-center'>
                        <select
                            name="countryCodes"
                            id="countryCodes"
                            className=' absolute bg-richblack-800 sm:w-[60px] w-[50px] text-[13px] sm:text-base'
                            onFocus={(e) => {
                                Array.from(e.target.options).forEach(option => {
                                    option.textContent = `${option.value} - ${option.getAttribute('data-country')}`;
                                });
                            }}
                            onBlur={(e) => {
                                Array.from(e.target.options).forEach(option => {
                                    option.textContent = option.value;
                                });
                            }}
                        >
                            {
                                countryCodes.map((element, index) => (
                                    <option
                                        key={index}
                                        value={element.code}
                                        data-country={element.country}
                                        className='bg-richblack-800 text-richblack-100'
                                    >
                                        {element.code}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='w-[70%] sm:w-[75%] lg:w-[80%]'>
                        <input 
                            type="number"
                            name='contactNumber'
                            id='contactNumber'
                            placeholder='12345 67890'
                            {...register("contactNumber", 
                            {
                                required:{value:true, message: "Please enter contact number"},
                                maxLength: {value:10, message:"Invalid Contact number" },
                                minLength: {value:8, message:"Invalid Contact number" } 
                            })}
                            className='input-shadow bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100 w-full'
                        />
                        {
                            errors.contactNumber && (
                                <span>{errors.contactNumber.message}</span>
                            )
                        }
                    </div>
                </div>

                
            </div>


            {/* Message */}
            <div>
                <div className='flex flex-col'>
                    <label className='text-richblack-50 text-[14px] mb-1'>Message</label>
                    <textarea 
                        name='message'
                        id='message'
                        cols="30"
                        rows="4"
                        placeholder='Enter your message here'
                        {...register("message", {required:true})}
                        className='input-shadow w-full bg-richblack-800 px-4 py-3 rounded-lg text-richblack-100'
                    />
                    {
                        errors.message && (
                            <span>Please enter your message</span>
                        )
                    }
                </div>
            </div>

            <div className='bg-yellow-200 rounded-lg flex justify-center mt-8 text-black'>
                <button type='submit' className='w-full  py-2 px-4' disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </div>


        </div>
    </form>
  )
}

export default ContactUsForm