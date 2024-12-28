import { setallappliedjobs } from '@/Redux/jobSlice'
import { APPLICATIONAPI_URI } from '@/util/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetallappliedjobs = () => {
    const dispatch = useDispatch();
    const {allappliedjobs} = useSelector(state=>state.job)
 
    useEffect(() => {
        const getallappliedjobs = async()=>{
            const response = await axios.get(`${APPLICATIONAPI_URI}/get`,{
                withCredentials:true
            })
            dispatch(setallappliedjobs(response.data.application))
        }
        getallappliedjobs()
    }, [])
    
}

export default useGetallappliedjobs
