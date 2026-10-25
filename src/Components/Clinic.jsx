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

  const [zipCode, setZipCode] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [locationQuery, setLocationQuery] = useState("Kabul, Afghanistan");

  const [error, setError] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [sidebarSearch, setSidebarSearch] = useState("");
  const [sidebarZip, setSidebarZip] = useState("");

  // Search by clinic name OR Afghan postal code.
  const findPlaceOnMap = async (query, isPostalCode = false) => {
    const value = query.trim();

    if (!value) {
      setError(
        isPostalCode
          ? "Please enter a postal code."
          : "Please enter a clinic name.",
      );
      return;
    }

    if (isPostalCode && !/^\d{4}(\d{2})?$/.test(value)) {
      setError("Enter a 4-digit or 6-digit Afghan postal code.");
      return;
    }

    setError("");
    setLoadingLocation(true);

    try {
      const params = new URLSearchParams({
        format: "jsonv2",
        limit: "5",
        countrycodes: "af",
      });

      if (isPostalCode) {
        params.set("postalcode", value);
        params.set("country", "Afghanistan");
      } else {
        params.set("q", `${value}, Afghanistan`);
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Search service unavailable.");
      }

      const results = await response.json();

      if (!results.length) {
        setError(
          isPostalCode
            ? "Postal code not found. It may not be available in the map database."
            : "Clinic not found. Check the spelling or try another name.",
        );
        return;
      }

      const place = results[0];

      // Update the Google Map to the matched coordinates.
      setLocationQuery(`${place.lat},${place.lon}`);
      setView("map");
    } catch (err) {
      setError("Search failed. Check your internet connection and try again.");
    } finally {
      setLoadingLocation(false);
    }
  };

  // Use the browser's current location.
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
        setView("map");
        setLoadingLocation(false);
      },
      () => {
        setError("Location access failed. Please allow location access.");
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  const firstcilinc = product?.[16];
  const secondclinic = product?.[17];

  const clinics = [
    {
      name: "French Medical Institute for Mothers and Children (FMIC)",
      address: "Aliabad, behind Kabul Medical University",
      city: "Kabul, Afghanistan",
      rating: "—",
      reviews: "Not provided",
      image: firstcilinc?.Image,
      mapQuery:
        "French Medical Institute for Mothers and Children, Kabul, Afghanistan",
    },
    {
      name: "Ariana Medical Complex",
      address: "Red Crescent, 5th Phase, Kabul",
      city: "Kabul, Afghanistan",
      rating: "—",
      reviews: "Not provided",
      image: secondclinic?.Image,
      mapQuery: "Ariana Medical Complex, Kabul, Afghanistan",
    },
  ];

  return (
    <>
      {/* Header */}
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

          {/* Header clinic-name search */}
          <form
            className="relative order-3 w-full sm:w-[250px] md:order-none md:w-[200px] lg:w-[250px]"
            onSubmit={(e) => {
              e.preventDefault();
              findPlaceOnMap(doctorSearch, false);
            }}
          >
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707173]" />

            <input
              type="text"
              placeholder="Search clinic names..."
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

        {/* Main Search Section */}
        <div className="flex flex-col items-center px-4 py-10 text-center md:py-16">
          <h1 className="text-3xl font-bold sm:text-4xl">Find a Clinic</h1>

          <p className="mt-3 text-lg sm:text-2xl">
            Search for clinics or find places using a postal code.
          </p>

          <div className="mt-6 flex w-full max-w-4xl flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            {/* Clinic-name search */}
            <form
              className="flex w-full gap-2 sm:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                findPlaceOnMap(doctorSearch, false);
              }}
            >
              <input
                type="text"
                placeholder="Clinic name"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                className="min-w-0 flex-1 rounded bg-white px-4 py-2 text-black outline-none sm:w-[220px]"
              />

              <button
                type="submit"
                disabled={loadingLocation}
                className="rounded-2xl bg-blue-500 px-4 py-2 text-black hover:bg-blue-600 disabled:opacity-60"
              >
                Find Clinic
              </button>
            </form>

            {/* Postal-code search */}
            <form
              className="flex w-full gap-2 sm:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                findPlaceOnMap(zipCode, true);
              }}
            >
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Afghan postal code"
                value={zipCode}
                onChange={(e) =>
                  setZipCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="min-w-0 flex-1 rounded bg-white px-4 py-2 text-black outline-none sm:w-[190px]"
              />

              <button
                type="submit"
                disabled={loadingLocation}
                className="rounded-2xl bg-blue-500 px-4 py-2 text-black hover:bg-blue-600 disabled:opacity-60"
              >
                Find Code
              </button>
            </form>

            {/* Current location */}
            <button
              type="button"
              onClick={handleCurrentLocation}
              disabled={loadingLocation}
              className="w-full rounded-2xl bg-blue-500 px-5 py-2 text-black hover:bg-blue-600 disabled:opacity-60 sm:w-auto"
            >
              {loadingLocation ? "SEARCHING..." : "CURRENT LOCATION"}
            </button>
          </div>

          {error && (
            <p className="mt-3 max-w-xl text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>

      {/* Map and List */}
      <div className="parttwo map-page mt-5 px-4 sm:px-6">
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
          {/* Sidebar */}
          <aside className="flex w-full shrink-0 flex-col gap-3 rounded-xl bg-white p-5 lg:w-[260px]">
            {/* Sidebar clinic-name search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                findPlaceOnMap(sidebarSearch, false);
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                placeholder="Search clinic name"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                className="w-full rounded-lg border border-[#ddd] px-3 py-2 outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-[#e943c5] px-4 py-2 text-white hover:opacity-90"
              >
                Find Clinic
              </button>
            </form>

            {/* Sidebar postal-code search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                findPlaceOnMap(sidebarZip, true);
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Afghan postal code"
                value={sidebarZip}
                onChange={(e) =>
                  setSidebarZip(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full rounded-lg border border-[#ddd] px-3 py-2 outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-[#e943c5] px-4 py-2 text-white hover:opacity-90"
              >
                Find Postal Code
              </button>
            </form>

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

          {/* Results */}
          <div className="min-w-0 flex-1">
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

            {/* Map */}
            {view === "map" && (
              <div className="relative h-[350px] overflow-hidden rounded-xl sm:h-[500px]">
                <iframe
                  key={locationQuery}
                  title={`Map of ${locationQuery}`}
                  className="h-full w-full border-0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    locationQuery,
                  )}&z=14&output=embed`}
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
                  className="absolute bottom-4 right-4 rounded-lg bg-white p-3 text-gray-700 shadow hover:bg-gray-100"
                  aria-label="Open location in Google Maps"
                >
                  <FaExpand />
                </a>
              </div>
            )}

            {/* Clinic List */}
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
                        onClick={() => {
                          setLocationQuery(clinic.mapQuery);
                          setView("map");
                          setError("");
                        }}
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
