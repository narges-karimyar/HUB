import { Link, useOutletContext } from "react-router-dom";
import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
  FaChevronDown,
  FaHeart,
} from "react-icons/fa6";
import product from "../Data/Products";
import { useState } from "react";

export default function FindDoctor() {
  const { open, setOpen } = useOutletContext();
  const [view, setView] = useState("map"); // "map" | "list"
  const [sort, setSort] = useState("next"); // "next" | "distance"
  return (
    <>
      <div className="background min-h-100 text-white ">
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-5">
          {/* Page Path */}
          <div className="flex items-center gap-2">
            <FaHouse />
            <p>/searchdoctor</p>
          </div>

          {/* Page Name */}
          <div className="hidden md:block">
            <p>searchdoctor</p>
          </div>

          {/* Menu Button */}
          <FaBars
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-xl"
          />

          {/* Search Box */}
          <div className="relative order-3 w-full sm:w-[250px] md:order-none md:w-[200px] lg:w-[250px]">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(112,113,115)]" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-[10px] border border-[#ccc] bg-white py-2.5 pl-[35px] pr-2.5 text-black outline-none"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <Link to="/account">
              <FaCircleUser className="text-white" />
            </Link>

            <button
              className="rounded bg-[rgba(233,231,231,0.336)] px-3 py-1 text-white"
              onClick={() => alert("You have been logged out!")}
            >
              Log out
            </button>

            <FaGear className="text-white" />
            <FaBell className="text-white" />
          </div>
        </header>

        {/* Find Doctor Section */}
        <div className="flex flex-col items-center px-4 py-10 text-center md:py-16  ">
          <h1 className="text-3xl font-bold sm:text-4xl">Find a Doctor</h1>

          <p className="mt-3 text-lg sm:text-2xl">
            Search Doctors and schedule an appointment
          </p>

          {/* Doctor Search Form */}
          <div className="mt-6 flex w-full max-w-4xl flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <input
              type="text"
              placeholder="Search a doctor by name, specialty"
              className="w-full rounded bg-white px-4 py-2 text-black outline-none sm:w-[280px]"
            />

            <input
              type="text"
              placeholder="Zip Code or Neighborhood"
              className="w-full rounded bg-white px-4 py-2 text-black outline-none sm:w-[220px]"
            />

            <button className="w-full rounded-2xl bg-blue-500 px-5 py-2 text-black hover:bg-blue-600 sm:w-auto">
              CURRENT
            </button>

            <button className="w-full rounded-2xl bg-blue-500 px-5 py-2 text-black hover:bg-blue-600 sm:w-auto">
              SEARCH
            </button>
          </div>
        </div>
      </div>
      <section className="parttwo">
        <h1 className="sm:pt-7">Special Services</h1>
        <div className="services-container">
          <div className="service-card">
            <img src={product[10].Image} alt="" />
            <span>
              <h3>Primary Care and Internal MD</h3>
              <p>
                our Doctors Partner with you to help you to reach your welness
              </p>
            </span>
            <Link to="/find-clinic">
              <FaChevronDown />
            </Link>
          </div>

          <div className="service-card">
            <img src={product[11].Image} alt="" />
            <span>
              <h3>Primary Care and Internal MD</h3>
              <p>
                our Doctors Partner with you to help you to reach your welness
              </p>
            </span>
            <Link to="/find-clinic">
              <FaChevronDown />
            </Link>
          </div>

          <div className="service-card">
            <img src={product[12].Image} alt="" />
            <span>
              <h3>Primary Care and Internal MD</h3>
              <p>
                our Doctors Partner with you to help you to reach your welness
              </p>
            </span>
            <Link to="/find-clinic">
              <FaChevronDown />
            </Link>
          </div>

          <div className="service-card">
            <img src={product[13].Image} alt="" />
            <span>
              <h3>Primary Care and Internal MD</h3>
              <p>
                our Doctors Partner with you to help you to reach your welness
              </p>
            </span>
            <Link to="//find-clinic">
              <FaChevronDown />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 */}
      <section className="parttwo">
        <h1>Find Doctors By Specialty</h1>
        <p className="m-3 text-center">
          Select a Specialty to View all Doctors and schedule an Appointment
        </p>

        <div className="servicescontainer">
          <div className="servicecard">
            <h4>Anesthesiology</h4>
            <span>
              <Link to="/find-clinic">
                <FaChevronDown />
              </Link>
            </span>
          </div>

          <div className="servicecard">
            <h4>Anesthesiology</h4>
            <span>
              <Link to="/find-clinic">
                <FaChevronDown />
              </Link>
            </span>
          </div>

          <div className="servicecard">
            <h4>Anesthesiology</h4>
            <span>
              <Link to="/find-clinic">
                <FaChevronDown />
              </Link>
            </span>
          </div>

          <div className="servicecard">
            <h4>Anesthesiology</h4>
            <span>
              <Link to="/find-clinic">
                <FaChevronDown />
              </Link>
            </span>
          </div>
        </div>
      </section>
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
