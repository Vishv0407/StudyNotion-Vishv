import React from 'react'

const stats = [
    {count: "5K+", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},    
]

const AboutStats = () => {
    
  return (
    <section className='bg-richblack-800 flex flex-col justify-center items-center w-full'>
        <div className='mx-auto w-[80%] max-w-[1280px] p-8'>
            <div className='flex flex-row justify-center lg:justify-between items-center flex-wrap '>
                {
                    stats.map((data, index) => {
                        return (
                            <div key={index} className='p-12 flex flex-col justify-center items-center'> 
                                <h1 className='text-3xl font-bold text-center'>{data.count}</h1>
                                <p className='text-[#95969b] font-semibold text-lg text-center'>{data.label}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default AboutStats