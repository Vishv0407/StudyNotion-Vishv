import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from '../Components/core/HomePage/HighlightText';
import CTAButton from '../Components/core/HomePage/Button';
import bannerVideo from "../assets/Images/banner.mp4";
import CodeBlocks from '../Components/core/HomePage/CodeBlocks';
import Footer from '../Components/common/Footer'
import TimelineSection from '../Components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../Components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../Components/core/HomePage/InstructorSection';
import ReviewSection from '../Components/core/HomePage/ReviewSection';
import ExploreMore from '../Components/core/HomePage/ExploreMore';

const Home = () => {
  return (

    <div className='relative mx-auto flex flex-col w-[80%] max-w-[1280px] items-center text-white justify-between'>
      
      {/* Section 1 */}
      <div className='text-center'>

        <Link to={"/signup"}>
          <div className='group mt-16 p-1 w-fit mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
            <div className='flex items-center gap-2 rounded-full px-7 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight></FaArrowRight>
            </div>
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-8'>
          Empower Your Future with 
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className='max-w-4xl w-full text-center m-auto mt-4 text-pure-greys-300 flex justify-center'>
          <p className='w-full text-center '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </p>
        </div>

        <div className='flex gap-6 justify-center mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className=' my-12 mx-auto max-w-4xl flex justify-center'>
          <div className='custom-shadow w-sm'>
            <video muted loop autoPlay className='w-sm'>
              <source src={bannerVideo} type='video/mp4' />
            </video>          
          </div>
        </div>

        <div>
          <CodeBlocks 
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your
                <HighlightText text={"coding potential"}></HighlightText>
                with our online courses.
              </div> 
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={
              {
                btnText: "Try it Yourself",
                active: true,
                linkto: "/signup"
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                active: false,
                linkto: "/login"
              }
            }
            codeblock={
              `<!DOCTYPE html>
              <html>
              <head><title>Example</title><link rel="stylesheet"href="styles.css">
              </head>
              <body>
              <h1><a href="/">Header</a>
              </h1>
              <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>
              </nav>`
            }
            backgroundGradient={
              "codeblock1"
            }
            codeColor={"text-yellow-25"}
            />


          <CodeBlocks 
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Start 
                <HighlightText text={"coding in seconds"}></HighlightText>
                
              </div> 
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={
              {
                btnText: "Continue Lesson",
                active: true,
                linkto: "/login"
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                active: false,
                linkto: "/signup"
              }
            }
            codeblock={
              `<!DOCTYPE html>
              <html>
              <head><title>Example</title><link rel="stylesheet "href="styles.css">
              </head>
              <body>
              <h1><ahref="/">Header</a>
              </h1>
              <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>
              </nav>`
            }
            backgroundGradient={
              "codeblock2"
            }
            codeColor={"text-yellow-25"}
            />
        </div>

        <ExploreMore />

      </div>

      {/* Section 2 */}
      <div className='bg-[#F9F9F9] text-richblack-700'>
        <div className='homepage_bg h-[310px]'>
          <div className='h-[150px]'></div>
          <div className='w-11/12 max-w-maxContent flex items-center mx-auto justify-center'>
            <div className='flex flex-row gap-7 '>
              <CTAButton active={true} linkto={'/signup'}>
                <div className='flex gap-3 items-center'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={'/login'}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className='w-11/12 max-w-maxContent flex items-center mx-auto justify-center'>
            <div className='flex gap-7 flex-col md:flex-row mt-[90px] mb-[40px]'>
              <div className='text-4xl font-semibold'>
                Get the skills you need for a 
                <HighlightText text={"Job that is in demand"}/>
              </div>
              <div className='flex flex-col gap-7 items-start'>
                <div className='text-[16px]'>
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <div>
                  <CTAButton active={true} linkto={'/signup'}>
                    Learn More
                  </CTAButton>
                </div>
              </div>
            </div>
         </div>

        <TimelineSection />
        <LearningLanguageSection />

        </div>

      {/* Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
        
        <InstructorSection />
        <ReviewSection />

      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  )
}

export default Home;
