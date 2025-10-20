import React from "react";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          Contact: <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-content-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt="contact-Image"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p>OUR OFFICE</p>
          <p className="font-semibold text-lg text-gray-500">
            USHODAYA COLONY PLOT NO 90&91 <br />
            GAJULARAMARAM
          </p>
          <p className="text-gray-500">
            TELPHONE:9441718972 <br />
          </p>
          <p className="font-semibold text-lg text-gray-600">
            contact@gmail.com
          </p>
          <p className="text-gray-500">Carres at Appointo</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
