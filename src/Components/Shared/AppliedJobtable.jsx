import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSelector } from 'react-redux'

const AppliedJobtable = () => {
  
  const {allappliedjobs} = useSelector(state=>state.job)
  const [appliedjobs,setappliedjobs] = useState([])
  useEffect(()=>{
    setappliedjobs(allappliedjobs)
  },[allappliedjobs])
  return (
    <div>
      <Table>
        <TableCaption>
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
              appliedjobs.map((item,index)=>{
              return (
                <TableRow key={index}>
                  <TableCell>{item.job?.title}</TableCell>
                  <TableCell>{item.job?.company?.name}</TableCell>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell><div className={`${item.status == "accepted"?"bg-green-500":"bg-red-500"} text-white  rounded-full w-fit`}>
                    <div className={`${item.status == "rejected"?"bg-red-500":"bg-green-500"} text-white px-2 py-1 rounded-full w-fit`}>
                    {item.status}
                    </div>
                    </div></TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobtable
