import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";

const AddDoctor = () => {
  const { backendUrl, aToken } = useContext(AdminContext);

  const [docImg, setDocImg] = useState("");
  const [docImgFile, setDocImgFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setDocImg("");
    setDocImgFile(null);
    setName("");
    setEmail("");
    setPassword("");
    setExperience("1 Year");
    setFees("");
    setAbout("");
    setSpeciality("General physician");
    setDegree("");
    setAddress1("");
    setAddress2("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImgFile) {
      toast.error("Please upload a doctor image.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("image", docImgFile);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken },
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message || "Doctor added successfully");
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel p-4 sm:p-5 md:p-6">
      <h1 className="mb-5 text-2xl font-extrabold text-slate-900">Add doctor</h1>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="h-16 w-16 rounded-full bg-slate-100 object-cover"
              src={docImg || assets.upload_area}
              alt="Upload doctor"
            />
          </label>
          <input
            id="doc-img"
            type="file"
            hidden
            onChange={(event) => {
              const file = event.target.files[0];
              if (!file) return;
              setDocImgFile(file);
              setDocImg(URL.createObjectURL(file));
            }}
          />
          <p className="text-sm text-slate-600">Upload doctor image</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Doctor name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Doctor email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Doctor password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Experience
            <select
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Fees
            <input
              type="number"
              value={fees}
              onChange={(event) => setFees(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Speciality
            <select
              value={speciality}
              onChange={(event) => setSpeciality(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </label>

          <label className="text-sm font-medium text-slate-700">
            Degree
            <input
              type="text"
              value={degree}
              onChange={(event) => setDegree(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Address line 1
            <input
              type="text"
              value={address1}
              onChange={(event) => setAddress1(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              required
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Address line 2
            <input
              type="text"
              value={address2}
              onChange={(event) => setAddress2(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
              required
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-slate-700">
          About
          <textarea
            rows={5}
            value={about}
            onChange={(event) => setAbout(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
            required
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Adding doctor..." : "Add doctor"}
        </button>
      </form>
    </section>
  );
};

export default AddDoctor;
