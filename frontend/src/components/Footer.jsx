import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------left section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
            esse saepe, sunt asperiores voluptatem eius nemo molestiae expedita
            enim omnis?
          </p>
        </div>

        {/* ------middle section */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-grya-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ------right section */}
        <div>
          <p className="text-xl font-medium mb-5">Get In touch</p>
          <ul className="flex flex-col gap-2 text-grya-600">
            <li>+1-223-442-244</li>
            <li>xyz@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* ----------copyright text ------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          CopyRight Lorem, ipsum dolor.
        </p>
      </div>
    </div>
  );
};

export default Footer;
