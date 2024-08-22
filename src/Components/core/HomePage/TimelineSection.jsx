import React from 'react'

import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timeLineImage  from '../../../assets/Images/TimelineImage.png'

const timeLineData = [
    {
        Logo: logo1,
        heading: "Leadership",
        description: "Fully commited to the success company",
        next: true,
    },
    {
        Logo: logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
        next: true,
    },
    {
        Logo: logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
        next: true,
    },
    {
        Logo: logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
        next: false,
    },
]

const TimelineSection = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between max-w-maxContent mx-auto mb-20 '>
        <div className='flex flex-col '>
            {
                timeLineData.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col'>
                            <div  className='flex gap-7'>
                                <div className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center'> 
                                    <img src={item.Logo} alt='logo1'></img>
                                </div>

                                <div>
                                    <p className='font-bold'>{item.heading}</p>
                                    <p className='text-sm text-pure-greys-400'>{item.description}</p>
                                </div>   
                            </div>
                            <div>
                                {item.next && (
                                        <div className="border-l-2 border-pure-greys-100 border-dotted h-8 ml-[7%] my-2"></div>
                                    )}
                            </div>
                        </div>

                        
                    )
                })
            }
        </div>
        <div className='relative mt-8 md:mt-0 p-5 md:p-0'>
            <img src={timeLineImage} alt="timeLineImage" className='' />

            <div className='absolute bg-caribbeangreen-700 flex flex-col sm:flex-row w-[70%] py-10 left-[15%] translate-y-[-50%]  items-center 
            '>
                <div className='flex flex-row sm:w-[50%] gap-5 items-center px-7 mb-8 sm:mb-0 sm:border-r-[1px] border-r-caribbeangreen-500'>
                    <p className='text-4xl text-white font-bold '>10</p>
                    <p className='text-caribbeangreen-400 text-[14px] align-middle'>YEARS EXPERIENCES</p>
                </div>
                <div className='flex flex-row sm:w-[50%] gap-5 items-center px-7'>
                    <p className='text-4xl text-white font-bold '>250</p>
                    <p className='text-caribbeangreen-400 text-[14px]'>TYPES OF COURSES</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection