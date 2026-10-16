import React from "react";
import { useState } from "react";
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
  FaRectangleList,
  FaCube,
  FaStore,
  FaScrewdriverWrench,
  FaCreditCard,
} from "react-icons/fa6";
import product from "../Data/Products";

export default function Settings() {
  const { open, setOpen, onLogout } = useOutletContext();
  const [on, setOn] = useState(false);
  // search
  const [search, setSearch] = useState("");

  const products = [
    { id: "profile", name: "Profile" },
    { id: "basic-info", name: "Basic Info" },
    { id: "change-password", name: "Change Password" },
    { id: "two-factor", name: "Two-factor authentication" },
    { id: "sessions", name: "Sessions" },
    { id: "delete-account", name: "Delete Account" },
  ];

  const items = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="contentTwo font-[Merriweather,serif] ">
        <header className="flex justify-between max-[600px]:flex-wrap p-5 gap-2.5 m-2.5">
          <FaHouse />
          <p>/ Accountsetting</p>
          <div>
            <p>
              <b>Accountsetting</b>
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
            <FaGear />
            <FaBell />
          </div>
        </header>
      </div>
      <div className="grid h-[calc(100vh-180px)] min-h-0 grid-cols-1 gap-8 overflow-hidden sm:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sidebar: stays visible while the right side scrolls */}
        <aside className="boxbg hidden h-full overflow-y-auto sm:block">
          <div className="py-2">
            <a href="#profile" className="flex items-center gap-2 px-4 py-2">
              <FaRocket size={15} className="shrink-0 text-[#344a70]" />
              <p className="text-[#64748b]">Profile</p>
            </a>
            <a href="#basic-info" className="flex items-center gap-2 px-4 py-2">
              <FaRectangleList size={15} className="shrink-0 text-[#344a70]" />
              <p className="text-[#64748b]">Basic info</p>
            </a>
            <a
              href="#change-password"
              className="flex items-center gap-2 px-4 py-2"
            >
              <FaCube size={15} className="shrink-0 text-[#344a70]" />
              <p className="text-[#64748b]">Change password</p>
            </a>
            <a href="#two-factor" className="flex items-center gap-2 px-4 py-2">
              <FaStore size={15} className="shrink-0 text-[#344a70]" />
              <p className="text-[#64748b]">2FA</p>
            </a>
            <a href="#sessions" className="flex items-center gap-2 px-4 py-2">
              <FaScrewdriverWrench
                size={15}
                className="shrink-0 text-[#344a70]"
              />
              <p className="text-[#64748b]">Sessions</p>
            </a>
            <a
              href="#delete-account"
              className="flex items-center gap-2 px-4 py-2"
            >
              <FaCreditCard size={15} className="shrink-0 text-[#344a70]" />
              <p className="text-[#64748b]">Delete account</p>
            </a>
          </div>
        </aside>

        {/* Main content: only this column scrolls */}
        <main className="h-full min-h-0 min-w-0 space-y-3 overflow-y-auto overscroll-contain pr-2">
          {/* Profile card */}
          {products[0].name.toLowerCase().includes(search.toLowerCase()) && (
            <section
              id="profile"
              className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]"
            >
              <img
                src={product?.[18]?.Image}
                alt={product?.[18]?.name || "Profile"}
                className="h-[50px] w-[50px] rounded-full object-cover"
              />
              <div>
                <h1 className="font-semibold">Azam Shah</h1>
                <p className="text-sm text-gray-500">Patient</p>
              </div>
              <div className="ml-auto flex items-center gap-5 rounded-xl bg-white">
                <div>
                  <p>Switch to</p>
                  <span className="text-sm text-[#344a70]">
                    {on ? "visible" : "invisible"}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Toggle profile visibility"
                  onClick={() => setOn(!on)}
                  className={`flex h-6 w-12 items-center rounded-full p-1 transition-colors ${
                    on ? "bg-[#344a70]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-6" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </section>
          )}

          {/* Basic information */}
          {products[1].name.toLowerCase().includes(search.toLowerCase()) && (
            <section id="basic-info" className="bgformbox">
              <h2 className="p-3 text-xl text-[#344a70]">
                <b>Basic Info</b>
              </h2>
              <form className="w-full p-3">
                <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1 block">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Eg. Michael"
                      className="w-full rounded-md border p-2 text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1 block">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Eg. Thomson"
                      className="w-full rounded-md border p-2 text-gray-700"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="mb-1 block">Birth date</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="month"
                      defaultValue=""
                      className="w-full rounded-md border p-2 text-gray-700"
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
                      className="w-full rounded-md border p-2 text-gray-700"
                    >
                      <option value="" disabled>
                        Day
                      </option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ),
                      )}
                    </select>
                    <select
                      name="year"
                      defaultValue=""
                      className="w-full rounded-md border p-2 text-gray-700"
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

                <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-1 block">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      className="w-full rounded-md border p-2 text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="bloodGroup" className="mb-1 block">
                      Blood group
                    </label>
                    <input
                      id="bloodGroup"
                      name="bloodGroup"
                      type="text"
                      placeholder="A+"
                      className="w-full rounded-md border p-2 text-gray-700"
                    />
                  </div>
                </div>

                <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="location" className="mb-1 block">
                      Your location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Sydney, Australia"
                      className="w-full rounded-md border p-2 text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+93700000000"
                      className="w-full rounded-md border p-2 text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="height" className="mb-1 block">
                      Height
                    </label>
                    <input
                      id="height"
                      name="height"
                      type="text"
                      placeholder="Height"
                      className="w-full rounded-md border p-2 text-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="weight" className="mb-1 block">
                      Weight
                    </label>
                    <input
                      id="weight"
                      name="weight"
                      type="text"
                      placeholder="Weight"
                      className="w-full rounded-md border p-2 text-gray-700"
                    />
                  </div>
                </div>
              </form>
            </section>
          )}

          {/* Change password */}
          {products[2].name.toLowerCase().includes(search.toLowerCase()) && (
            <section id="change-password" className="bgformbox">
              <h2 className="p-3 text-2xl text-[#344a70]">
                <b>Change Password</b>
              </h2>
              <form>
                <div className="m-3">
                  <label htmlFor="currentPassword" className="mb-1 block">
                    Current password
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="Current password"
                    className="w-full rounded-md border p-2 text-gray-700"
                  />
                </div>
                <div className="m-3">
                  <label htmlFor="newPassword" className="mb-1 block">
                    New password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="New password"
                    className="w-full rounded-md border p-2 text-gray-700"
                  />
                </div>
                <div className="m-3">
                  <label htmlFor="confirmPassword" className="mb-1 block">
                    Confirm new password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full rounded-md border p-2 text-gray-700"
                  />
                </div>
              </form>
              <div className="p-3">
                <h3 className="text-2xl text-[#344a70]">
                  Password requirements
                </h3>
                <p className="text-[#64748b]">
                  Please follow this guide for a strong password
                </p>
                <ul className="list-disc space-y-1 p-6 pl-6 text-[#64748b]">
                  <li>One special character</li>
                  <li>Minimum 6 characters</li>
                  <li>One number (2 are recommended)</li>
                  <li>Change it often</li>
                </ul>
                <button
                  type="button"
                  className="mt-6 rounded-md bg-gradient-to-r from-[#353C66] to-[#20243D] px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  UPDATE PASSWORD
                </button>
              </div>
            </section>
          )}

          {/* Two-factor authentication */}
          {products[3].name.toLowerCase().includes(search.toLowerCase()) && (
            <section id="two-factor" className="bgformbox p-4">
              <div className="flex justify-between gap-3 p-3">
                <h2 className="text-2xl text-[#344a70]">
                  <b>Two-factor authentication</b>
                </h2>
                <span className="rounded-xl bg-green-200 px-3 py-2 text-green-700">
                  Enabled
                </span>
              </div>
              <div className="p-4">
                <div className="mt-7 flex items-center justify-between gap-3">
                  <p className="text-[#64748b]">Security keys</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[#64748b]">No Security keys</p>
                    <button
                      type="button"
                      className="rounded border px-3 py-2 transition-all hover:scale-105"
                    >
                      ADD
                    </button>
                  </div>
                </div>
                <hr className="mx-7 my-7 text-gray-200" />
                <div className="mt-7 flex items-center justify-between gap-3">
                  <p className="text-[#64748b]">SMS number</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[#64748b]">+3012374423</p>
                    <button
                      type="button"
                      className="rounded border px-3 py-2 transition-all hover:scale-105"
                    >
                      EDIT
                    </button>
                  </div>
                </div>
                <hr className="mx-7 my-7 text-gray-200" />
                <div className="mt-7 flex items-center justify-between gap-3">
                  <p className="text-[#64748b]">Authenticator app</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[#64748b]">Not Configured</p>
                    <button
                      type="button"
                      className="rounded border px-5 py-3 transition-all hover:scale-105"
                    >
                      SET UP
                    </button>
                  </div>
                </div>
                <hr className="mx-7 my-7 text-gray-200" />
              </div>
            </section>
          )}

          {/* Sessions */}
          {products[4].name.toLowerCase().includes(search.toLowerCase()) && (
            <section id="sessions" className="bgformbox p-4">
              <h2 className="text-2xl text-[#344a70]">
                <b>Sessions</b>
              </h2>
              <p className="mt-2 text-[#64748b]">
                Manage your active sessions and devices.
              </p>
              <div>
                <ul className="list-disc pl-6 space-y-1 text-[#64748b] p-6">
                  <li>One special characters</li>
                  <li>Min 6 characters</li>
                  <li>One number (2 are recommended)</li>
                  <li>Change it often</li>
                </ul>
              </div>
              <div>
                <button className="mt-6 rounded-md px-6 py-2 text-white bg-gradient-to-r from-[#353C66] to-[#20243D]  text-end">
                  UPDEAT PASSWORD
                </button>
              </div>
            </section>
          )}

          {/* Delete account */}
          {products[5].name.toLowerCase().includes(search.toLowerCase()) && (
            <section id="delete-account" className="bgformbox p-4">
              <h2 className="text-2xl text-[#344a70]">
                <b>Delete Account</b>
              </h2>
              <p className="text-[#64748b]">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    aria-label="Confirm account deletion"
                    onClick={() => setOn(!on)}
                    className={`flex h-6 w-12 items-center rounded-full p-1 transition-colors ${on ? "bg-[#344a70]" : "bg-gray-300"}`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-6" : "translate-x-0"}`}
                    />
                  </button>
                  <div>
                    <h3>
                      <b>Confirm</b>
                    </h3>
                    <p>I want to delete my account.</p>
                  </div>
                </div>
                <div className="m-3">
                  <button
                    type="button"
                    className="m-3 rounded-lg border px-5 py-2 text-[#64748b] transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    DEACTIVATE
                  </button>
                  <button
                    type="button"
                    className="rounded-lg bg-red-500 px-5 py-2 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    DELETE ACCOUNT
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
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
