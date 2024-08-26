import React from 'react'
import HighlightText from '../Components/core/HomePage/HighlightText'
import about1 from '../assets/Images/aboutus1.webp'
import about2 from '../assets/Images/aboutus2.webp'
import about3 from '../assets/Images/aboutus3.webp'
import image4 from '../assets/Images/FoundingStory.png'
import AboutStats from '../Components/core/AboutUs/AboutStats'
import LearningGrid from '../Components/core/AboutUs/LearningGrid'
import GetInTouch from '../Components/core/AboutUs/GetInTouch'
import Footer from '../Components/common/Footer'

const AboutUs = () => {
  return (
    <div className='flex flex-col items-center text-white justify-center'>
        {/* Section 1 */}
        <section className='bg-[#2C333F] flex flex-col justify-center items-center w-full relative pb-8 '>
            <div className='flex flex-col justify-center items-center mt-[100px] relative mx-auto w-[80%] max-w-[1280px]'>
                <header>
                    <div className='text-4xl text-center'>
                        <p className='text-center text-4xl font-semibold mt-8'>Driving Innovation in Online Education for a </p>
                        <HighlightText text={"Brighter Future"} />
                    </div>

                    <div className='max-w-4xl text-base w-full text-center m-auto mt-4 text-pure-greys-300 flex justify-center'>
                        <p className='w-full text-center'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>

                    <div className='flex flex-col justify-center items-center lg:flex-row gap-6 mt-8 px-8 mx-auto mb-[-10%]'>
                        <img src={about1} alt="aboutus1" />
                        <img src={about2} alt="aboutus2" />
                        <img src={about3} alt="aboutus3" />
                    </div>
                </header>
            </div>
        </section>

         {/* section 2 */}
        <section className='flex flex-col justify-center items-center py-20 w-full'>
            <div className=' mt-8 lg:mt-16 text-3xl text-center font-semibold md:px-12 leading-relaxed mx-auto w-[80%] max-w-[1280px] '>
                <span className='text-[#424854]'>“ </span>We are passionate about revolutionizing the way we learn. Our innovative platform 
                <HighlightText text={"combines technology"}/>,
                <span className='bg-gradient-to-r from-[#FF512F] to-[#fa7900] bg-clip-text text-transparent'>
                    {" "}
                    expertise
                </span>
                , and community to create an
                <span className='bg-gradient-to-r from-[#fdae26] to-[#F9D423] bg-clip-text text-transparent'>
                    {" "}
                    unparalleled educational experience.
                </span>
                <span className='text-[#424854]'>”</span>
            </div>
        </section>  

        <hr className='w-full text-richblack-700'/>

        {/* section 3 */}
        <section className='flex flex-col justify-center items-center w-full'>
            <div className='mx-auto w-[80%] max-w-[1280px]'>
                <div className='flex flex-col lg:flex-row justify-between my-20 gap-8'>
                    <div className='w-[100%] lg:w-[45%] flex flex-col gap-4'>
                        <h1 className='text-4xl font-bold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent'>Our Founding Story </h1>

                        <p className='text-[#838894]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p className='text-[#838894]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div className='flex items-center relative'>
                        <img className='z-10' src={image4} alt="" />
                        <div className='absolute background-effect'></div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row justify-between mb-20 gap-8'>
                    <div className='w-[100%] lg:w-[45%] flex flex-col gap-4'>
                        <h1 className='text-4xl font-bold bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'>
                            Our Vision
                        </h1>
                        <p className='text-[#838894]' >
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>
                    <div className='w-[100%] lg:w-[45%] flex flex-col gap-4'>
                        <h1 className=' text-4xl'>
                            <HighlightText text={"Our Mission"}/>
                        </h1>
                        <p className='text-[#838894]'>
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>

            </div>
        </section>

        {/* section 4 */}
        <AboutStats />

        {/* Section 5 */}
        <LearningGrid />

        {/* Section 6 */}
        <GetInTouch />

        {/* Section 7 */}
        {/* Review Slider */}

        <Footer />


    </div>
  )
}

export default AboutUs