import { Link, useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import HighlightAndZoomLineChart from "./HighlightAndZoomLineChart";
import SimpleBarChart from "./SimpleBarChart";
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
import CircleChart from "./CircleChart";
import SecondCircle from "./SecondCircle";
import LineBarAreaChart from "./LineBarAreaChart";

export default function Dashboard() {
  const { open, setOpen, onLogout } = useOutletContext();

  // Search
  const [search, setSearch] = useState("");

  // Map state — added to fix the error
  const [zipCode, setZipCode] = useState("");
  const [locationQuery, setLocationQuery] = useState("Kabul, Afghanistan");
  const [error, setError] = useState("");

  const products = [
    { id: "cardpro1", name: "Promotion by Clinics" },
    { id: "cardpro2", name: "Promotion by Pharmacies" },
    { id: "cardpro3", name: "Smart Market Usage by app" },
    { id: "cardpro4", name: "Health Index" },
    { id: "cardpro5", name: "Choronic wellness" },
    { id: "cardpro6", name: "Appointment" },
  ];

  const items = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="contentTwo font-[Merriweather,serif]">
      <header className="flex justify-between max-[600px]:flex-wrap p-5 gap-2.5 m-2.5">
        <FaHouse />
        <p>/ Dashbord</p>
        <div>
          <p>Dashboard</p>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

          <Link to="/settings">
            <FaGear />
          </Link>

          <button onClick={() => alert("It is pending")}>
            <FaBell />
          </button>
        </div>
      </header>

      <div>
        <h1 className="text-[2em] font-bold my-[0.67em]">
          Welcome To MyPatietnHUB!
        </h1>

        <div className="gridpart grid grid-cols-2 gap-x-5 gap-y-2.5 max-lg:grid-cols-1">
          {/* First card */}
          {products[0].name.toLowerCase().includes(search.toLowerCase()) && (
            <div
              id="cardpro1"
              className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[300px] w-full max-lg:w-full max-lg:h-auto overflow-hidden"
            >
              <div
                id="protitle"
                className="flex items-center justify-between mb-[15px]"
              >
                <p className="text-[#4b5563]" id="name">
                  <i>Promotion by Clinics</i>
                </p>
                <FaCircleExclamation className="text-[rgb(112,113,115)]" />
              </div>

              <div
                id="procontent"
                className="flex gap-5 max-lg:flex-col max-lg:items-center"
              >
                <div
                  id="probox"
                  className="flex flex-col items-center w-[200px]"
                >
                  <span>
                    <SecondCircle />
                  </span>

                  <button className="mt-2.5 px-2.5 py-2 border-none rounded-md bg-[#f1f1f1] text-[10px] cursor-pointer">
                    MORE DETAILS
                  </button>
                </div>

                <div id="clinicbox" className="flex-1">
                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[1].Image}
                      alt="Klinik Lee Healthcare"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Klinik Lee Healthcare
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      19%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[2].Image}
                      alt="Klinik Bandar Baru Nilai"
                      className="w-3 h-3 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Klinik Bandar Baru Nilai
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      4%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[3].Image}
                      alt="Klinik Mediviron Giant Nilai"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Klinik Mediviron Giant Nilai
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      10%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[4].Image}
                      alt="Klinik Nilai Impian"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Klinik Nilai Impian
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      21%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Second card */}
          {products[1].name.toLowerCase().includes(search.toLowerCase()) && (
            <div
              id="cardpro2"
              className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[300px] w-full max-lg:w-full max-lg:h-auto overflow-hidden"
            >
              <div
                id="protitle"
                className="flex items-center justify-between mb-[15px]"
              >
                <p className="text-[#4b5563]">
                  <i>Promotion by Pharmacies</i>
                </p>
                <FaCircleExclamation className="text-[rgb(112,113,115)]" />
              </div>

              <div
                id="procontent"
                className="flex gap-5 max-lg:flex-col max-lg:items-center"
              >
                <div
                  id="probox"
                  className="flex flex-col items-center w-[200px]"
                >
                  <span>
                    <SecondCircle />
                  </span>

                  <button className="mt-2.5 px-2.5 py-2 border-none rounded-md bg-[#f1f1f1] text-[10px] cursor-pointer">
                    MORE DETAILS
                  </button>
                </div>

                <div id="clinicbox" className="flex-1">
                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[1].Image}
                      alt="Klinik Lee Healthcare"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Klinik Lee Healthcare
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      19%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[2].Image}
                      alt="Klinik Bandar Baru Nilai"
                      className="w-3 h-3 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Klinik Bandar Baru Nilai
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      4%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[3].Image}
                      alt="Klinik Mediviron Giant Nilai"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Klinik Mediviron Giant Nilai
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      10%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[4].Image}
                      alt="Klinik Nilai Impian"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Klinik Nilai Impian
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      21%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Third card */}
          {products[2].name.toLowerCase().includes(search.toLowerCase()) && (
            <div
              id="cardpro2"
              className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[300px] w-full max-lg:w-full max-lg:h-auto overflow-hidden"
            >
              <div
                id="protitle"
                className="flex items-center justify-between mb-[15px]"
              >
                <p className="text-[#4b5563]">
                  <i>Smart Market Usage by app</i>
                </p>
                <FaCircleExclamation className="text-[rgb(112,113,115)]" />
              </div>

              <div
                id="procontent"
                className="flex gap-5 max-lg:flex-col max-lg:items-center"
              >
                <div
                  id="probox"
                  className="flex flex-col items-center w-[200px]"
                >
                  <span>
                    <SecondCircle />
                  </span>

                  <button className="mt-2.5 px-2.5 py-2 border-none rounded-md bg-[#f1f1f1] text-[10px] cursor-pointer">
                    See ALL Reeferrals
                  </button>
                </div>

                <div id="clinicbox" className="flex-1">
                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[1].Image}
                      alt="Food Panda"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Food Panda
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      19%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[2].Image}
                      alt="Grab Food"
                      className="w-3 h-3 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Grab Food
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      4%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[3].Image}
                      alt="Zomato"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Zomato
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      10%
                    </span>
                  </div>

                  <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                    <img
                      src={product[4].Image}
                      alt="Lazada"
                      className="w-5 h-5 object-contain"
                    />
                    <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                      Lazada
                    </p>
                    <span className="text-xs font-medium text-[#6b7280]">
                      21%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fourth card */}
          {products[3].name.toLowerCase().includes(search.toLowerCase()) && (
            <div
              id="cardpro4"
              className="bg-white p-[24px] max-[600px]:p-[15px] rounded-[24px] h-[280px] w-full overflow-hidden"
            >
              <div className="mb-1">
                <p className="text-[#71809d] text-[20px] font-semibold">
                  Health Index
                </p>

                <div className="flex items-center gap-2">
                  <h2 className="text-[#344a70] text-[20px] font-bold leading-tight">
                    70%
                  </h2>
                  <span className="text-[#65c900] text-[20px] font-bold">
                    +3%
                  </span>
                </div>
              </div>

              <div className="w-full h-[165px] mt-2">
                <LineBarAreaChart />
              </div>
            </div>
          )}

          {/* Fifth card */}
          {products[4].name.toLowerCase().includes(search.toLowerCase()) && (
            <div
              id="cardpro5"
              className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[300px] w-full max-lg:w-full max-lg:h-auto overflow-hidden"
            >
              <p className="text-[#4b5563]" id="name">
                <i>Choronic wellness</i>
              </p>
              <HighlightAndZoomLineChart />
            </div>
          )}

          {/* Sixth card */}
          {products[5].name.toLowerCase().includes(search.toLowerCase()) && (
            <div
              id="cardpro6"
              className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[300px] w-full max-lg:w-full max-lg:h-auto overflow-hidden"
            >
              <p className="text-[#4b5563]" id="name">
                <i>Appointment</i>
              </p>
              <SimpleBarChart />
            </div>
          )}

          {/* Map Section */}
          {products[5].name.toLowerCase().includes(search.toLowerCase()) && (
            <div
              id="cardpro7"
              className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[400px] w-full overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 gap-3 max-[600px]:flex-col max-[600px]:items-stretch">
                <p className="text-[#4b5563]">
                  <i>Map Location</i>
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    const query = zipCode.trim();

                    if (!query) {
                      setError("Enter Kabul or a neighborhood.");
                      return;
                    }

                    const searchLocation = /^\d+$/.test(query)
                      ? `${query}, Kabul, Afghanistan`
                      : query.toLowerCase().includes("afghanistan")
                        ? query
                        : `${query}, Kabul, Afghanistan`;

                    setLocationQuery(searchLocation);
                    setError("");
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Kabul or neighborhood"
                    className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2"
                  />

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Search
                  </button>
                </form>
              </div>

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <div className="relative h-[290px] w-full overflow-hidden rounded-xl">
                <iframe
                  key={locationQuery}
                  title={`Map of ${locationQuery}`}
                  className="h-full w-full border-0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    locationQuery,
                  )}&z=13&output=embed`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    locationQuery,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow hover:bg-gray-100"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          )}

          {products[5].name.toLowerCase().includes(search.toLowerCase()) && (
            <div className="w-full rounded-[28px] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="mb-8 text-xl font-semibold text-[#354968]">
                Previous Appointments
              </h2>

              <div className="flex flex-col gap-8 sm:gap-9">
                {/* Appointment 1 */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={product[19].Image}
                    alt="Dr. Mustafa"
                    className="h-12 w-12 shrink-0 rounded-full object-cover shadow-md sm:h-16 sm:w-16"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-[#354968] sm:text-xl">
                      Dr.Mustafa
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#71809d] sm:text-lg">
                      Emergency
                    </p>
                  </div>

                  <p className="hidden text-right text-xs text-[#354968] sm:block sm:text-sm">
                    Tuesday, April 5
                  </p>

                  <button className="shrink-0 text-xl text-[#8493ad]">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>

                {/* Appointment 2 */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={product[20].Image}
                    alt="Dr. Khirullah"
                    className="h-12 w-12 shrink-0 rounded-full object-cover shadow-md sm:h-16 sm:w-16"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-[#354968] sm:text-xl">
                      DR. sara
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#71809d] sm:text-lg">
                      consultation
                    </p>
                  </div>

                  <p className="hidden max-w-28 text-right text-xs text-[#354968] sm:block sm:text-sm">
                    Friday, November 2
                  </p>

                  <button className="shrink-0 text-xl text-[#8493ad]">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>

                {/* Appointment 3 */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={product[20].Image}
                    alt="Dr. Bilal"
                    className="h-12 w-12 shrink-0 rounded-full object-cover shadow-md sm:h-16 sm:w-16"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-[#354968] sm:text-xl">
                      DR. maryam
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#71809d] sm:text-lg">
                      consultation
                    </p>
                  </div>

                  <p className="hidden text-right text-xs text-[#354968] sm:block sm:text-sm">
                    Monday, March 9
                  </p>

                  <button className="shrink-0 text-xl text-[#8493ad]">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="lg:flex justify-between items-center px-10 py-5 text-xs text-[#4b5563]">
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
    </div>
  );
}
