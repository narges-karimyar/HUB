import React, { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
  FaCapsules,
  FaTruckFast,
  FaClock,
  FaRobot,
  FaPaperPlane,
  FaXmark,
  FaLocationDot,
} from "react-icons/fa6";
// Medicine images
import coughImage from "../assets/cough.png";
import ibuprofenImage from "../assets/ibuprofen.jpg";
import kalvBabyImage from "../assets/kalv baby.jpg";
import kalvTabletsImage from "../assets/kalv-tablets-30s.webp";
import nebilImage from "../assets/nebil.jpg";
import ogrelImage from "../assets/ogrel.jpg";
import paracetamolImage from "../assets/paracetamol.jpg";
import vitImage from "../assets/vit.jpg";
// Pharmacy images
import allPharmacyImage from "../assets/all pharmacy.jpg";
import cityPharmacyImage from "../assets/city pharmacy.jpg";
import htPharmacyImage from "../assets/ht pharmacy.jpg";
import leePharmacyImage from "../assets/lee pharmacy.jpg";
import okPharmacyImage from "../assets/ok pharmacy.jpg";
import omidPharmacyImage from "../assets/omid pharmacy.jpg";
const medicines = [
  {
    id: 8234,
    name: "Cough Syrup",
    aliases: ["cough", "syrup", "شربت سرفه"],
    image: coughImage,
    category: "Syrup",
    pharmacy: "Caring Pharmacy",
    pharmacyImage: allPharmacyImage,
    description:
      "Please check the product label and confirm availability with the pharmacy.",
    discount: 1,
    price: 100,
    eta: 25,
  },
  {
    id: 872,
    name: "Ibuprofen",
    aliases: ["ibu profen", "ایبوپروفین"],
    image: ibuprofenImage,
    category: "Tablet",
    pharmacy: "OK Pharmacy",
    pharmacyImage: okPharmacyImage,
    description:
      "Contact the pharmacy to confirm the available strength and product details.",
    discount: 3,
    price: 80,
    eta: 30,
  },
  {
    id: 134,
    name: "Kalv Baby",
    aliases: ["کالو بیبی"],
    image: kalvBabyImage,
    category: "Baby Care",
    pharmacy: "Hilton Medical",
    pharmacyImage: cityPharmacyImage,
    description:
      "Please confirm the product details and suitability with a pharmacist.",
    discount: 5,
    price: 150,
    eta: 35,
  },
  {
    id: 113,
    name: "Kalv Tablets 30s",
    aliases: ["kalv tablets", "kalv tablet"],
    image: kalvTabletsImage,
    category: "Tablet",
    pharmacy: "Hinucion Pharma",
    pharmacyImage: htPharmacyImage,
    description:
      "Availability and product details must be confirmed with the pharmacy.",
    discount: 5,
    price: 180,
    eta: 40,
  },
  {
    id: 629,
    name: "Nebil",
    aliases: ["نیبیل"],
    image: nebilImage,
    category: "Medicine",
    pharmacy: "Hamza Medical Pharmacy",
    pharmacyImage: leePharmacyImage,
    description:
      "Ask a pharmacist about the product and verify its ingredients and strength.",
    discount: 7,
    price: 120,
    eta: 45,
  },
  {
    id: 634729,
    name: "Ogrel",
    aliases: ["اوگرل"],
    image: ogrelImage,
    category: "Tablet",
    pharmacy: "Food Panda",
    pharmacyImage: omidPharmacyImage,
    description:
      "Please confirm the actual pharmacy, stock, and product details before ordering.",
    discount: 0,
    price: 100,
    eta: 30,
  },
  {
    id: 4512,
    name: "Paracetamol",
    aliases: ["پاراستامول", "acetaminophen", "استامینوفن"],
    image: paracetamolImage,
    category: "Tablet",
    pharmacy: "Carry Medical",
    pharmacyImage: allPharmacyImage,
    description:
      "Ask a pharmacist about the appropriate product and strength for your needs.",
    discount: 0,
    price: 50,
    eta: 20,
  },
  {
    id: 7861,
    name: "Vitamin Supplement",
    aliases: ["vitamin", "vit", "ویتامین"],
    image: vitImage,
    category: "Supplement",
    pharmacy: "Pool Medical",
    pharmacyImage: cityPharmacyImage,
    description:
      "Check the product label and consult a pharmacist about suitability.",
    discount: 2,
    price: 150,
    eta: 35,
  },
];
const formatPrice = (price) => `${price} AFN`;
const getBotAnswer = (question) => {
  const normalized = question.toLowerCase().trim();
  const matchedMedicine = medicines.find((medicine) => {
    const searchTerms = [
      medicine.name,
      ...(medicine.aliases || []),
      String(medicine.id),
    ];
    return searchTerms.some((term) =>
      normalized.includes(term.toLowerCase())
    );
  });
  if (matchedMedicine) {
    return (
      `Medicine: ${matchedMedicine.name}\n` +
      `Category: ${matchedMedicine.category}\n` +
      `Listed price: ${formatPrice(matchedMedicine.price)}\n` +
      `Pharmacy: ${matchedMedicine.pharmacy}\n` +
      `Estimated delivery: ${matchedMedicine.eta}–${matchedMedicine.eta + 10} minutes\n\n` +
      `Please confirm the actual price, stock, and delivery time with the pharmacy. These are demonstration listings.`
    );
  }
  if (
    normalized.includes("delivery") ||
    normalized.includes("time") ||
    normalized.includes("eta") ||
    normalized.includes("ارسال") ||
    normalized.includes("تحویل") ||
    normalized.includes("زمان")
  ) {
    return (
      "Estimated delivery times are shown in each medicine's details and in the table. " +
      "These are demonstration estimates, not live courier tracking. " +
      "Please contact the pharmacy to confirm the actual delivery time."
    );
  }
  if (
    normalized.includes("price") ||
    normalized.includes("cost") ||
    normalized.includes("قیمت")
  ) {
    return (
      "The listed prices are displayed in AFN. You can compare all eight products " +
      "in the cards and table. These are demonstration prices and must be confirmed with the pharmacy."
    );
  }
  if (
    normalized.includes("list") ||
    normalized.includes("all medicines") ||
    normalized.includes("medicines") ||
    normalized.includes("دواها")
  ) {
    return (
      "The eight listed products are: Cough Syrup, Ibuprofen, Kalv Baby, " +
      "Kalv Tablets 30s, Nebil, Ogrel, Paracetamol, and Vitamin Supplement. " +
      "Type a product name to see its listed details."
    );
  }
  if (
    normalized.includes("dose") ||
    normalized.includes("dosage") ||
    normalized.includes("treatment") ||
    normalized.includes("diagnose") ||
    normalized.includes("علاج") ||
    normalized.includes("دوز")
  ) {
    return (
      "I cannot diagnose an illness or recommend a medicine dose. " +
      "Please consult a qualified doctor or pharmacist, especially for children, " +
      "pregnancy, or when taking other medicines."
    );
  }
  if (
    normalized.includes("hello") ||
    normalized.includes("hi") ||
    normalized.includes("سلام")
  ) {
    return (
      "Hello! Welcome to Pharmacy Assistant. You can ask me about any of the eight listed medicines, " +
      "their displayed prices, pharmacies, or estimated delivery times."
    );
  }
  return (
    "I can help with the eight medicines listed on this page. " +
    "Try typing Paracetamol, Ibuprofen, Nebil, Cough Syrup, or another medicine name. " +
    "You can also ask about prices or delivery estimates. I cannot provide a medical diagnosis."
  );
};
export default function FindPharmacy() {
  const outletContext = useOutletContext() || {};
  const { open, setOpen, onLogout } = outletContext;
  const [search, setSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [entries, setEntries] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello! I'm your Pharmacy Assistant. Ask me about a medicine name, its listed price, pharmacy, or estimated delivery time.",
    },
  ]);
  const filteredMedicines = useMemo(() => {
    const query = `${search} ${tableSearch}`
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    if (!query.length) return medicines;
    return medicines.filter((medicine) => {
      const searchableText = [
        medicine.name,
        ...(medicine.aliases || []),
        medicine.category,
        medicine.pharmacy,
        String(medicine.id),
        formatPrice(medicine.price),
      ]
        .join(" ")
        .toLowerCase();
      return query.every((word) => searchableText.includes(word));
    });
  }, [search, tableSearch]);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMedicines.length / entries)
  );
  const safePage = Math.min(currentPage, totalPages);
  const visibleMedicines = filteredMedicines.slice(
    (safePage - 1) * entries,
    safePage * entries
  );
  const firstEntry = filteredMedicines.length
    ? (safePage - 1) * entries + 1
    : 0;
  const lastEntry = Math.min(
    safePage * entries,
    filteredMedicines.length
  );
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleTableSearch = (value) => {
    setTableSearch(value);
    setCurrentPage(1);
  };
  const sendMessage = (event) => {
    event?.preventDefault();
    const question = chatInput.trim();
    if (!question) return;
    const answer = getBotAnswer(question);
    setMessages((previous) => [
      ...previous,
      { sender: "user", text: question },
      { sender: "bot", text: answer },
    ]);
    setChatInput("");
  };
  const handleBuyNow = (medicine) => {
    setSelectedMedicine(medicine);
  };
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      if (onLogout) {
        onLogout();
      } else {
        alert("Logout is not configured in this layout.");
      }
    }
  };
  return (
    <div className="contentTwo min-h-screen bg-[#f7f8fc] font-[Merriweather,serif] text-[#26334d]">
      {/* HEADER */}
      <header className="m-2.5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <FaHouse className="text-[#5368a5]" />
          <div>
            <p className="text-sm text-gray-500">
              / &nbsp; Pharmacyplace
            </p>
            <h1 className="font-bold">Pharmacyplace</h1>
          </div>
          <FaBars
            onClick={() => setOpen && setOpen(!open)}
            className="ml-3 cursor-pointer text-lg hover:text-purple-600"
          />
        </div>
        <div className="relative w-[250px] max-lg:w-[190px] max-sm:w-full">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search medicines..."
            aria-label="Search medicines"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Link
            to="/account"
            aria-label="My account"
            className="hover:text-purple-600"
          >
            <FaCircleUser />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm hover:text-purple-600"
          >
            Log out
          </button>
          <Link to="/settings" aria-label="Settings">
            <FaGear className="hover:text-purple-600" />
          </Link>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => alert("You have no new notifications.")}
          >
            <FaBell className="hover:text-purple-600" />
          </button>
        </div>
      </header>
      <main className="px-5 pb-8 pt-5 sm:px-7">
        {/* INTRODUCTION */}
        <section className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <FaCapsules className="text-purple-600" />
            <h2 className="text-xl font-bold sm:text-2xl">
              Search Pharmacies for Medicines
            </h2>
          </div>
          <p className="text-sm leading-6 text-gray-500">
            Search medicines, compare listed prices, and check estimated delivery times.
          </p>
        </section>
        {/* DELIVERY FEATURES */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-purple-100 bg-white p-5 shadow-[0_4px_18px_rgba(50,40,90,0.07)]">
            <div className="rounded-xl bg-purple-100 p-3 text-xl text-purple-700">
              <FaTruckFast />
            </div>
            <div>
              <h3 className="font-bold">Delivery Estimates</h3>
              <p className="mt-1 text-sm text-gray-500">
                Estimated time for each product
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_4px_18px_rgba(50,40,90,0.07)]">
            <div className="rounded-xl bg-blue-100 p-3 text-xl text-blue-700">
              <FaClock />
            </div>
            <div>
              <h3 className="font-bold">Quick Delivery</h3>
              <p className="mt-1 text-sm text-gray-500">
                Confirm delivery with the pharmacy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-[0_4px_18px_rgba(50,40,90,0.07)]">
            <div className="rounded-xl bg-green-100 p-3 text-xl text-green-700">
              <FaCapsules />
            </div>
            <div>
              <h3 className="font-bold">8 Listed Medicines</h3>
              <p className="mt-1 text-sm text-gray-500">
                Search and compare product listings
              </p>
            </div>
          </div>
        </section>
        {/* MEDICINE CARDS */}
        <section className="mb-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold sm:text-xl">
              Available Medicines
            </h2>
            <p className="text-sm text-gray-500">
              {filteredMedicines.length} medicine(s) found
            </p>
          </div>
          {filteredMedicines.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white p-10 text-center text-gray-500 shadow-sm">
              <FaMagnifyingGlass className="mx-auto mb-3 text-2xl" />
              No medicines found. Try another search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {filteredMedicines.map((medicine) => (
                <article
                  key={medicine.id}
                  className="overflow-hidden rounded-2xl border border-purple-200 bg-[#F3E8FF] shadow-md 
                transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:bg-[#EDE0FF] hover:shadow-lg"
                >
                  <div className="flex h-44 items-center justify-center bg-[#FAF5FF] p-4">
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#26334d]">
                      {medicine.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {medicine.category}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-lg font-bold text-sky-600">
                        {formatPrice(medicine.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleBuyNow(medicine)}
                        className="rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        {/* MEDICINE TABLE */}
        <section className="mb-10 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_18px_rgba(50,40,90,0.08)]">
          <div className="border-b border-gray-100 p-5">
            <h2 className="text-lg font-bold sm:text-xl">
              Medicine Listings
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Compare medicine details, pharmacies, prices, and delivery estimates.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <label htmlFor="entries">Show</label>
              <select
                id="entries"
                value={entries}
                onChange={(event) => {
                  setEntries(Number(event.target.value));
                  setCurrentPage(1);
                }}
                className="w-[100px] rounded-lg border border-gray-200 bg-white p-2 outline-none focus:border-purple-400"
              >
                <option value={4}>4</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
              <span>entries per page</span>
            </div>
            <div className="relative w-full sm:w-[260px]">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={tableSearch}
                onChange={(event) => handleTableSearch(event.target.value)}
                placeholder="Search table..."
                aria-label="Search medicine table"
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-purple-400"
              />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse text-left text-sm">
              <thead className="bg-[#f8f8fc] text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Service By</th>
                  <th className="px-5 py-4">Discount</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Delivery</th>
                  <th className="px-5 py-4">ID</th>
                </tr>
              </thead>
              <tbody>
                {visibleMedicines.map((medicine) => (
                  <tr
                    key={medicine.id}
                    className="border-b border-gray-100 transition hover:bg-purple-50/50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="h-12 w-14 rounded-lg bg-white object-contain"
                        />
                        <span className="font-semibold">
                          {medicine.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {medicine.category}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={medicine.pharmacyImage}
                          alt={medicine.pharmacy}
                          className="h-10 w-12 rounded-lg border border-gray-100 object-cover shadow-sm"
                        />
                        <span className="whitespace-nowrap font-medium text-[#26334d]">
                          {medicine.pharmacy}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {medicine.discount}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-sky-600">
                      {formatPrice(medicine.price)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      {medicine.eta}–{medicine.eta + 10} min
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {medicine.id}
                    </td>
                  </tr>
                ))}
                {visibleMedicines.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      No matching medicines found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 text-sm text-gray-500">
            <p>
              Showing {firstEntry} to {lastEntry} of{" "}
              {filteredMedicines.length} entries
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage(safePage - 1)}
                className="rounded-lg border border-gray-200 px-3 py-2 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="rounded-lg bg-purple-600 px-3 py-2 font-semibold text-white">
                {safePage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage(safePage + 1)}
                className="rounded-lg border border-gray-200 px-3 py-2 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
        {/* FOOTER */}
        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 py-6 text-sm text-gray-500">
          <p>
            ©️ 2026, made with{" "}
            <span className="text-pink-500">♥️</span> by{" "}
            <span className="font-semibold text-purple-600">
              MyPiHUB
            </span>{" "}
            for a better web.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link to="/" className="hover:text-purple-600">
              MyPatientHUB
            </Link>
            <Link to="/about" className="hover:text-purple-600">
              About Us
            </Link>
            <Link to="/blog" className="hover:text-purple-600">
              Blog
            </Link>
          </div>
        </footer>
      </main>
      {/* MEDICINE DETAILS MODAL */}
      {selectedMedicine && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedMedicine(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedMedicine.name} details`}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Medicine Details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedMedicine(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <FaXmark />
              </button>
            </div>
            <img
              src={selectedMedicine.image}
              alt={selectedMedicine.name}
              className="mx-auto mb-4 h-40 w-full object-contain"
            />
            <h3 className="text-lg font-bold">
              {selectedMedicine.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {selectedMedicine.description}
            </p>
            <div className="mt-4 space-y-3 rounded-xl bg-gray-50 p-4 text-sm">
              <p>
                <strong>Category:</strong>{" "}
                {selectedMedicine.category}
              </p>
              <p className="flex items-center gap-2">
                <FaLocationDot className="text-purple-500" />
                <strong>Pharmacy:</strong>{" "}
                {selectedMedicine.pharmacy}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {formatPrice(selectedMedicine.price)}
              </p>
              <p>
                <strong>Discount:</strong>{" "}
                {selectedMedicine.discount}
              </p>
              <p>
                <strong>Estimated delivery:</strong>{" "}
                {selectedMedicine.eta}–{selectedMedicine.eta + 10} minutes
              </p>
              <p className="text-xs leading-5 text-gray-500">
                Prices, stock, and delivery times are demonstration data.
                Please confirm with the pharmacy before ordering.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                alert(
                  `Please contact ${selectedMedicine.pharmacy} to confirm availability and ordering.`
                );
                setSelectedMedicine(null);
              }}
              className="mt-5 w-full rounded-lg bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-700"
            >
              Contact Pharmacy
            </button>
          </div>
        </div>
      )}
      {/* PHARMACY CHATBOT */}
      <div className="fixed bottom-5 right-5 z-50">
        {chatOpen && (
          <section className="mb-3 flex h-[430px] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-700 to-pink-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <FaRobot className="text-2xl" />
                <div>
                  <h2 className="font-bold">
                    Pharmacy Assistant
                  </h2>
                  <p className="text-xs text-purple-100">
                    Medicine information demo
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chatbot"
                onClick={() => setChatOpen(false)}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <FaXmark />
              </button>
            </div>
            <div
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto bg-[#faf9fd] p-3"
            >
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.sender}`}
                  className={`max-w-[90%] whitespace-pre-wrap rounded-xl p-3 text-sm leading-6 ${
                    message.sender === "user"
                      ? "ml-auto bg-purple-600 text-white"
                      : "mr-auto border border-gray-100 bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2 border-t border-gray-100 p-3"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about a medicine..."
                aria-label="Message pharmacy assistant"
                className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="rounded-lg bg-purple-600 p-3 text-white hover:bg-purple-700"
              >
                <FaPaperPlane />
              </button>
            </form>
          </section>
        )}
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label={
            chatOpen ? "Close assistant" : "Open pharmacy assistant"
          }
          className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-700 to-pink-600 text-2xl text-white shadow-lg transition hover:scale-105"
        >
          {chatOpen ? <FaXmark /> : <FaRobot />}
        </button>
      </div>
    </div>
  );
}