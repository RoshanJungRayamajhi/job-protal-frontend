import { Button } from "@/Components/ui/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { setloading } from "@/Redux/authSlice";
import axios from "axios";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  DollarSign,
  FileText,
  Loader2,
  Minus,
  MapPin,
  Plus,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EMPLOYMENT_TYPES = ["Full Time", "Part Time", "Internship", "Contract", "Freelance"];

const SectionCard = ({ icon, title, subtitle, children }) => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
    <div className="flex items-start gap-3 px-6 py-5 border-b border-gray-100">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
    <div className="p-6 space-y-5">{children}</div>
  </div>
);

const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const FieldError = ({ message }) =>
  message ? <p className="text-red-500 text-xs mt-1">{message}</p> : null;

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition";

const AdminJobCreate = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
      jobType: "",
      experience: "",
      position: 1,
      company: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { allcompanies } = useSelector((state) => state.company);

  const watched = watch();
  const selectedCompany = allcompanies?.find((c) => c._id === watched.company);
 
 
  const companyInitials = selectedCompany?.logo;
  const position = watched.position || 1;

  const onSubmit = async (data) => {
    console.log("hello from form data")
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("requirements", data.requirements);
    formData.append("location", data.location);
    formData.append("salary", data.salary);
    formData.append("jobType", data.jobType);
    formData.append("experience", data.experience);
    formData.append("position", data.position);
    formData.append("company", selectedCompany?._id);

    try {
      dispatch(setloading(true));
      const response = await axios.post(
        `https://jobprotal-backend.onrender.com/api/job/post`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("response from job post", response)
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/admin/jobs");
        
      }
    } catch (error) {
      console.log("error from job post", error)
      toast.error(error?.response?.data?.message || "Error creating job.");
    }finally{
      dispatch(setloading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Create New Job
            </h1>
            <p className="text-gray-500 mt-1">
              Publish a professional job posting in a few minutes.
            </p>
          </div>
          <span className="text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 bg-white whitespace-nowrap">
            {isDirty ? "Unsaved changes" : "No changes yet"}
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start"
        >
          {/* Left: form sections */}
          <div className="space-y-6">
            {/* Company Information */}
            <SectionCard
              icon={<Building2 className="w-4 h-4 text-gray-600" />}
              title="Company Information"
              subtitle="Who is hiring for this role."
            >
              <div>
                <Label required>Company</Label>
                {allcompanies?.length > 0 ? (
                  <>
                    <Controller
                      name="company"
                      control={control}
                      rules={{ required: "Please select a company" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full rounded-xl border-gray-300 py-2.5 h-auto">
                            <SelectValue placeholder="Select a company" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {allcompanies.map((company) => (
                                <SelectItem key={company._id} value={company._id}>
                                  {company.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <p className="text-xs text-gray-400 mt-1.5">
                      Search from your linked organizations.
                    </p>
                    <FieldError message={errors.company?.message} />
                  </>
                ) : (
                  <p className="text-red-500 text-sm">
                    You have to register a company first
                  </p>
                )}
              </div>
            </SectionCard>

            {/* Job Details */}
            <SectionCard
              icon={<Briefcase className="w-4 h-4 text-gray-600" />}
              title="Job Details"
              subtitle="The essentials candidates see first."
            >
              <div>
                <Label required>Job Title</Label>
                <input
                  {...register("title", {
                    required: "Job title is required",
                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                  })}
                  type="text"
                  placeholder="e.g. Senior Product Designer"
                  className={inputClass}
                />
                <FieldError message={errors.title?.message} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>Experience Required</Label>
                  <input
                    {...register("experience", {
                      required: "Job experience is required",
                      min: { value: 0, message: "Must be 0 or greater" },
                    })}
                    type="number"
                    placeholder="e.g. 2"
                    className={inputClass}
                  />
                  <FieldError message={errors.experience?.message} />
                </div>

                <div>
                  <Label required>Number of Openings</Label>
                  <div className="flex items-center justify-between rounded-xl border border-gray-300 px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => setValue("position", Math.max(1, position - 1), { shouldDirty: true })}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      {...register("position", {
                        required: "Job position is required",
                        min: { value: 1, message: "Position must be at least 1" },
                        pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" },
                      })}
                      type="number"
                      className="w-14 text-center font-semibold text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setValue("position", position + 1, { shouldDirty: true })}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <FieldError message={errors.position?.message} />
                </div>
              </div>

              <div>
                <Label required>Employment Type</Label>
                <Controller
                  name="jobType"
                  control={control}
                  rules={{ required: "Job type is required" }}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {EMPLOYMENT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => field.onChange(type)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                            field.value === type
                              ? "border-gray-900 bg-gray-900 text-white"
                              : "border-gray-300 text-gray-600 hover:border-gray-400"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                />
                <FieldError message={errors.jobType?.message} />
              </div>
            </SectionCard>

            {/* Location */}
            <SectionCard
              icon={<MapPin className="w-4 h-4 text-gray-600" />}
              title="Location"
              subtitle="Where the role is based."
            >
              <div>
                <Label required>Job Location</Label>
                <input
                  {...register("location", { required: "Job location is required" })}
                  type="text"
                  placeholder="e.g. Kathmandu, Nepal"
                  className={inputClass}
                />
                <FieldError message={errors.location?.message} />
              </div>
            </SectionCard>

            {/* Compensation */}
            <SectionCard
              icon={<DollarSign className="w-4 h-4 text-gray-600" />}
              title="Compensation"
              subtitle="Set an honest, competitive salary."
            >
              <div>
                <Label required>Salary</Label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    {...register("salary", {
                      required: "Job salary is required",
                      min: { value: 0, message: "Salary must be a positive number" },
                    })}
                    type="number"
                    placeholder="90000"
                    className={`${inputClass} pl-9`}
                  />
                </div>
                <FieldError message={errors.salary?.message} />
              </div>
            </SectionCard>

            {/* Job Description */}
            <SectionCard
              icon={<FileText className="w-4 h-4 text-gray-600" />}
              title="Job Description"
              subtitle="Describe the role, expectations and requirements."
            >
              <div>
                <Label required>Description</Label>
                <textarea
                  {...register("description", {
                    required: "Job description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                  })}
                  rows={4}
                  placeholder="Describe the role, responsibilities and team culture..."
                  className={`${inputClass} resize-none`}
                />
                <FieldError message={errors.description?.message} />
              </div>

              <div>
                <Label required>Requirements</Label>
                <textarea
                  {...register("requirements", { required: "Job requirements are required" })}
                  rows={4}
                  placeholder="List the skills seperated by commas and qualifications you're looking for..."
                  className={`${inputClass} resize-none`}
                />
                <FieldError message={errors.requirements?.message} />
              </div>
            </SectionCard>

            {loading ? (
              <div className="flex justify-center items-center py-2">
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              </div>
            ) : (
              <Button type="submit" className="w-full py-6 rounded-xl text-base font-semibold">
                Publish Job
              </Button>
            )}
          </div>

          {/* Right: live preview */}
          <div className="hidden lg:block sticky top-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wider text-gray-400">
                LIVE PREVIEW
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Updating
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="h-24 bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-500" />
              <div className="px-5 -mt-8">
                <img
                  src={companyInitials}
                  alt="Company Logo"
                  className="w-14 h-14 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center font-bold text-gray-800"
                />
              </div>

              <div className="px-5 pt-3 pb-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900 text-lg leading-snug">
                    {watched.title || "Job title"}
                  </h3>
                  {watched.jobType && (
                    <span className="shrink-0 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2.5 py-1">
                      {watched.jobType}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  {selectedCompany?.name || "Company name"}
                </p>

                {watched.experience !== "" && watched.experience !== undefined && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2.5 py-1">
                      {watched.experience} yrs experience
                    </span>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
                        Location
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {watched.location || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <DollarSign className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
                        Salary
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {watched.salary ? `$${Number(watched.salary).toLocaleString()}` : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Briefcase className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
                        Openings
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {position} position{position > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  className="w-full mt-5 bg-gray-900 text-white text-sm font-semibold rounded-xl py-3 opacity-90"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminJobCreate;