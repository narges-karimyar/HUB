import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
  FaHeart,
} from "react-icons/fa6";

export default function MyDependents() {
  const { open, setOpen, onLogout } = useOutletContext();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Dependents Registration",
    "Dependents Health Records",
    "Family Care Plan",
  ];

  const handleNext = (e) => {
    e.preventDefault();

    if (currentStep < 2) {
      setCurrentStep((previousStep) => previousStep + 1);
    } else {
      alert("You have reached the final step!");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="contentTwo font-[Merriweather,serif]">
        <header className="flex justify-between max-[600px]:flex-wrap p-5 gap-2.5 m-2.5">
          <FaHouse />

          <p>/ mydependents</p>

          <div>
            <p>
              <b>mydependents</b>
            </p>
          </div>

          <button
            type="button"
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
              className="w-full py-2.5 pr-2.5 pl-[35px] border border-[#ccc] rounded-[10px]"
            />
          </div>

          <div className="iconsbox flex items-center gap-2.5 p-2.5 text-[rgb(112,113,115)]">
            <Link to="/account">
              <FaCircleUser />
            </Link>

            <button
              type="button"
              className="border-none bg-[rgba(233,231,231,0.336)]"
              onClick={() => {
                alert("You have been logged out!");
                onLogout();
              }}
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
      </div>

      {/* Page Heading */}
      <div className="container bgformbox">
        <div className="mx-auto w-full px-4 sm:px-6 md:px-8">
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
            <div
              className={`w-4 h-4 shrink-0 rounded-full ${
                currentStep >= 0 ? "bg-[#344a70]" : "bg-white"
              }`}
            />

            <div
              className={`h-[2px] flex-1 ${
                currentStep >= 1 ? "bg-[#344a70]" : "bg-[#dfe3e8]"
              }`}
            />

            <div
              className={`w-3.5 h-3.5 shrink-0 rounded-full border-2 ${
                currentStep >= 1
                  ? "bg-[#344a70] border-[#344a70]"
                  : "bg-white border-[#dfe3e8]"
              }`}
            />

            <div
              className={`h-[2px] flex-1 ${
                currentStep >= 2 ? "bg-[#344a70]" : "bg-[#dfe3e8]"
              }`}
            />

            <div
              className={`w-3.5 h-3.5 shrink-0 rounded-full border-2 ${
                currentStep >= 2
                  ? "bg-[#344a70] border-[#344a70]"
                  : "bg-white border-[#dfe3e8]"
              }`}
            />
          </div>

          {/* Clickable Progress Labels */}
          <div className="grid grid-cols-3 gap-2 max-w-[600px] mx-auto mt-3">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(index)}
                className={`text-center text-xs sm:text-sm md:text-base cursor-pointer transition-colors ${
                  currentStep === index
                    ? "text-[#344a70] font-semibold"
                    : "text-gray-400 hover:text-[#344a70]"
                }`}
              >
                {step}
              </button>
            ))}
          </div>

          {/* Dynamic Heading and Description */}
          <div>
            <div className="text-center p-4 sm:p-6 md:p-8">
              {currentStep === 0 && (
                <>
                  <h1 className="text-[#344a70] text-xl sm:text-2xl">
                    Let's start with the basic information
                  </h1>

                  <p className="text-gray-400 mt-3">
                    Let us know your name and last name for contacting you.
                  </p>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <h1 className="text-[#344a70] text-xl sm:text-2xl">
                    Dependents Health Record
                  </h1>
                </>
              )}
            </div>
          </div>

          {/* Form: Visible Only on Steps 1 and 2 */}
          {currentStep !== 2 && (
            <form
              className="w-full max-w-3xl mx-auto p-6"
              onSubmit={handleNext}
            >
              {/* First and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block mb-2">
                    First name
                  </label>

                  <input
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                    name="year"
                    defaultValue=""
                    className="border w-full rounded-md p-2 text-gray-700"
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

              {/* Relation and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="relation" className="block mb-2">
                    Relation
                  </label>

                  <input
                    required
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
                    required
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

              {/* Back / Next Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep((previousStep) => previousStep - 1)
                  }
                  disabled={currentStep === 0}
                  className="rounded-md px-6 py-2 border border-[#344a70] text-[#344a70] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="rounded-md px-6 py-2 text-white bg-gradient-to-r from-[#353C66] to-[#20243D]"
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {/* Part 3: Family Care Plan */}
          {currentStep === 2 && (
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Standard Plan */}
                <div className="bgformbox border rounded-lg p-5">
                  <h1 className="text-[rgb(25,62,125)] text-lg font-semibold">
                    Standard Plan
                  </h1>

                  <hr className="my-3 border-gray-300" />

                  <ul className="space-y-2 text-gray-600">
                    <li>✔️Detail One</li>
                    <li>Detail Two</li>
                    <li>✔️Detail Three</li>
                  </ul>
                </div>

                {/* Premium Plan */}
                <div className="bgformbox border rounded-lg p-5">
                  <h1 className="text-[rgb(25,62,125)] text-lg font-semibold">
                    Premium Plan
                  </h1>

                  <hr className="my-3 border-gray-300" />

                  <ul className="space-y-2 text-gray-600">
                    <li>Detail One</li>
                    <li>✔️Detail Two</li>
                    <li>Detail Three</li>
                  </ul>
                </div>

                {/* Family Plan */}
                <div className="bgformbox border rounded-lg p-5">
                  <h1 className="text-[rgb(25,62,125)] text-lg font-semibold">
                    Family Plan
                  </h1>

                  <hr className="my-3 border-gray-300" />

                  <ul className="space-y-2 text-gray-600">
                    <li>Detail One</li>
                    <li>✔️Detail Two</li>
                    <li>✔️Detail Three</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 Back / Finish Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="rounded-md px-6 py-2 border border-[#344a70] text-[#344a70]"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => alert("Family Care Plan selected!")}
                  className="rounded-md px-6 py-2 text-white bg-gradient-to-r from-[#353C66] to-[#20243D]"
                >
                  Finish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="lg:flex justify-between items-center px-10 py-5 text-xs text-[#4b5563]">
        <p>
          © 2026, made with{" "}
          <FaHeart className="inline text-[rgb(112,113,115)]" />{" "}
          <b className="text-[rgb(25,62,125)]">MyPiHUB</b> for a better web.
        </p>

        <div className="flex gap-[25px] items-center">
          <p>MyPatientHUB</p>
          <p>About Us</p>
          <p>Blog</p>
        </div>
      </footer>
    </>
  );
}
