import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
  FaChevronDown,
  FaHeart,
  FaMapLocationDot,
  FaList,
  FaLocationDot,
  FaExpand,
  FaStar,
} from "react-icons/fa6";
import product from "../Data/Products";

export default function FindClinic() {
  const { open, setOpen } = useOutletContext();
  const [view, setView] = useState("map"); // "map" | "list"
  const [sort, setSort] = useState("next"); // "next" | "distance"

  return (
    <>
      <div className="background min-h-100 text-white">
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-5">
          {/* Page Path */}
          <div className="flex items-center gap-2 ">
            <FaHouse />
            <p>/findhospital</p>
          </div>

          {/* Page Name */}
          <div className="hidden md:block">
            <p>findhospital</p>
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

        {/* Find Clinic Section */}
        <div className="flex flex-col items-center px-4 py-10 text-center md:py-16">
          <h1 className="text-3xl font-bold sm:text-4xl">Find a Clinic</h1>

          <p className="mt-3 text-lg sm:text-2xl">
            Search Clinics and schedule an appointment with doctors through
            Clinic
          </p>

          {/* Clinic Search Form */}
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

      {/* map and list  */}
      <div className="map-page  mt-5">
        {/* TOP TABS */}
        <div className="view-tabs flex gap-2.5 mb-4">
          <button
            className={`tab-btn flex items-center gap-2 px-4 py-2 rounded-lg ${
              view === "map" ? "active bg-[#e943c5] text-white" : "bg-white"
            }`}
            onClick={() => setView("map")}
          >
            <FaMapLocationDot />
            Map
          </button>
          <button
            className={`tab-btn flex items-center gap-2 px-4 py-2 rounded-lg ${
              view === "list" ? "active bg-[#e943c5] text-white" : "bg-white"
            }`}
            onClick={() => setView("list")}
          >
            <FaList />
            List
          </button>
        </div>

        <div className="main-layout flex gap-5 max-lg:flex-col">
          {/* LEFT SIDEBAR: FILTERS */}
          <aside className="filters-panel w-[260px] shrink-0 max-lg:w-full bg-white rounded-xl p-5 flex flex-col gap-3">
            <div className="filter-field">
              <input
                type="text"
                placeholder="Primary Care"
                className="w-full border border-[#ddd] rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div className="filter-field">
              <input
                type="text"
                placeholder="Zip code or Neighborhood"
                className="w-full border border-[#ddd] rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <h4 className="filter-heading font-bold mt-2">Filter By</h4>

            <div className="filter-select relative">
              <select className="w-full border border-[#ddd] rounded-lg px-3 py-2 outline-none appearance-none bg-white">
                <option value="">Specialty</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="pediatrics">Pediatrics</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm" />
            </div>

            <div className="filter-select relative">
              <select className="w-full border border-[#ddd] rounded-lg px-3 py-2 outline-none appearance-none bg-white">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm" />
            </div>

            <div className="filter-select relative">
              <select className="w-full border border-[#ddd] rounded-lg px-3 py-2 outline-none appearance-none bg-white">
                <option value="">Condition</option>
                <option value="diabetes">Diabetes</option>
                <option value="asthma">Asthma</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm" />
            </div>

            <div className="filter-select relative">
              <select className="w-full border border-[#ddd] rounded-lg px-3 py-2 outline-none appearance-none bg-white">
                <option value="">languages</option>
                <option value="en">English</option>
                <option value="fa">Dari</option>
                <option value="ps">Pashto</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm" />
            </div>

            <h4 className="filter-heading font-bold mt-2">
              Providers Who Treat
            </h4>

            <label className="filter-check flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              <div>All Ages</div>
            </label>

            <label className="filter-check flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              <div>Children</div>
            </label>

            <label className="filter-check flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              <div>Adults</div>
            </label>

            <hr className="my-2" />

            <h4 className="filter-heading font-bold">View Only</h4>

            <label className="filter-check flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              <div>Online Scheduling</div>
            </label>

            <label className="filter-check flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              <div>Primary Care</div>
            </label>
          </aside>

          {/* RIGHT: SORT + MAP/LIST */}
          <div className="map-side flex-1 min-w-0">
            <div className="sort-row flex items-center gap-3 mb-4">
              <div className="sort-label font-medium">Sort By</div>
              <button
                className={`sort-btn px-4 py-2 rounded-lg ${
                  sort === "next"
                    ? "active bg-[#e943c5] text-white"
                    : "bg-white"
                }`}
                onClick={() => setSort("next")}
              >
                Next Available
              </button>
              <button
                className={`sort-btn px-4 py-2 rounded-lg ${
                  sort === "distance"
                    ? "active bg-[#e943c5] text-white"
                    : "bg-white"
                }`}
                onClick={() => setSort("distance")}
              >
                Distance
              </button>
            </div>

            {view === "map" && (
              <div className="map-wrapper relative rounded-xl overflow-hidden h-[500px]">
                <iframe
                  className="map-iframe w-full h-full border-0"
                  src="https://www.google.com/maps?q=Kuala+Lumpur,Malaysia&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Custom pin overlays */}
                <div
                  className="map-pin absolute text-[#e943c5] text-xl"
                  style={{ top: "22%", left: "43%" }}
                >
                  <FaLocationDot />
                </div>
                <div
                  className="map-pin absolute text-[#e943c5] text-xl"
                  style={{ top: "42%", left: "39%" }}
                >
                  <FaLocationDot />
                </div>
                <div
                  className="map-pin absolute text-[#e943c5] text-xl"
                  style={{ top: "47%", left: "39%" }}
                >
                  <FaLocationDot />
                </div>
                <div
                  className="map-pin absolute text-[#e943c5] text-xl"
                  style={{ top: "58%", left: "39%" }}
                >
                  <FaLocationDot />
                </div>
                <div
                  className="map-pin absolute text-[#e943c5] text-xl"
                  style={{ top: "57%", left: "43%" }}
                >
                  <FaLocationDot />
                </div>
                <div
                  className="map-pin large absolute text-[#e943c5] text-2xl"
                  style={{ top: "55%", left: "46%" }}
                >
                  <FaLocationDot />
                </div>

                <div className="map-fullscreen-btn absolute bottom-4 right-4 bg-white rounded-lg p-2.5 cursor-pointer shadow">
                  <FaExpand />
                </div>
              </div>
            )}

            {/* LIST VIEW */}
            {view === "list" && (
              <div className="list-wrapper flex flex-col gap-4">
                <div className="list-card flex max-[600px]:flex-col gap-4 bg-white rounded-xl p-4">
                  <img
                    src={product[16].Image}
                    alt=""
                    className="list-card-img w-[160px] h-[120px] max-[600px]:w-full object-cover rounded-lg shrink-0"
                  />
                  <div className="list-card-body flex-1">
                    <h3 className="font-bold text-lg">
                      Klinik Pakar Kesihantan USIM
                    </h3>
                    <p className="list-specialty text-sm text-[#555] mt-1">
                      Bandar Baru Nilai, 71800 Nilai, Negeri Sembilan Malaysia
                      https://klinikpakar.usim.edu.my +60126504921 RQ6F+ P7
                      NILAI,Negeri Sembilan, Malaysia
                    </p>
                    <p className="list-address flex items-center gap-1.5 text-sm mt-2">
                      <FaLocationDot />
                      45 Jalan Bukit Bintang, Kuala Lumpur
                    </p>
                    <div className="list-meta flex items-center gap-3 mt-2 text-sm">
                      <div className="list-rating flex items-center gap-1">
                        <FaStar className="text-yellow-400" /> 4.8 (120 reviews)
                      </div>
                      <div className="list-distance">2.4 km away</div>
                    </div>
                  </div>
                  <div className="list-card-action flex items-center">
                    <button
                      className="schedule-btn text-white px-4 py-2 rounded-lg"
                      style={{ backgroundColor: "#e943c5" }}
                    >
                      Schedule
                    </button>
                  </div>
                </div>

                <div className="list-card flex max-[600px]:flex-col gap-4 bg-white rounded-xl p-4">
                  <img
                    src={product[17].Image}
                    alt=""
                    className="list-card-img w-[160px] h-[120px] max-[600px]:w-full object-cover rounded-lg shrink-0"
                  />
                  <div className="list-card-body flex-1">
                    <h3 className="font-bold text-lg">Dialysis Centers</h3>
                    <p className="list-specialty text-sm text-[#555] mt-1">
                      Lot 193,194 Jalan Nilai Square 6, Bandar Baru Nilai, 71800
                      Nilai, Negeri Sembilan Malaysia
                      https://klinikpakar.usim.edu.my +60126504921 RQ6F+ P7
                      NILAI,Negeri Sembilan, Malaysia
                    </p>
                    <p className="list-address flex items-center gap-1.5 text-sm mt-2">
                      <FaLocationDot />
                      45 Jalan Bukit Bintang, Kuala Lumpur
                    </p>
                    <div className="list-meta flex items-center gap-3 mt-2 text-sm">
                      <div className="list-rating flex items-center gap-1">
                        <FaStar className="text-yellow-400" /> 4.6 (98 reviews)
                      </div>
                      <div className="list-distance">3.1 km away</div>
                    </div>
                  </div>
                  <div className="list-card-action flex items-center">
                    <button
                      className="schedule-btn text-white px-4 py-2 rounded-lg"
                      style={{ backgroundColor: "#e943c5" }}
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className=" flex justify-between items-center px-10 py-5 text-xs text-[#4b5563] ">
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
