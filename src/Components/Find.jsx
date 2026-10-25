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
import { useState } from "react";
import product from "../Data/Products";

export default function FindDoctor() {
  const { open, setOpen } = useOutletContext();

  const [view, setView] = useState("map");
  const [sort, setSort] = useState("next");

  // Search for services
  const [search, setSearch] = useState("");

  // Search for doctors
  const [doctorSearch, setDoctorSearch] = useState("");

  const products = [
    { id: "card1", name: "Internal MD" },
    { id: "card2", name: "emergencey" },
    { id: "card3", name: "Services" },
    { id: "card4", name: "urgent card" },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      image: product[22].Image,
      specialty: "Neurologist",
      consultation_fee: 150,
      discount: 10,
    },
    {
      id: 2,
      name: "Dr. John Smith",
      image: product[19].Image,
      specialty: "Cardiologist",
      consultation_fee: 200,
      discount: 15,
    },
    {
      id: 3,
      name: "Dr. Ahmad Sabery",
      image: product[21].Image,
      specialty: "Orthopedic MD",
      consultation_fee: 900,
      discount: 35,
    },
    {
      id: 4,
      name: "Dr. Sara Wakelly",
      image: product[20].Image,
      specialty: "Kids Doctor",
      consultation_fee: 500,
      discount: 10,
    },
  ];

  // Filter services
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Filter doctors by name or specialty
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(doctorSearch.toLowerCase()),
  );

  return (
    <>
      {/* Header and Hero */}
      <div className="background min-h-100 text-white">
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
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer p-2"
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>

          {/* Services Search */}
          <div className="relative order-3 w-full sm:w-[250px] md:order-none md:w-[200px] lg:w-[250px]">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(112,113,115)]" />

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[10px] border border-[#ccc] bg-white py-2.5 pl-[35px] pr-2.5 text-black outline-none"
            />
          </div>

          {/* Header Icons */}
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
            <Link to="/settings">
              <FaGear />
            </Link>
            <button onClick={() => alert("It is pending")}>
              <FaBell />
            </button>
          </div>
        </header>

        {/* Find Doctor Hero */}
        <div className="flex flex-col items-center px-4 py-10 text-center md:py-16">
          <h1 className="text-3xl font-bold sm:text-4xl">Find a Doctor</h1>

          <p className="mt-3 text-lg sm:text-2xl">
            FIND your Doctors and schedule an appointment
          </p>
        </div>
      </div>

      {/* Special Services */}
      <section className="parttwo mt-8 px-4  md:py-16">
        <h1 className="sm:pt-7">Special Services</h1>

        <div className="services-container">
          {/* Service 1 */}
          {filteredProducts.some((item) => item.id === "card1") && (
            <div className="service-card" id="card1">
              <img src={product[10]?.Image} alt="Primary care" />

              <span>
                <h3>Primary Care and Internal MD</h3>
                <p>
                  Our doctors partner with you to help you reach your wellness
                  goals.
                </p>
              </span>

              <Link to="/pharmacy" aria-label="Explore primary care">
                <FaChevronDown />
              </Link>
            </div>
          )}

          {/* Service 2 */}
          {filteredProducts.some((item) => item.id === "card2") && (
            <div className="service-card" id="card2">
              <img src={product[11]?.Image} alt="Emergency care" />

              <span>
                <h3>Emergency Care</h3>
                <p>
                  Our doctors partner with you to help you reach your wellness
                  goals.
                </p>
              </span>

              <Link to="/find-clinic" aria-label="Explore emergency care">
                <FaChevronDown />
              </Link>
            </div>
          )}

          {/* Service 3 */}
          {filteredProducts.some((item) => item.id === "card3") && (
            <div className="service-card" id="card3">
              <img src={product[12]?.Image} alt="Imaging services" />

              <span>
                <h3>Imaging Services</h3>
                <p>
                  Our doctors partner with you to help you reach your wellness
                  goals.
                </p>
              </span>

              <Link to="/find-clinic" aria-label="Explore imaging services">
                <FaChevronDown />
              </Link>
            </div>
          )}

          {/* Service 4 */}
          {filteredProducts.some((item) => item.id === "card4") && (
            <div className="service-card" id="card4">
              <img src={product[13]?.Image} alt="Urgent care" />

              <span>
                <h3>Urgent Care</h3>
                <p>
                  Our doctors partner with you to help you reach your wellness
                  goals.
                </p>
              </span>

              <Link to="/find-clinic" aria-label="Explore urgent care">
                <FaChevronDown />
              </Link>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-6 text-center text-gray-500">No services found.</p>
        )}
      </section>

      {/* Find Doctors */}
      <section id="doctors-list" className="parttwo px-4 py-8 sm:px-6 md:py-12">
        <h1>Find Doctors By Specialty</h1>

        <p className="m-3 text-center">
          Select a specialty to view doctors and schedule an appointment.
        </p>

        <div className="mx-auto mt-6 w-full max-w-7xl overflow-hidden rounded-3xl bg-white text-[#394d70] shadow-sm">
          {/* Doctors Header */}
          <div className="flex flex-col justify-between gap-4 px-5 pt-7 sm:flex-row sm:items-center sm:px-6">
            <h2 className="text-2xl font-semibold">Doctors</h2>

            <p className="text-sm text-gray-500">
              {filteredDoctors.length} doctor
              {filteredDoctors.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Doctors Search */}
          <div className="px-5 py-5 sm:px-6">
            <div className="relative w-full sm:max-w-md">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Doctors List */}
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="grid w-full grid-cols-1 items-center gap-5 border-b border-[#e5e7eb] px-5 py-6 last:border-b-0 sm:grid-cols-2 sm:px-6 lg:grid-cols-[2fr_1.5fr_1.5fr_0.7fr] lg:gap-4"
              >
                {/* Doctor */}
                <div className="flex min-w-0 items-center gap-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-12 w-12 shrink-0 rounded-full bg-gray-100 object-cover"
                  />

                  <div className="min-w-0">
                    <p className="text-sm text-[#71809d]">Name:</p>
                    <p className="break-words text-base font-semibold sm:text-lg">
                      {doctor.name}
                    </p>
                  </div>
                </div>

                {/* Specialty */}
                <div>
                  <p className="text-sm text-[#71809d]">Speciality:</p>
                  <p className="text-base font-semibold sm:text-lg">
                    {doctor.specialty}
                  </p>
                </div>

                {/* Consultation Fee */}
                <div>
                  <p className="text-sm text-[#71809d]">Consultation Fee:</p>
                  <p className="text-base font-semibold sm:text-lg">
                    RM {doctor.consultation_fee}
                  </p>
                </div>

                {/* Discount */}
                <div>
                  <p className="text-sm text-[#71809d]">Discount:</p>
                  <p className="text-base font-semibold sm:text-lg">
                    {doctor.discount}%
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <FaMagnifyingGlass className="mx-auto mb-3 text-2xl text-gray-300" />

              <p className="font-semibold text-gray-600">No doctors found</p>

              <p className="mt-1 text-sm text-gray-400">
                Try searching for a different name or specialty.
              </p>

              <button
                onClick={() => setDoctorSearch("")}
                className="mt-4 rounded-xl bg-blue-500 px-5 py-2 text-white transition hover:bg-blue-600"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="items-center justify-between px-5 py-5 text-xs text-[#4b5563] sm:px-10 lg:flex">
        <p>
          © 2026, made with{" "}
          <FaHeart className="inline text-[rgb(112,113,115)]" />{" "}
          <b className="text-[rgb(25,62,125)]">MyPiHUB</b> for a better web.
        </p>

        <div className="mt-4 flex items-center gap-6 lg:mt-0">
          <p>MyPatientHUB</p>
          <p>About Us</p>
          <p>Blog</p>
        </div>
      </footer>
    </>
  );
}
