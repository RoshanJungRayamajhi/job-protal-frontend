import JobCard from '@/Components/Shared/JobCard'
import Navbar from '@/Components/Shared/Navbar'
import useGetsearchjob from '@/CustomHook/useGetsearchjob'
import React from 'react'
import { useSelector } from 'react-redux'

const Browse = () => {
  const job = useSelector(state=>state.job.queryjobs)
  useGetsearchjob();
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto mt-10'>
        <h1 className='text-2xl font-semibold'>Search results:({job.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {job.map((item,index)=>{
            return <JobCard key={index} job={item}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Browse
