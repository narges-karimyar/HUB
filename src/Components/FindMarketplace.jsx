import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
  FaHeart,
  FaStar,
} from "react-icons/fa6";
import chicken from "../assets/chicken.jpg";
import panda from "../assets/panda.jpg";
import grab from "../assets/grab.jpg";
import deliv from "../assets/deliv.jpg";
import riceMeat from "../assets/rice&meat.jpg";
import fish from "../assets/fish.png";
import egg from "../assets/egg.jpg";
import beans from "../assets/beans.jpg";
import eggsAvocado from "../assets/eggs&avocado.jpg";
import rice from "../assets/rice.jpg";
import steak from "../assets/steak.jpg";
export default function FindMarketplace() {
  const { open, setOpen, onLogout } = useOutletContext();
  // Search for food cards
  const [search, setSearch] = useState("");
  // Favorite foods
  const [favorites, setFavorites] = useState([]);
  // Entries per page
  const [entries, setEntries] = useState(7);
  // Search inside table
  const [tableSearch, setTableSearch] = useState("");
  // --------------------------------------------------
  // FOOD DATA
  // --------------------------------------------------
  const foods = [
    {
      id: 243598234,
      name: "Grilled Fish",
      category: "Food",
      service: "Food Panda",
      serviceImage: panda,
      image: fish,
      price: 25,
      discount: 20,
      todayPick: true,
      special: "Fresh Catch",
    },
    {
      id: 877712,
      name: "Healthy Rice & Meat",
      category: "Food",
      service: "Grab Food",
      serviceImage: grab,
      image: riceMeat,
      price: 9,
      discount: 0,
      todayPick: false,
      special: "Fresh Meal",
    },
    {
      id: 134729,
      name: "Healthy Egg Plate",
      category: "Food",
      service: "Food Panda",
      serviceImage: panda,
      image: egg,
      price: 15,
      discount: 0,
      todayPick: false,
      special: "Protein Rich",
    },
    {
      id: 113213,
      name: "Beans & Salad",
      category: "Food",
      service: "Food Panda",
      serviceImage: panda,
      image: beans,
      price: 25,
      discount: 0,
      todayPick: false,
      special: "Healthy Choice",
    },
    {
      id: 634729,
      name: "Eggs & Avocado",
      category: "Food",
      service: "Grab Food",
      serviceImage: grab,
      image: eggsAvocado,
      price: 18,
      discount: 0,
      todayPick: false,
      special: "Healthy Breakfast",
    },
    {
      id: 634730,
      name: "Steak",
      category: "Food",
      service: "Delivroo",
      serviceImage: deliv,
      image: steak,
      price: 30,
      discount: 0,
      todayPick: false,
      special: "High Protein",
    },
    {
      id: 634731,
      name: "Rice Plate",
      category: "Food",
      service: "Grab Food",
      serviceImage: grab,
      image: rice,
      price: 12,
      discount: 0,
      todayPick: false,
      special: "Energy Boost",
    },
    {
      id: 634732,
      name: "Grilled Chicken",
      category: "Food",
      service: "Food Panda",
      serviceImage: panda,
      image: chicken,
      price: 20,
      discount: 0,
      todayPick: false,
      special: "Chef's Choice",
    },
    {
      id: 634733,
      name: "Fish & Vegetables",
      category: "Food",
      service: "Delivroo",
      serviceImage: deliv,
      image: fish,
      price: 18,
      discount: 0,
      todayPick: false,
      special: "Low Fat",
    },
  ];
  // --------------------------------------------------
  // FAVORITE FUNCTION
  // --------------------------------------------------
  const toggleFavorite = (id) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(id)) {
        return currentFavorites.filter((item) => item !== id);
      }
      return [...currentFavorites, id];
    });
  };
  // --------------------------------------------------
  // MAIN SEARCH
  // --------------------------------------------------
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );
  // --------------------------------------------------
  // TODAY'S PICK
  // --------------------------------------------------
  const todayPick = foods.find((food) => food.todayPick);
  // --------------------------------------------------
  // NORMAL FOOD CARDS
  // --------------------------------------------------
  const regularFoods = filteredFoods.filter(
    (food) => !food.todayPick
  );
  // --------------------------------------------------
  // FAVORITE FOOD LIST
  // --------------------------------------------------
  const favoriteFoods = foods.filter((food) =>
    favorites.includes(food.id)
  );
  // --------------------------------------------------
  // TABLE SEARCH
  // --------------------------------------------------
  const searchedTable = foods.filter((food) => {
    const value = tableSearch.toLowerCase();
    return (
      food.name.toLowerCase().includes(value) ||
      food.category.toLowerCase().includes(value) ||
      food.service.toLowerCase().includes(value) ||
      String(food.price).includes(value)
    );
  });
  // --------------------------------------------------
  // ENTRIES PER PAGE
  // --------------------------------------------------
  const visibleFoods = searchedTable.slice(0, Number(entries));
  const totalEntries = searchedTable.length;
  const showingFrom = totalEntries === 0 ? 0 : 1;
  const showingTo = Math.min(Number(entries), totalEntries);
  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------
  return (
    <>
      <div className="contentTwo font-[Merriweather,serif]">
        {/* HEADER */}
        <header className="flex justify-between max-[600px]:flex-wrap p-5 gap-2.5 m-2.5">
          <div className="flex items-center gap-2">
            <FaHouse />
            <p>/ marketplace</p>
          </div>
          <div>
            <p>
              <b>marketplace</b>
            </p>
          </div>
          <FaBars
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
          />
          <div className="search-box relative w-[250px] max-lg:w-[150px] max-[600px]:w-full max-[600px]:order-3">
            <FaMagnifyingGlass
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[rgb(112,113,115)]"
            />
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
        {/* MAIN */}
        <main className="px-5 pb-10">
          {/* TITLE */}
          <div className="mt-8 mb-6">
            <h2 className="text-[22px] font-extrabold text-[#263b80]">
              Search marketplaces and order what you need
            </h2>
          </div>
          {/* TODAY'S PICK - HORIZONTAL CARD */}
          {todayPick && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <FaStar className="text-[#f4b400]" />
                <h2 className="text-[20px] font-extrabold text-[#263b80]">
                  Today's Pick
                </h2>
              </div>
              <div
                className="
                  group relative flex flex-row items-center gap-6
                  max-sm:gap-3 max-sm:items-start p-5 max-sm:p-3
                  w-full rounded-[18px] overflow-hidden bg-white
                  border border-[#d946ef] shadow-md transition-all
                  duration-300 hover:-translate-y-1 hover:shadow-xl
                "
              >
                {/* FOOD IMAGE */}
                <div className="w-[40%] max-sm:w-[42%] shrink-0 overflow-hidden rounded-[12px]">
                  <img
                    src={todayPick.image}
                    alt={todayPick.name}
                    className="w-full h-[240px] max-sm:h-[160px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* FOOD INFORMATION */}
                <div className="flex-1 min-w-0 py-2">
                  <span className="inline-flex items-center gap-1 bg-[#fff4bd] text-[#806500] px-3 py-1 rounded-full text-xs font-bold">
                    <FaStar />
                    TODAY'S PICK
                  </span>
                  <h3 className="text-[23px] max-sm:text-base font-extrabold text-[#263b80] mt-4">
                    {todayPick.name}
                  </h3>
                  {/* SERVICE */}
                  <div className="flex items-center gap-2 mt-3">
                    <img
                      src={todayPick.serviceImage}
                      alt={todayPick.service}
                      className="w-[45px] h-[30px] object-contain"
                    />
                    <span className="font-semibold text-[#263b80] text-sm">
                      {todayPick.service}
                    </span>
                  </div>
                  {/* DISCOUNT + SPECIAL */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs bg-[#fff1f8] text-[#d946ef] px-3 py-1.5 rounded-full font-bold">
                      {todayPick.discount}% OFF
                    </span>
                    <span className="text-xs bg-[#f3f4f6] px-3 py-1.5 rounded-full text-gray-600 font-semibold">
                      {todayPick.special}
                    </span>
                  </div>
                  {/* PRICE */}
                  <p className="mt-4 font-extrabold text-[#16a6c9] text-xl">
                    {todayPick.price} RM
                  </p>
                </div>
                {/* FAVORITE HEART */}
                <button
                  onClick={() => toggleFavorite(todayPick.id)}
                  aria-label="Add to favorites"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 z-10"
                >
                  <FaHeart
                    className={
                      favorites.includes(todayPick.id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>
            </div>
          )}
          {/* NORMAL FOOD SECTION */}
          <div className="mb-5">
            <h2 className="text-[20px] font-extrabold text-[#263b80]">
              Other Marketplace Foods
            </h2>
          </div>
          {/* NORMAL FOOD CARDS */}
          <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-6">
            {regularFoods.map((food) => {
              const isFavorite = favorites.includes(food.id);
              return (
                <div
                  key={food.id}
                  className="group relative rounded-[15px] overflow-hidden bg-white border border-[#eeeeee] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* FOOD IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-[145px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* FAVORITE */}
                    <button
                      onClick={() => toggleFavorite(food.id)}
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 z-10"
                    >
                      <FaHeart
                        className={
                          isFavorite
                            ? "text-red-500"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </div>
                  {/* CARD CONTENT */}
                  <div className="p-4">
                    {/* FOOD NAME + PRICE */}
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="font-bold text-[#263b80]">
                        {food.name}
                      </h3>
                      <span className="font-bold text-[#16a6c9]">
                        {food.price} RM
                      </span>
                    </div>
                    {/* SERVICE */}
                    <div className="flex items-center gap-2 mt-3">
                      <img
                        src={food.serviceImage}
                        alt={food.service}
                        className="w-[38px] h-[28px] object-contain"
                      />
                      <span className="font-semibold text-[#263b80]">
                        {food.service}
                      </span>
                    </div>
                    {/* SPECIAL */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs bg-[#f3f4f6] px-2.5 py-1 rounded-full text-gray-600">
                        {food.special}
                      </span>
                    </div>
                    {/* BUY BUTTON */}
                    <button
                      className="mt-4 w-full py-2.5 rounded-[8px] bg-gradient-to-r from-[#d946ef] to-[#7c3aed] text-white font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              );
            })}
            {regularFoods.length === 0 && (
              <p className="col-span-full text-center py-8 text-gray-500">
                No food found.
              </p>
            )}
          </div>
          {/* FIND YOUR FAVORITE FOOD */}
          <div className="mt-10 mb-8 p-5 rounded-[15px] bg-[#faf7ff] border border-[#eadcff] flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
            <div>
              <h2 className="text-[20px] font-extrabold text-[#263b80]">
                Find your favorite food
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Save the meals you love and find them easily.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm">
              <FaHeart className="text-red-500" />
              <span className="font-bold text-[#263b80]">
                {favorites.length}
              </span>
              <span className="text-gray-500">
                favorite {favorites.length === 1 ? "food" : "foods"}
              </span>
            </div>
          </div>
          {/* FAVORITE FOODS LIST */}
          {favorites.length > 0 && (
            <div className="mb-10">
              <h2 className="text-[20px] font-extrabold text-[#263b80] mb-4">
                Your Favorite Foods
              </h2>
              <div className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-4">
                {favoriteFoods.map((food) => (
                  <div
                    key={food.id}
                    className="flex items-center gap-3 p-3 bg-white border border-[#eadcff] rounded-[12px] shadow-sm"
                  >
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-[75px] h-[60px] rounded-[8px] object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#263b80]">
                        {food.name}
                      </p>
                      <p className="text-sm text-[#16a6c9] font-semibold">
                        {food.price} RM
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(food.id)}
                      aria-label={`Remove ${food.name} from favorites`}
                      className="p-2"
                    >
                      <FaHeart className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {favorites.length === 0 && (
            <p className="mb-8 text-sm text-gray-500">
              You haven't added any favorite foods yet. Click a heart on any food card to add it here.
            </p>
          )}
          {/* TABLE SECTION */}
          <div className="mt-10">
            <h2 className="text-[20px] font-bold text-[#263b80] mb-5">
              Other results for healthy diet search
            </h2>
            {/* ENTRIES + SEARCH */}
            <div className="flex justify-between items-center gap-5 mb-5 max-md:flex-col max-md:items-start">
              <div className="flex items-center gap-3">
                <select
                  value={entries}
                  onChange={(e) => setEntries(e.target.value)}
                  className="w-[180px] h-[44px] px-4 border border-[#d6d6d6] rounded-[8px] bg-white text-[#263b80] cursor-pointer outline-none"
                >
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                <span className="text-gray-500 whitespace-nowrap">
                  entries per page
                </span>
              </div>
              <div className="relative w-[220px]">
                <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="w-full h-[44px] pl-10 pr-3 border border-[#d6d6d6] rounded-[8px] outline-none"
                />
              </div>
            </div>
            {/* TABLE */}
            <div className="w-full overflow-x-auto rounded-[10px]">
              <div className="min-w-[950px]">
                <div className="grid grid-cols-[2.3fr_1fr_1.8fr_1fr_1fr_1fr] gap-5 px-5 py-4 text-[12px] font-bold text-gray-400 uppercase border-b border-gray-200">
                  <span>NAME</span>
                  <span>CATEGORY</span>
                  <span>SERVICE BY</span>
                  <span>DISCOUNT</span>
                  <span>PRICE</span>
                  <span>ID</span>
                </div>
                {visibleFoods.map((food) => (
                  <div
                    key={food.id}
                    className="grid grid-cols-[2.3fr_1fr_1.8fr_1fr_1fr_1fr] gap-5 items-center px-5 py-4 border-b border-gray-100 hover:bg-[#faf7ff] transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-[58px] h-[42px] rounded-[5px] object-cover"
                      />
                      <span className="font-semibold text-[#263b80]">
                        {food.name}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      {food.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <img
                        src={food.serviceImage}
                        alt={food.service}
                        className="w-[58px] h-[32px] object-contain"
                      />
                      <span className="text-[#263b80] font-semibold">
                        {food.service}
                      </span>
                    </div>
                    <span>
                      {food.todayPick ? (
                        <span className="font-bold text-[#d946ef]">
                          {food.discount}%
                        </span>
                      ) : (
                        <span className="text-gray-500">0</span>
                      )}
                    </span>
                    <span className="text-gray-600">
                      {food.price} RM
                    </span>
                    <span className="text-gray-500">
                      {food.id}
                    </span>
                  </div>
                ))}
                {visibleFoods.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No food found.
                  </div>
                )}
              </div>
            </div>
            {/* SHOWING */}
            <div className="mt-5 text-sm text-gray-500">
              Showing {showingFrom} to {showingTo} of {totalEntries} entries
            </div>
          </div>
        </main>
        {/* FOOTER */}
        <footer className="mt-10 px-8 py-6 border-t border-gray-200 flex justify-between items-center gap-5 max-md:flex-col max-md:items-start text-sm text-gray-500">
          <p>
            ©️ 2026, made with ♡ by MyPtiHUB for a better web.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#263b80]">
              MyPatientHUB
            </a>
            <a href="#" className="hover:text-[#263b80]">
              About Us
            </a>
            <a href="#" className="hover:text-[#263b80]">
              Blog
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}