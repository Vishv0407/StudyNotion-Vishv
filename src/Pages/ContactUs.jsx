import React from 'react'
import ContactUsForm from '../Components/core/AboutUs/ContactUsForm'
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import Footer from '../Components/common/Footer';



const ContactUs = () => {
  return (
    <section>
        <div className='mx-auto flex flex-col gap-8 md:flex-row my-4 md:my-12 w-[100%] p-10 max-w-[1280px] items-start text-white justify-between'>
            <div className='flex flex-col gap-8 text-white bg-richblack-800 p-10 w-[100%] mx-auto md:w-[40%] rounded-2xl'>
                <div className='flex flex-row gap-2'>
                    <div className='mt-1'>
                        <HiMiniChatBubbleLeftRight />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-bold'>Chat on us</h1>
                        <p className='text-richblack-200 '>Our friendly team is here to help.</p>
                        <p className='text-richblack-200'>@mail address</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='mt-1'>
                        <FaEarthAmericas />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-bold'>Visit us</h1>
                        <p className='text-richblack-200 '>Come and say hello at our office HQ.</p>
                        <p className='text-richblack-200 '>Here is the location/ address</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='mt-1'>
                        <FaPhone />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-bold'>Call us</h1>
                        <p className='text-richblack-200 '>Mon - Fri From 8am to 5pm</p>
                        <p className='text-richblack-200 '>+123 456 7890</p>
                    </div>
                </div>
            </div>
            <div className='border-[1px] border-richblack-700 p-10 w-full mx-auto md:w-[50%] rounded-2xl'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-4xl'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                    <p className='text-richblack-200'>Tall us more about yourself and what you’re got in mind.</p>
                </div>
                <ContactUsForm />
            </div>
        </div>

        <Footer />
    </section>
  )
}

export default ContactUs