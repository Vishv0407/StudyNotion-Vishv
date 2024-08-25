import React from 'react'
import CTAButton from './Button';
import HighlightText  from './HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex flex-col my-20 justify-between items-center gap-10 ${position} ` }>
        
        {/* section 1 */}
        <div className='w-full items-center lg:w-[50%] flex flex-col justify-center text-center gap-8 lg:text-left'> 
            {heading}
            <div className='text-richblack-300 text-bold max-w-lg'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >
                    <div className='flex gap-2 items-center'>
                        {ctabtn2.btnText}
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>
        </div>

        {/* Section 2 */}

        <div className='text-[10px] md:text-base w-[60%] flex flex-row gap-0 h-fit  justify-center code-border p-4 relative  lg:max-w-lg'>
            <div className={`${backgroundGradient} absolute`}>
            </div>
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold '>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] lg:w-[500px] flex flex-col text-left font-inter font-semibold ${codeColor} font-style`}>
                <TypeAnimation
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    cursor= {true}
                    omitDeletionAnimation= {true}
                    style={
                        {
                            whiteSpace: "pre-line",
                            display: "block"
                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks;