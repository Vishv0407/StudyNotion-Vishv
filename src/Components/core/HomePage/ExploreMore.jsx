import React, { useState } from 'react';
import {HomePageExplore} from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


  return (
    <div className='flex flex-col justify-center items-center'> 
        
        <div className='text-4xl font-bold'>
            Unlock the
            <HighlightText text={"Power of Code"}></HighlightText>
        </div>

        <p className='text-richblack-300 text-sm my-4'>
            Learn to build anything you can imagine
        </p>

        <div className='flex flex-row gap-2 rounded-full bg-richblack-800 mb-0 mt-5 border-richblack-100 py-1 px-1 lg:mb-5 '>
            {
                tabsName.map( (element, index) => {
                    return(
                        <div 
                            key={index}
                            className={`text-[16px] flex flex-row items-center gap-2 px-5 py-1
                            ${currentTab === element ? "bg-richblack-900 text-richblack-50 font-medium"
                            : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer 
                            hover:bg-richblack-900 hover:text-richblack-50`}
                            onClick={() => setMyCards(element)}
                        >
                            {element}
                        </div>    
                    )
                })
            }
        </div>

        <div className='lg:h-[280px]'></div>

        {/* course cards */}

        <div className=' -mb-20 z-10 lg:absolute my-10 lg:my-0 flex-wrap lg:flex-nowrap justify-center lg:mt-[275px] flex flex-row gap-10  cursor-pointer'>
            {
                courses.map((course, index) => {
                    return(
                        <CourseCard 
                            key = {index}
                            cardData = {course}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore