import { setalladminjobs } from '@/Redux/jobSlice';
import { JOBAPI_URI } from '@/util/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetalladminjobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Define the async function inside useEffect
        const getAllJobs = async () => {
            try {
                const response = await axios.get(`${JOBAPI_URI}/get/adminjob`, {
                    withCredentials: true, // Moved inside the options object
                });
                console.log(response.data)

                if (response.data.success) {
                   
                    dispatch(setalladminjobs(response?.data?.job))
                } else {
                    toast.error("Failed to fetch companies.");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while fetching companies.");
            }
        };

        getAllJobs(); // Call the async function immediately
    }, [dispatch]); // Dispatch is included in the dependency array
};

export default useGetalladminjobs;