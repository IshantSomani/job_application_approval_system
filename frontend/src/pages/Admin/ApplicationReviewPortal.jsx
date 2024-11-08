import { useState } from 'react'
import ReviewTable from './ReviewTable'
const ApplicationReviewPortal = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-[87vh]">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Job Applicate
          </h1>
        </div>
        <div className='bg-white'>
          <ReviewTable open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  )
}

export default ApplicationReviewPortal