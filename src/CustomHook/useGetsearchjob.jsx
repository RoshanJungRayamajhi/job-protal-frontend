import { setqueryjobs } from "@/Redux/jobSlice";
import { JOBAPI_URI } from "@/util/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetsearchjob = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.job);
  useEffect(() => {
    const getsearchjob = async () => {
      const response = await axios.get(
        `${JOBAPI_URI}/getall?keywords=${query}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setqueryjobs(response.data.job));
    };
    getsearchjob();
  }, []);
};

export default useGetsearchjob;
