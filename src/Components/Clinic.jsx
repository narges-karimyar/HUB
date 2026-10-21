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

  const [view, setView] = useState("map");
  const [sort, setSort] = useState("next");

  // Kabul is the default map location
  const [zipCode, setZipCode] = useState("Kabul, Afghanistan");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [locationQuery, setLocationQuery] = useState("Kabul, Afghanistan");

  const [error, setError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Sidebar filters
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [sidebarZip, setSidebarZip] = useState("");

  // Search Kabul or a neighborhood
  const handleSearch = () => {
    const query = zipCode.trim();

    if (!query) {
      setError("Enter Kabul or a neighborhood.");
      return;
    }

    // Numeric postal codes are searched within Kabul
    const searchLocation = /^\d+$/.test(query)
      ? `${query}, Kabul, Afghanistan`
      : query.toLowerCase().includes("afghanistan")
        ? query
        : `${query}, Kabul, Afghanistan`;

    setLocationQuery(searchLocation);
    setError("");
    setView("map");
  };

  // Search by clinic name or specialty
  const handleDoctorSearch = () => {
    const query = doctorSearch.trim();

    if (!query) {
      setError("Enter a clinic name or specialty.");
      return;
    }

    setLocationQuery(`${query}, Kabul, Afghanistan`);
    setError("");
    setView("map");
  };

  // Use the browser's current location
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location services.");
      return;
    }

    setLoadingLocation(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocationQuery(`${latitude},${longitude}`);
        setZipCode(`${latitude}, ${longitude}`);
        setView("map");
        setLoadingLocation(false);
      },
      () => {
        setError("Unable to get your location. Please allow location access.");
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  // Sidebar search
  const handleSidebarSearch = () => {
    const query = sidebarZip.trim() || sidebarSearch.trim();

    if (!query) {
      setError("Enter a clinic type or neighborhood.");
      return;
    }

    const searchLocation = /^\d+$/.test(query)
      ? `${query}, Kabul, Afghanistan`
      : query.toLowerCase().includes("afghanistan")
        ? query
        : `${query}, Kabul, Afghanistan`;

    setLocationQuery(searchLocation);
    setError("");
    setView("map");
  };

  const clinicOne = product?.[16];
  const clinicTwo = product?.[17];

  const clinics = [
    {
      name: "Klinik Pakar Kesihatan USIM",
      address: "Bandar Baru Nilai, 71800 Nilai, Negeri Sembilan, Malaysia",
      city: "Nilai, Negeri Sembilan, Malaysia",
      rating: "4.8",
      reviews: "120",
      image: clinicOne?.Image,
      mapQuery: "Klinik Pakar Kesihatan USIM",
    },
    {
      name: "Dialysis Centers",
      address:
        "Lot 193–194, Jalan Nilai Square 6, Bandar Baru Nilai, Negeri Sembilan, Malaysia",
      city: "Nilai, Negeri Sembilan, Malaysia",
      rating: "4.6",
      reviews: "98",
      image: clinicTwo?.Image,
      mapQuery: "Dialysis Centers Nilai",
    },
  ];

  return (
    <>
      {/* Header and Search Hero */}
      <div className="background min-h-100 text-white">
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-5">
          <div className="flex items-center gap-2">
            <FaHouse />
            <p>/findhospital</p>
          </div>

          <div className="hidden md:block">
            <p>findhospital</p>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer p-2"
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>

          {/* Header Search */}
          <form
            className="relative order-3 w-full sm:w-[250px] md:order-none md:w-[200px] lg:w-[250px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleDoctorSearch();
            }}
          >
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707173]" />

            <input
              type="text"
              placeholder="Search clinics..."
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              className="w-full rounded-[10px] border border-[#ccc] bg-white py-2.5 pl-[35px] pr-2.5 text-black outline-none"
            />
          </form>

          <div className="flex items-center gap-3">
            <Link to="/account" aria-label="Account">
              <FaCircleUser className="text-white" />
            </Link>

            <button
              className="rounded bg-[rgba(233,231,231,0.336)] px-3 py-1 text-white"
              onClick={() => alert("You have been logged out!")}
            >
              Log out
            </button>

            <Link to="/settings" aria-label="Settings">
              <FaGear />
            </Link>

            <button
              onClick={() => alert("Notifications are pending")}
              aria-label="Notifications"
            >
              <FaBell />
            </button>
          </div>
        </header>

        {/* Find Clinic Section */}
        <div className="flex flex-col items-center px-4 py-10 text-center md:py-16">
          <h1 className="text-3xl font-bold sm:text-4xl">Find a Clinic</h1>

          <p className="mt-3 text-lg sm:text-2xl">
            Search clinics and schedule an appointment with doctors through
            clinics.
          </p>

          {/* Main Search Form */}
          <form
            className="mt-6 flex w-full max-w-4xl flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder="Clinic name or specialty"
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              className="w-full rounded bg-white px-4 py-2 text-black outline-none sm:w-[280px]"
            />

            <input
              type="text"
              placeholder="Kabul or neighborhood"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full rounded bg-white px-4 py-2 text-black outline-none sm:w-[220px]"
            />

            <button
              type="button"
              onClick={handleCurrentLocation}
              disabled={loadingLocation}
              className="w-full rounded-2xl bg-blue-500 px-5 py-2 text-black hover:bg-blue-600 disabled:opacity-60 sm:w-auto"
            >
              {loadingLocation ? "LOCATING..." : "CURRENT"}
            </button>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-500 px-5 py-2 text-black hover:bg-blue-600 sm:w-auto"
            >
              SEARCH
            </button>
          </form>

          {error && (
            <p className="mt-3 max-w-xl text-sm text-red-200">{error}</p>
          )}
        </div>
      </div>

      {/* Map and List */}
      <div className="parttwo map-page mt-5 px-4 sm:px-6">
        {/* View Tabs */}
        <div className="mb-4 flex flex-wrap gap-2.5">
          <button
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              view === "map"
                ? "bg-[#e943c5] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setView("map")}
          >
            <FaMapLocationDot />
            Map
          </button>

          <button
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              view === "list"
                ? "bg-[#e943c5] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setView("list")}
          >
            <FaList />
            List
          </button>
        </div>

        <div className="flex min-w-0 flex-col gap-5 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="flex w-full shrink-0 flex-col gap-3 rounded-xl bg-white p-5 lg:w-[260px]">
            <input
              type="text"
              placeholder="Clinic type (e.g. Primary Care)"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full rounded-lg border border-[#ddd] px-3 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Kabul or neighborhood"
              value={sidebarZip}
              onChange={(e) => setSidebarZip(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSidebarSearch();
              }}
              className="w-full rounded-lg border border-[#ddd] px-3 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSidebarSearch}
              className="rounded-lg bg-[#e943c5] px-4 py-2 text-white hover:opacity-90"
            >
              Apply Search
            </button>

            <h4 className="mt-2 font-bold">Filter By</h4>

            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-[#ddd] bg-white px-3 py-2 outline-none">
                <option value="">Specialty</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="pediatrics">Pediatrics</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm" />
            </div>

            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-[#ddd] bg-white px-3 py-2 outline-none">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm" />
            </div>

            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-[#ddd] bg-white px-3 py-2 outline-none">
                <option value="">Condition</option>
                <option value="diabetes">Diabetes</option>
                <option value="asthma">Asthma</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm" />
            </div>

            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-[#ddd] bg-white px-3 py-2 outline-none">
                <option value="">Languages</option>
                <option value="en">English</option>
                <option value="fa">Dari</option>
                <option value="ps">Pashto</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm" />
            </div>

            <h4 className="mt-2 font-bold">Providers Who Treat</h4>

            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" />
              <span>All Ages</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" />
              <span>Children</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" />
              <span>Adults</span>
            </label>

            <hr className="my-2" />

            <h4 className="font-bold">View Only</h4>

            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" />
              <span>Online Scheduling</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" />
              <span>Primary Care</span>
            </label>
          </aside>

          {/* Map / List Results */}
          <div className="min-w-0 flex-1">
            {/* Sort Controls */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="font-medium">Sort By</span>

              <button
                className={`rounded-lg px-4 py-2 ${
                  sort === "next"
                    ? "bg-[#e943c5] text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setSort("next")}
              >
                Next Available
              </button>

              <button
                className={`rounded-lg px-4 py-2 ${
                  sort === "distance"
                    ? "bg-[#e943c5] text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setSort("distance")}
              >
                Distance
              </button>
            </div>

            {/* Map View */}
            {view === "map" && (
              <div className="relative h-[350px] overflow-hidden rounded-xl sm:h-[500px]">
                <iframe
                  title={`Map of ${locationQuery}`}
                  className="h-full w-full border-0"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    locationQuery,
                  )}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    locationQuery,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 rounded-lg bg-white p-3 text-gray-700 shadow hover:bg-gray-100"
                  aria-label="Open location in Google Maps"
                >
                  <FaExpand />
                </a>
              </div>
            )}

            {/* List View */}
            {view === "list" && (
              <div className="flex flex-col gap-4">
                {clinics.map((clinic) => (
                  <div
                    key={clinic.name}
                    className="flex flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row"
                  >
                    {clinic.image ? (
                      <img
                        src={clinic.image}
                        alt={clinic.name}
                        className="h-[180px] w-full shrink-0 rounded-lg object-cover sm:h-[120px] sm:w-[160px]"
                      />
                    ) : (
                      <div className="flex h-[180px] w-full shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 sm:h-[120px] sm:w-[160px]">
                        <FaLocationDot size={28} />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {clinic.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#555]">
                        {clinic.address}
                      </p>

                      <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-700">
                        <FaLocationDot />
                        {clinic.city}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {clinic.rating} ({clinic.reviews} reviews)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="rounded-lg px-4 py-2 text-white"
                        style={{ backgroundColor: "#e943c5" }}
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              clinic.mapQuery,
                            )}`,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        View Location
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col items-start justify-between gap-4 px-5 py-5 text-xs text-[#4b5563] sm:px-10 md:flex-row md:items-center">
        <p>
          © 2026, made with <FaHeart className="inline text-[#707173]" />{" "}
          <b className="text-[#193e7d]">MyPiHUB</b> for a better web.
        </p>

        <div className="flex items-center gap-6">
          <p>MyPatientHUB</p>
          <p>About Us</p>
          <p>Blog</p>
        </div>
      </footer>
    </>
  );
}
