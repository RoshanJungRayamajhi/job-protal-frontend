import Navbar from '@/Components/Shared/Navbar'
import { Button } from '@/Components/ui/Button'
import { setsinglecompany } from '@/Redux/companySlice';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            companyName: "",
        },
    });

    const registerCompany = async (data) => {
        try {
            const response = await axios.post("https://jobprotal-backend.onrender.com/api/company/register", {
                name: data.companyName
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (response?.data?.success) {
                dispatch(setsinglecompany(response.data.company))
                toast.success(response.data.message)
                const companyId = response.data.company._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto mt-8'>
                <form onSubmit={handleSubmit(registerCompany)}>
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl font-semibold capitalize'>your Company name</p>
                        <p className='text-sm text-gray-500'>what would you like to name your company? you can change it later</p>
                        <div className='mt-4 grid grid-cols-3 gap-4'>
                            <label className='font-medium'>Company Name</label>
                            <div className='col-span-2'>
                                <input
                                    {...register("companyName", {
                                        required: "Company name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Company name must be at least 2 characters",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Company name must not exceed 100 characters",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9\s&.,'-]+$/,
                                            message: "Company name contains invalid characters",
                                        },
                                    })}
                                    placeholder='Google, Microsoft'
                                    type="text"
                                    className='w-full p-2 rounded-md border border-gray-300'
                                />
                                {errors.companyName && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.companyName.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex justify-end gap-4 mt-4'>
                            <Button
                                type="button"
                                onClick={() => navigate("/admin/companies")}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Registering..." : "Continue"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanyCreate
