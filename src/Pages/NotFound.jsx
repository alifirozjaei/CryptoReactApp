import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-full flex my-0 justify-center items-center divide-x font-extrabold text-3xl'>
      <div className='p-8'>
        404
      </div>
      <div className='p-8'>
        Page Not Found!
        <p className='text-lg'>Please check url.</p>
      </div>
    </div>
  )
}

export default NotFound
