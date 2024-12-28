import { setsinglecompany } from "@/Redux/companySlice";
import { COMPANYAPI_URI } from "@/util/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useSingleCompany = (id) => {
  const dispatch = useDispatch();


  useEffect(() => {
    const getSingleCompany = async () => {

      try {
        const response = await axios.get(
          `${COMPANYAPI_URI}/get/${id}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(setsinglecompany(response?.data?.company));
        } else {
          toast.error("Failed to fetch company.");
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while fetching the company."
        );
      }
    };

    if (id) {
      getSingleCompany(); // Call the async function only if `id` is provided
    }
  }, [dispatch, id]); // Include `dispatch` and `id` in the dependency array
};

export default useSingleCompany;
