import React from 'react';
import { HiUsers } from "react-icons/hi2";
import { LiaFileVideoSolid } from "react-icons/lia";



const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {

    const tabHandler= () => {
        setCurrentCard(cardData);
    }
    // setCurrentCard(cardData)

  return (
    <div className=''>
      {cardData.heading === currentCard.heading ? (
        <div className='course-card-shadow bg-white max-w-xs h-[300px] flex flex-col justify-between' onClick={tabHandler}>
            <div className='flex flex-col p-6'>
                <p className='text-pure-greys-800 text-lg font-semibold text-left'>{cardData.heading}</p>
                <p className='text-left text-[15px] text-[#6E727F] mt-4 '>{cardData.description}</p>
            </div>
            <div className='flex flex-row justify-between p-4 text-[#a7abb5] border-dashed border-t-2 font-semibold'>
                <div className='flex flex-row gap-2 items-center text-[#0F7A9D]'><HiUsers />{cardData.level}</div>
                <div className='flex flex-row gap-2 items-center text-[#0F7A9D]'> <LiaFileVideoSolid /> {cardData.lessionNumber}  Lessons</div>
            </div>
        </div>
      ) : (
        <div className='bg-richblack-800 max-w-xs h-[300px] flex flex-col justify-between' onClick={tabHandler}>
            <div className='flex flex-col p-6'>
                <p className='text-pure-greys-50 text-lg font-semibold text-left'>{cardData.heading}</p>
                <p className='text-left text-[15px] text-[#6E727F] mt-4 '>{cardData.description}</p>
            </div>
            <div className='flex flex-row justify-between p-4 text-[#4f525b] border-dashed border-t-2 font-semibold'>
                <div className='flex flex-row gap-2 items-center text-[#6E727F]'><HiUsers />{cardData.level}</div>
                <div className='flex flex-row gap-2 items-center text-[#6E727F]'> <LiaFileVideoSolid /> {cardData.lessionNumber}  Lessons</div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;