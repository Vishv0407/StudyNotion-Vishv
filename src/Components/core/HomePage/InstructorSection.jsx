import React from 'react';
import InstructorImage from '../../../assets/Images/Instructor.png';
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";


const InstructorSection = () => {
  return (
    <div className='flex flex-col md:flex-row mt-16 gap-8'>
        <div className='custom-shadow-instructor '>
            <img src={InstructorImage} alt="ReviewSection" />
        </div>
        <div className=' w-[90%] mx-auto ml-0 md:w-[50%] flex flex-col justify-center items-start md:ml-16'>
            <div className='text-4xl'>
                <p>Become an</p>
                <HighlightText text={"instructor"}/>
            </div>

            <p className='text-sm mt-4 text-[#838894]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

            <div className='flex mt-12'>
                <CTAButton active={true} linkto={'/signup'}>
                    <div className='flex flex-row items-center gap-1'>
                        Start Teaching Today <FaArrowRight />
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection