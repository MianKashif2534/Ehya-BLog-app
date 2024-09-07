//footer
import React from "react";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BsTelegram, BsYoutube } from "react-icons/bs";
import images from "../constants/images";

function Footer() {
  return (
    <>
      <section className="bg-dark-hard -translate-y-[1px]">
        <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 lg:gap-x-0 ml-2 md:grid-cols-12 lg:grid-cols-10 lg:mx-10">
          <div className="col-span-5 md:col-span-4 lg:col-span-2 lg:ml-8">
            <h5 className="text-xl font-bold text-dark-light  md:text-lg">Product</h5>
            <ul className="text-[#959EAD] text-sm space-y-3 mt-5 mx-[2px] md:text-base">
              <li>
                <a href="/">Landingpage</a>
              </li>
              <li>
                <a href="/">Features</a>
              </li>
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">Referral Program</a>
              </li>
              <li>
                <a href="/">Pricing</a>
              </li>
            </ul>
          </div>

          <div className="col-span-5 md:col-span-4 lg:col-span-2 lg:ml-8">
            <h5 className="text-xl font-bold text-dark-light  md:text-lg">Services</h5>
            <ul className="text-[#959EAD] text-sm space-y-3 mt-5 mx-[2px] md:text-base">
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">Design</a>
              </li>
              <li>
                <a href="/">Themes</a>
              </li>
              <li>
                <a href="/">Illustrations</a>
              </li>
              <li>
                <a href="/">UI Kit</a>
              </li>
            </ul>
          </div>

          <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto lg:ml-8">
            <h5 className="text-xl font-bold text-dark-light  md:text-lg">Company</h5>
            <ul className="text-[#959EAD] text-sm space-y-3 mt-5 mx-[2px] md:text-base">
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Terms</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Careers</a>
              </li>
            </ul>
          </div>

          <div className="col-span-5 md:col-span-4 lg:col-span-2 lg:ml-8">
            <h5 className="text-xl font-bold text-dark-light md:text-lg">More</h5>
            <ul className="text-[#959EAD] text-sm space-y-3 mt-5 mx-[2px] md:text-base">
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">License</a>
              </li>
              <li>
                <a href="/">Changelog</a>
              </li>
            </ul>
          </div>

          <div className="col-span-10 mt-10 md:mt-2 space-y-7 md:order-first md:col-span-4 lg:col-span-2">
            <img
              className="mx-auto md:mx-0 brightness-0 invert"
              src={images.Logo}
              alt=""
            />
            <p className="text-dark-light text-sm text-center md:text-left md:text-base">
              Build a modern and creative website with crealand
            </p>
            <ul className="flex justify-center items-center md:justify-start text-gray-100 mt-5 space-x-1 text-base">
              <li className="w-6 h-auto">
                <a href="/">
                  <AiFillTwitterCircle />
                </a>
              </li>
              <li className="w-6 h-auto">
                <a href="/">
                  <BsTelegram />
                </a>
              </li>
              <li className="w-6 h-auto">
                <a href="/">
                  <IoLogoWhatsapp />
                </a>
              </li>
              <li className="w-6 h-auto">
                <a href="/">
                  <AiFillInstagram />
                </a>
              </li>
              <li className="w-8 h-auto">
                <a href="/">
                  <BsYoutube />
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden md:flex flex-col justify-center items-center col-span-12 space-y-4 mt-4 lg:mt-10 lg:col-span-10">
            <div className=" bg-primary p-3 rounded-full ">

          <FaHeart className="h-auto w-5 text-white"/>
            </div>
            <p className="italic font-bold text-dark-light">Copyright © 2024. Kashif Mehmood.</p>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
