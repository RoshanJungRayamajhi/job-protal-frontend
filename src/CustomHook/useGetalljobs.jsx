import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setalljobs } from "../Redux/jobSlice.js";
import { JOBAPI_URI } from "@/util/constant.js";

const useGetalljobs = () => {
  const dispatch = useDispatch();
  const fetchalljobs = async () => {
    try {
      const response = await axios.get(`${JOBAPI_URI}/getall`);
 
      if (response.data.success) {
        dispatch(setalljobs(response.data.job));
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchalljobs();
  }, []);
};

export default useGetalljobs;
