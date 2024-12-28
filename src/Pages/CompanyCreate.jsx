import Navbar from '@/Components/Shared/Navbar'
import { Button } from '@/Components/ui/Button'
import { setsinglecompany } from '@/Redux/companySlice';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState("")
    const dispatch = useDispatch()
    const registerCompany = async()=>{
        try {
            const response = await axios.post("http://localhost:8000/api/company/register",{
                name:companyName
            },{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
           if(response?.data?.success){
            dispatch(setsinglecompany(response.data.company))
            toast.success(response.data.message)
            const companyId = response.data.company._id
            navigate(`/admin/companies/${companyId}`)
           }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
  return (
    <div>
            <Navbar/>
            <div className='max-w-4xl mx-auto mt-8'>
                <div className='flex flex-col gap-2'>
                    <p className='text-2xl font-semibold capitalize'>your Company name</p>
                    <p className='text-sm text-gray-500'>what would you like to name your company?you can change it later</p>
                    <div className=' mt-4 grid grid-cols-3 gap-4'>
                        <label>Company Name</label>
                        <input onChange={(e)=>setCompanyName(e.target.value)}  placeholder='Google,microsoft' type="text" className='w-full p-2 rounded-md border border-gray-300 col-span-2' />
                    </div>
                    <div className='flex justify-end gap-4'>
                        <Button onClick={()=>navigate("/admin/companies")} variant="outline">Cancel</Button>
                        <Button  onClick={registerCompany}>Continue</Button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CompanyCreate
