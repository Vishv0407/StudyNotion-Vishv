import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.svg'
import planYourLesson from '../../../assets/Images/Plan_your_lessons.svg'
import compareWithOthers from '../../../assets/Images/Compare_with_others.svg'

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col mt-40 '>
        <div className='w-[90%] sm:w-[50%] mx-auto flex flex-col sm:text-center'>
            <div className='text-4xl mb-4 font-bold'>
            Your swiss knife for 
            <HighlightText text="learning any language" />
            </div>
            <p>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div> 
        <div className='flex flex-col lg:flex-row items-center justify-center'>
            <img src={knowYourProgress} alt="knowYourProgress" className='object-contain lg:-mr-28 mt-16 lg:mt-0 ' />
            <img src={compareWithOthers} alt="compareWithOthers" className='-mt-24 lg:-mt-0'/>
            <img src={planYourLesson} alt="planYourLesson" className='object-contain lg:-ml-32 -mt-28 lg:-mt-0' />
        </div>
        <div className=' flex flex-row justify-center mb-20'> 
            <CTAButton active={true} linkto={'/signup'}>
                Learn More
            </CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection