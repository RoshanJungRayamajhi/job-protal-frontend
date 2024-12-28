import React, { useEffect } from 'react'
import Navbar from '../Components/Shared/Navbar'
import Hero from '@/Components/Shared/Hero'
import CategoryCrausal from '@/Components/Shared/CategoryCrausal'
import Latestjob from '@/Components/Shared/Latestjob'
import Footer from '@/Components/Shared/Footer'
import useGetalljobs from '@/CustomHook/useGetalljobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetallappliedjobs from '@/CustomHook/useGetallappliedjobs'

const Home = () => {
  useGetalljobs();
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.auth)

  

  useEffect(() => {
   if(user?.role === "recruiter"){
    navigate("/admin/companies")
   }
  
   
  }, [])
  
  return (
    <>
    <Navbar/>
    <Hero/>
    <CategoryCrausal/>
    <Latestjob/>
    <Footer/>
    </>
  )
}

export default Home