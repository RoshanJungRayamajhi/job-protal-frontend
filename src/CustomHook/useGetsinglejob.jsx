import { setsinglejob } from "@/Redux/jobSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOBAPI_URI } from "@/util/constant";
import axios from "axios";


const useGetsinglejob = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axios.get(`${JOBAPI_URI}/get/${id}`);
        if (response.data.success) {
          dispatch(setsinglejob(response.data.job));
        }
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }
    };

    if (id) {
      fetchSingleJob();
    }
  }, [id, dispatch]); // Dependencies: id and dispatch
};

export default useGetsinglejob;
