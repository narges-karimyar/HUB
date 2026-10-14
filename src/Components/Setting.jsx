import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
  FaCircleExclamation,
  FaHeart,
  FaRocket,
} from "react-icons/fa6";
import product from "../Data/Products";

export default function Settings() {
  const { open, setOpen, onLogout } = useOutletContext();
  return (
    <>
      <div className="contentTwo font-[Merriweather,serif] ">
        <header className="flex justify-between max-[600px]:flex-wrap p-5 gap-2.5 m-2.5">
          <FaHouse />
          <p>/ accountsetting</p>
          <div>
            <p>
              <b>accountsetting</b>
            </p>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer p-2"
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
          <div className="search-box relative w-[250px] max-lg:w-[150px] max-[600px]:w-full max-[600px]:order-3">
            <FaMagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[rgb(112,113,115)]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2.5 pr-2.5 pl-[35px] border border-[#ccc] rounded-[10px]"
            />
          </div>
          <div className="iconsbox flex items-center gap-2.5 p-2.5 text-[rgb(112,113,115)]">
            <Link to="/account">
              <FaCircleUser />
            </Link>
            <button
              className="border-none bg-[rgba(233,231,231,0.336)]"
              onClick={() => {
                alert("You have been logged out!");
                onLogout();
              }}
            >
              log out
            </button>
            <FaGear />
            <FaBell />
          </div>
        </header>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start">
        <div className="boxbg">
          <span className="flex gap-2">
            <FaRocket size={15} className="shrink-0 mt-2 text-[#344a70] " />
            <p>Profile</p>
          </span>
        </div>
        {/* 1 part  */}
        <div>
          <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
            <img
              src={product[18].Image}
              alt={product[18].name}
              className="h-[60px] w-[60px] rounded-full object-cover"
            />

            <div>
              <h1 className="font-semibold">Azam Shah</h1>
              <p className="text-sm text-gray-500">Patient</p>
            </div>
          </div>

          {/* form section */}
          <div className="bgformbox">
            <h1 className="p-3 text-2xl">Basic Info Basic Info</h1>
            <form className="w-full max-w-3xl mx-auto p-6">
              {/* First and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Eg. Michael"
                    className="border w-full rounded-md text-gray-700 p-2"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Eg. Thomson"
                    className="border w-full rounded-md text-gray-700 p-2"
                  />
                </div>
              </div>

              {/* Birth Date */}
              <div className="mb-6">
                <label className="block mb-2">Birth date</label>

                <div className="grid grid-cols-3 gap-3">
                  <select
                    name="month"
                    defaultValue=""
                    className="border w-full rounded-md p-2 text-gray-700"
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <select
                    name="day"
                    defaultValue=""
                    className="border w-full rounded-md p-2 text-gray-700"
                  >
                    <option value="" disabled>
                      Day
                    </option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>

                  <select
                    name="year"
                    defaultValue=""
                    className="border w-full rounded-md p-2 text-gray-700"
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {Array.from({ length: 100 }, (_, i) => 2026 - i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              {/* Relation and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="gender" className="block mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="example@gmail.com"
                    className="border w-full rounded-md text-gray-700 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="relation" className="block mb-2">
                    Blood group
                  </label>
                  <input
                    type="text"
                    name="relation"
                    id="relation"
                    placeholder="A+"
                    className="border w-full rounded-md text-gray-700 p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                <div>
                  <label htmlFor="relation" className="block mb-2">
                    your location
                  </label>
                  <input
                    type="text"
                    name="relation"
                    id="relation"
                    placeholder="Sydney, A"
                    className="border w-full rounded-md text-gray-700 p-2"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block mb-2">
                    phone number
                  </label>
                  <input
                    type="number"
                    name="number"
                    id=""
                    placeholder="+93700000000"
                    className="border w-full rounded-md text-gray-700 p-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                <div>
                  <label htmlFor="relation" className="block mb-2">
                    Height
                  </label>
                  <input
                    type="text"
                    name="relation"
                    id="relation"
                    placeholder="Height"
                    className="border w-full rounded-md text-gray-700 p-2"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="Weight"
                    id=""
                    placeholder="Weight"
                    className="border w-full rounded-md text-gray-700 p-2"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
