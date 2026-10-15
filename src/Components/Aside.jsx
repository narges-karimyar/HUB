import { NavLink } from "react-router-dom";
import {
  FaStore,
  FaCreditCard,
  FaBuilding,
  FaComment,
  FaCartShopping,
  FaRocket,
  FaFileLines,
  FaScrewdriverWrench,
  FaGear,
  FaCircleQuestion,
  FaXmark,
  FaApple,
  FaAndroid,
} from "react-icons/fa6";

import product from "../Data/Products";

export default function Aside({ open, setOpen }) {
  const closeMenu = () => setOpen(false);

  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl transition-all duration-200
    ${open ? "my-4 mx-3 px-4 py-2" : "my-6 mx-2 justify-center py-2"}
    ${
      isActive
        ? "bg-[#dfe8f5] text-[#344a70] font-semibold"
        : "text-gray-400 hover:bg-gray-100 hover:text-[#344a70]"
    }`;

  return (
    <>
      {/* Mobile and tablet backdrop */}
      {open && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          shrink-0 bg-white
          transition-all duration-300
          m-2 h-screen sticky top-0
          overflow-y-auto overflow-x-hidden
          z-50
          max-lg:fixed max-lg:left-0 max-lg:top-0
          max-lg:m-0 max-lg:h-screen max-lg:w-64
          ${open ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"}
          ${open ? "w-64" : "w-20"}
        `}
      >
        {/* Logo and close button */}
        <div
          className={`flex items-center m-2 ${
            open ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-2">
            <img
              src={product[0].Image}
              alt={product[0].name}
              className="h-12 w-13"
            />

            {open && <p className="mt-3">MyPatientHUB</p>}
          </div>

          {open && (
            <button
              onClick={closeMenu}
              className="lg:hidden p-2"
              aria-label="Close menu"
            >
              <FaXmark size={20} />
            </button>
          )}
        </div>

        <hr className="text-gray-200 mx-4 my-4" />

        {/* Dashboard */}
        <NavLink to="/" end onClick={closeMenu} className={getLinkClass}>
          <FaStore size={15} className="shrink-0" />
          {open && <p className="text-sm">Dashboard</p>}
        </NavLink>

        {/* Appointments */}
        <NavLink
          to="/appointments"
          onClick={closeMenu}
          className={getLinkClass}
        >
          <FaCreditCard size={15} className="shrink-0" />
          {open && <p className="text-sm">Appointments</p>}
        </NavLink>

        {/* Find Doctor */}
        <NavLink to="/find-doctor" onClick={closeMenu} className={getLinkClass}>
          <FaBuilding size={15} className="shrink-0" />
          {open && <p className="text-sm">Find Doctor</p>}
        </NavLink>

        {/* Find Clinic */}
        <NavLink to="/find-clinic" onClick={closeMenu} className={getLinkClass}>
          <FaStore size={15} className="shrink-0" />
          {open && <p className="text-sm">Find Clinic</p>}
        </NavLink>

        {/* Chat */}
        <NavLink to="/chat" onClick={closeMenu} className={getLinkClass}>
          <FaComment size={15} className="shrink-0" />
          {open && <p className="text-sm">Chat</p>}
        </NavLink>

        {/* Marketplace */}
        <NavLink to="/marketplace" onClick={closeMenu} className={getLinkClass}>
          <FaCartShopping size={15} className="shrink-0" />
          {open && <p className="text-sm">Find Marketplace</p>}
        </NavLink>

        {/* Pharmacy */}
        <NavLink to="/pharmacy" onClick={closeMenu} className={getLinkClass}>
          <FaRocket size={15} className="shrink-0" />
          {open && <p className="text-sm">Find Pharmacy</p>}
        </NavLink>

        {/* My Dependents */}
        <NavLink to="/dependents" onClick={closeMenu} className={getLinkClass}>
          <FaFileLines size={15} className="shrink-0" />
          {open && <p className="text-sm">My Dependents</p>}
        </NavLink>

        {/* My Account */}
        <NavLink to="/account" onClick={closeMenu} className={getLinkClass}>
          <FaScrewdriverWrench size={15} className="shrink-0" />
          {open && <p className="text-sm">My Account</p>}
        </NavLink>

        {/* Settings */}
        <NavLink to="/settings" onClick={closeMenu} className={getLinkClass}>
          <FaGear size={15} className="shrink-0" />
          {open && <p className="text-sm">Settings</p>}
        </NavLink>

        {/* Download app section */}
        <div
          className={`bg-linear-to-b from-[rgba(233,67,197,0.911)] to-[rgb(149,71,217)] rounded-2xl ${
            open ? "p-7 m-3" : "p-3 my-3 flex justify-center"
          }`}
        >
          <FaCircleQuestion className="text-white" />

          {open && (
            <>
              <h1 className="text-white">
                <b>Download</b>
              </h1>

              <p className="text-white text-xs">MyPIHUB Mobile App</p>

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  aria-label="Apple app"
                  className="flex items-center justify-center w-20 h-7 rounded-xl bg-white shadow-md"
                >
                  <FaApple className="text-[#d414a5] text-xl" />
                </button>

                <button
                  type="button"
                  aria-label="Android app"
                  className="flex items-center justify-center w-20 h-7 rounded-xl bg-white shadow-md"
                >
                  <FaAndroid className="text-[#d414a5] text-xl" />
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
