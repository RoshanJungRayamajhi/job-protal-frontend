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
import { COMPANYAPI_URI } from "@/util/constant";
import axios from "axios";
import {
  ArrowLeft,
  Building2,
  Globe,
  Link2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Media & Entertainment",
  "Real Estate",
  "Hospitality",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const BENEFIT_OPTIONS = [
  "Remote Work",
  "Flexible Hours",
  "Health Insurance",
  "Paid Leave",
  "Free Lunch",
  "Learning Budget",
  "Stock Options",
  "Gym Membership",
];

const CULTURE_OPTIONS = [
  "startup",
  "corporate",
  "hybrid",
  "remote",
  "innovative",
  "fast-paced",
  "diverse",
  "inclusive",
];

const SOCIAL_PLATFORMS = [
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/company/..." },
  { key: "twitter", label: "Twitter / X", placeholder: "twitterx.com/..." },
  { key: "facebook", label: "Facebook", placeholder: "facebook.com/..." },
  { key: "instagram", label: "Instagram", placeholder: "instagram.com/..." },
];

const SectionCard = ({ icon, title, subtitle, children }) => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
    <div className="flex items-start gap-3 px-6 py-5 border-b border-gray-100">
      {icon && (
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
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

const CompanyCreate = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      industry: "",
      companySize: "",
      foundedYear: "",
      email: "",
      phone: "",
      website: "",
      country: "",
      state: "",
      city: "",
      address: "",
      video: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [culture, setCulture] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [verified, setVerified] = useState(false);

  const name = watch("name");
  const tagline = watch("tagline");
  const description = watch("description");
  const city = watch("city");
  const country = watch("country");

  const companyInitials = name
    ?.trim()
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleValue = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const onSubmit = async (data) => {
    if (!verified) {
      toast.error("Please confirm you're authorized to represent this company.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagline", data.tagline);
    formData.append("description", data.description);
    formData.append("industry", data.industry);
    formData.append("companySize", data.companySize);
    formData.append("foundedYear", data.foundedYear);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("website", data.website);
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("video", data.video);
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("culture", JSON.stringify(culture));
    formData.append("socialLinks", JSON.stringify(socialLinks));
    if (logoFile) formData.append("file", logoFile);
    console.log(formData)

    try {
      dispatch(setloading(true));
    

      const response = await axios.post(`${COMPANYAPI_URI}/register`, formData,
         {
          
            headers: {
              "Content-Type": "multipart/form-data",    

          },
        withCredentials: true,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error registering company.");
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Register your company
          </h1>
          <p className="text-gray-500 mt-1">
            Set up your company profile to attract world-class talent.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start"
        >
          {/* Left: scrollable form sections */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Basic Information */}
            <SectionCard icon={<Building2 className="w-4 h-4 text-gray-600" />} title="Basic Information">
              <div>
                <Label required>Company Name</Label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Company name"
                  className={inputClass}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <Label>Tagline</Label>
                <input
                  {...register("tagline")}
                  type="text"
                  placeholder="A short line that captures your mission"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label required>Industry</Label>
                  <Controller
                    name="industry"
                    control={control}
                    rules={{ required: "Industry is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full rounded-xl border-gray-300 py-2.5 h-auto">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {INDUSTRIES.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError message={errors.industry?.message} />
                </div>

                <div>
                  <Label>Company Size</Label>
                  <Controller
                    name="companySize"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full rounded-xl border-gray-300 py-2.5 h-auto">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {COMPANY_SIZES.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Founded Year</Label>
                  <input
                    {...register("foundedYear")}
                    type="number"
                    placeholder="e.g. 2018"
                    className={inputClass}
                  />
                </div>
                <div>
                  <Label>Website URL</Label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      {...register("website")}
                      type="text"
                      placeholder="https://yourcompany.com"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Contact */}
            <SectionCard icon={<Mail className="w-4 h-4 text-gray-600" />} title="Contact">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Official Email</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      {...register("email", {
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                      })}
                      type="email"
                      placeholder="hr@company.com"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                  <FieldError message={errors.email?.message} />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      {...register("phone")}
                      type="text"
                      placeholder="+977 98XXXXXXXX"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Location */}
            <SectionCard icon={<MapPin className="w-4 h-4 text-gray-600" />} title="Location">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Country</Label>
                  <input {...register("country")} type="text" placeholder="Country" className={inputClass} />
                </div>
                <div>
                  <Label>State / Province</Label>
                  <input {...register("state")} type="text" placeholder="State / Province" className={inputClass} />
                </div>
                <div>
                  <Label>City</Label>
                  <input {...register("city")} type="text" placeholder="City" className={inputClass} />
                </div>
              </div>
              <div>
                <Label>Full Address</Label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="Street address"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
            </SectionCard>

            {/* About company */}
            <SectionCard title="About company">
              <div>
                <Label required>Description</Label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    maxLength: { value: 1000, message: "Max 1000 characters" },
                  })}
                  rows={5}
                  maxLength={1000}
                  placeholder="Tell candidates what makes your company special — mission, product, team, and what you're building."
                  className={`${inputClass} resize-none`}
                />
                <div className="flex justify-between mt-1">
                  <FieldError message={errors.description?.message} />
                  <span className="text-xs text-gray-400 ml-auto">
                    {(description || "").length} / 1000
                  </span>
                </div>
              </div>

              <div>
                <Label>Company Video (optional)</Label>
                <input
                  {...register("video")}
                  type="text"
                  placeholder="Link to an intro or culture video"
                  className={inputClass}
                />
              </div>
            </SectionCard>

            {/* Social links */}
            <SectionCard icon={<Link2 className="w-4 h-4 text-gray-600" />} title="Social links">
              <div className="grid grid-cols-2 gap-4">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <div key={platform.key}>
                    <Label>{platform.label}</Label>
                    <input
                      type="text"
                      placeholder={platform.placeholder}
                      value={socialLinks[platform.key] || ""}
                      onChange={(e) =>
                        setSocialLinks((prev) => ({ ...prev, [platform.key]: e.target.value }))
                      }
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Benefits */}
            <SectionCard title="Benefits" subtitle="Select all that apply.">
              <div className="flex flex-wrap gap-2">
                {BENEFIT_OPTIONS.map((benefit) => (
                  <button
                    key={benefit}
                    type="button"
                    onClick={() => toggleValue(benefits, setBenefits, benefit)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                      benefits.includes(benefit)
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {benefit}
                  </button>
                ))}
              </div>
            </SectionCard>

            {/* Company culture */}
            <SectionCard title="Company culture" subtitle="Tags that describe your team.">
              <div className="flex flex-wrap gap-2">
                {CULTURE_OPTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleValue(culture, setCulture, tag)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition ${
                      culture.includes(tag)
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </SectionCard>

            {/* Verification */}
            <SectionCard icon={<ShieldCheck className="w-4 h-4 text-gray-600" />} title="Verification">
              <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verified}
                  onChange={(e) => setVerified(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-gray-900"
                />
                <span>
                  <span className="block text-sm font-semibold text-gray-900">
                    I am authorized to represent this company.
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    We may reach out to verify. False claims can lead to account termination.
                  </span>
                </span>
              </label>
            </SectionCard>

            {loading ? (
              <div className="flex justify-center items-center py-2">
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              </div>
            ) : (
              <Button type="submit" className="w-full py-6 rounded-xl text-base font-semibold">
                Register Company
              </Button>
            )}
          </div>

          {/* Right: Company Information (logo) + Live Preview, sticky */}
          <div className="space-y-6 order-1 lg:order-2 lg:sticky lg:top-10">
            <SectionCard icon={<Building2 className="w-4 h-4 text-gray-600" />} title="Company Information">
              <div>
                <input
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition py-10 px-4"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Company logo preview"
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200 bg-white"
                    />
                  ) : (
                    <span className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Upload className="w-4.5 h-4.5 text-indigo-600" />
                    </span>
                  )}
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 text-sm">
                      {previewUrl ? "Change company logo" : "Upload company logo"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, SVG • max 4MB</p>
                  </div>
                </button>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  A square 512×512 logo works best.
                </p>
              </div>
            </SectionCard>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Live preview</h2>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Live
                </span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Company logo"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 bg-white shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center font-bold text-gray-700 shrink-0">
                      {companyInitials || "CO"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 leading-snug truncate">
                      {name || "Your company name"}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {tagline || "A short tagline that captures your mission."}
                    </p>
                    {(city || country) && (
                      <p className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                        <MapPin className="w-3 h-3" />
                        {[city, country].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {benefits.length > 0 && (
                  <div>
                    <p className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-gray-400 font-medium mb-1.5">
                      <Sparkles className="w-3 h-3" />
                      Benefits
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {benefits.slice(0, 4).map((b) => (
                        <span
                          key={b}
                          className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2.5 py-1"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreate;