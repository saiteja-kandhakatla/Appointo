import React, { useState } from "react";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
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

  return (
    <form className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Upload Section */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover"
              src={docImg ? docImg : assets.upload_area}
              alt="upload area"
            />
          </label>
          <input
            onChange={(e) => {
              if (e.target.files[0]) {
                setDocImg(URL.createObjectURL(e.target.files[0]));
              }
            }}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Doctor Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Email"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <p>Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <p>Experience</p>
              <select className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500">
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Fees</p>
              <input
                type="number"
                placeholder="Fees"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Speciality</p>
              <select className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p>Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <p>Address</p>
              <input
                type="text"
                placeholder="Address 1"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500 mb-2"
              />
              <input
                type="text"
                placeholder="Address 2"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* About section */}
        <div className="mt-6">
          <p>About</p>
          <textarea
            placeholder="Write about doctor"
            rows={5}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
