import { setallcompanies } from '@/Redux/companySlice';
import { COMPANYAPI_URI } from '@/util/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useGetallcompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Define the async function inside useEffect
        const getAllCompanies = async () => {
            try {
                const response = await axios.get(`${COMPANYAPI_URI}/get`, {
                    withCredentials: true, // Moved inside the options object
                });
                if (response.data.success) {
                   
                    dispatch(setallcompanies(response?.data?.company))
                } else {
                    toast.error("Failed to fetch companies.");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while fetching companies.");
            }
        };

        getAllCompanies(); // Call the async function immediately
    }); // Dispatch is included in the dependency array
};

export default useGetallcompanies;
