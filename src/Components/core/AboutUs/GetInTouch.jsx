import React from 'react'
import ContactUsForm from './ContactUsForm'

const GetInTouch = () => {
  return (
    <section>
        <div className='flex flex-col sm:w-full  mx-auto p-8'>
          <h1 className='text-4xl font-bold text-center'>
            Get in Touch
          </h1>
          <p className='font-medium text-richblack-200 text-center mb-8 mt-3'>
            We’d love to here for you, Please fill out this form.
          </p>
          <div>
            <ContactUsForm />
          </div>
        </div>
    </section>
  )
}

export default GetInTouch