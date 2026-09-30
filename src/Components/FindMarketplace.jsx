import React from "react";
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
} from "react-icons/fa6";
import product from "../Data/Products";

export default function FindMarketplace() {
  const { open, setOpen, onLogout } = useOutletContext();
  return (
    <>
      <div className="contentTwo font-[Merriweather,serif] ">
        <header className="flex justify-between max-[600px]:flex-wrap p-5 gap-2.5 m-2.5">
          <FaHouse />
          <p>/ marketplace</p>
          <div>
            <p>
              <b>marketplace</b>
            </p>
          </div>

          <FaBars onClick={() => setOpen(!open)} className="cursor-pointer" />
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
    </>
  );
}
