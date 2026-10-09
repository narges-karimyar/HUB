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
} from "react-icons/fa6";
import product from "../Data/Products";

export default function MyDependents() {
  const { open, setOpen, onLogout } = useOutletContext();
  return (
    <>
      <div className="contentTwo font-[Merriweather,serif] ">
        <header className="flex justify-between max-[600px]:flex-wrap p-5 gap-2.5 m-2.5">
          <FaHouse />
          <p>/ mydependents</p>
          <div>
            <p>
              <b>mydependents</b>
            </p>
          </div>

          <FaBars onClick={() => setOpen(!open)} className="cursor-pointer" />
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

      <div className="container mx-auto w-full px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <div className="text-center py-5 sm:py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl m-2 text-[#344a70]">
            <b>Build Your Profile</b>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            This information will let us know more about your Family.
          </p>
        </div>

        {/* Progress Lines */}
        <div className="flex items-center w-full max-w-[500px] mx-auto px-2">
          {/* Circle 1 */}
          <div className="w-4 h-4 shrink-0 rounded-full bg-[#344a70]"></div>

          {/* Line */}
          <div className="h-[2px] bg-[#dfe3e8] flex-1"></div>

          {/* Circle 2 */}
          <div className="w-3.5 h-3.5 shrink-0 rounded-full bg-white border-2 border-[#dfe3e8]"></div>

          {/* Line */}
          <div className="h-[2px] bg-[#dfe3e8] flex-1"></div>

          {/* Circle 3 */}
          <div className="w-3.5 h-3.5 shrink-0 rounded-full bg-white border-2 border-[#dfe3e8]"></div>
        </div>

        {/* Progress Labels */}
        <div className="grid grid-cols-3 gap-2 max-w-[600px] mx-auto mt-3">
          <p className="text-center text-xs sm:text-sm md:text-base text-[#344a70]">
            Dependents Registration
          </p>

          <p className="text-center text-xs sm:text-sm md:text-base text-[#dfe3e8]">
            Dependents Health Records
          </p>

          <p className="text-center text-xs sm:text-sm md:text-base text-[#dfe3e8]">
            Family Care Plan
          </p>
        </div>
      </div>

      <div className="bgformbox">
        <div className="text-center p-4 sm:p-6 md:p-8">
          <h1 className="text-[#344a70] text-2xl">
            Let's start with the basic information
          </h1>

          <p className="text-gray-400 mt-3">
            Let us know your name and last name for contacting you.
          </p>
        </div>

        {/* form */}

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
                {Array.from({ length: 100 }, (_, i) => 2026 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Relation and Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="relation" className="block mb-2">
                Relation
              </label>
              <input
                type="text"
                name="relation"
                id="relation"
                placeholder="Eg. Mother"
                className="border w-full rounded-md text-gray-700 p-2"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block mb-2">
                I'm
              </label>
              <select
                name="gender"
                id="gender"
                defaultValue=""
                className="border w-full rounded-md p-2 text-gray-700"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-md px-6 py-2 text-white bg-gradient-to-r from-[#353C66] to-[#20243D] "
          >
            Next
          </button>
        </form>
      </div>

      <footer className=" lg:flex justify-between items-center px-10 py-5 text-xs text-[#4b5563] ">
        <p>
          © 2026, made with{" "}
          <FaHeart className="inline text-[rgb(112,113,115)]" />{" "}
          <b className="text-[rgb(25,62,125)]">MyPiHUB</b> for a better web.
        </p>
        <div className="div flex gap-[25px] items-center">
          <p>MyPatientHUB</p>
          <p>About Us</p>
          <p>Blog</p>
        </div>
      </footer>
    </>
  );
}
