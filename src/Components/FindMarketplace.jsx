import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
} from "react-icons/fa6";

// Images from src/assets
import foodImg from "../assets/food.jpg";
import pandaImg from "../assets/panda.jpg";
import grabImg from "../assets/grab.jpg";
import delivImg from "../assets/deliv.jpg";

export default function FindMarketplace() {
  const { open, setOpen, onLogout } = useOutletContext();

  // =========================================================
  // STATES
  // =========================================================

  const [search, setSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [entries, setEntries] = useState(7);

  // =========================================================
  // MARKETPLACE CARDS
  // =========================================================

  const marketplaceCards = [
    {
      id: 1,
      category: "Healthy Diet",
      service: "Food Panda",
      price: "5 RM",
      image: foodImg,
      logo: pandaImg,
      description:
        "As Uber works through a huge amount of internal management turmoil.",
    },

    {
      id: 2,
      category: "Healthy Diet",
      service: "Grab Food",
      price: "10 RM",
      image: foodImg,
      logo: grabImg,
      description:
        "Music is something that every person has his or her own taste.",
    },

    {
      id: 3,
      category: "Healthy Diet",
      service: "Deliveroo",
      price: "15 RM",
      image: foodImg,
      logo: delivImg,
      description:
        "Different people have different taste, and various types of music.",
    },

    {
      id: 4,
      category: "Healthy Diet",
      service: "Minimalist",
      price: "20 RM",
      image: foodImg,
      logo: pandaImg,
      description:
        "Different people have different taste, and various types of music.",
    },
  ];

  // =========================================================
  // TABLE DATA
  // =========================================================

  const tableData = [
    {
      id: "243598234",
      name: "Healthy Diet",
      category: "Food",
      service: "Food Panda",
      logo: pandaImg,
      discount: 0,
      price: "10 RM",
    },

    {
      id: "877712",
      name: "Healthy Diet",
      category: "Food",
      service: "Grab Food",
      logo: grabImg,
      discount: 5,
      price: "9 RM",
    },

    {
      id: "0134729",
      name: "Healthy Diet",
      category: "Food",
      service: "Delivroo",
      logo: delivImg,
      discount: 9,
      price: "25 RM",
    },

    {
      id: "113213",
      name: "Healthy Diet",
      category: "Food",
      service: "Food Panda",
      logo: pandaImg,
      discount: 5,
      price: "15 RM",
    },

    {
      id: "634729",
      name: "Healthy Diet",
      category: "Food",
      service: "Food Panda",
      logo: pandaImg,
      discount: 7,
      price: "25 RM",
    },

    {
      id: "634730",
      name: "Healthy Diet",
      category: "Food",
      service: "Food Panda",
      logo: pandaImg,
      discount: 0,
      price: "20 RM",
    },
  ];

  // =========================================================
  // FILTER TABLE
  // =========================================================

  const filteredTableData = tableData.filter((item) => {
    const value = tableSearch.toLowerCase();

    return (
      item.name.toLowerCase().includes(value) ||
      item.category.toLowerCase().includes(value) ||
      item.service.toLowerCase().includes(value) ||
      item.id.toLowerCase().includes(value)
    );
  });

  const displayedData = filteredTableData.slice(0, entries);

  // =========================================================
  // FILTER MARKETPLACE CARDS
  // =========================================================

  const filteredCards = marketplaceCards.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.category.toLowerCase().includes(value) ||
      item.service.toLowerCase().includes(value)
    );
  });

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="contentTwo font-[Merriweather,serif] min-h-screen flex flex-col bg-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="flex justify-between max-[600px]:flex-wrap items-center p-5 gap-2.5 m-2.5">

        {/* HOME ICON */}

        <FaHouse className="text-[#344675]" />

        {/* PAGE PATH */}

        <p className="text-[#777] text-sm">
          / marketplace
        </p>

        {/* PAGE TITLE */}

        <div>
          <p className="text-[#344675]">
            <b>marketplace</b>
          </p>
        </div>

        {/* MENU */}

        <FaBars
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-[#344675]"
        />

        {/* HEADER SEARCH */}

        <div
          className="
            search-box
            relative
            w-[250px]
            max-lg:w-[150px]
            max-[600px]:w-full
            max-[600px]:order-3
          "
        >

          <FaMagnifyingGlass
            className="
              absolute
              left-2.5
              top-1/2
              -translate-y-1/2
              text-[rgb(112,113,115)]
            "
          />

          <input
            type="text"
            placeholder="Type here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              py-2.5
              pr-2.5
              pl-[35px]
              border
              border-[#ccc]
              rounded-[10px]
              outline-none
              focus:border-[#344675]
            "
          />

        </div>

        {/* HEADER ICONS */}

        <div
          className="
            iconsbox
            flex
            items-center
            gap-2.5
            p-2.5
            text-[rgb(112,113,115)]
          "
        >

          {/* ACCOUNT */}

          <Link to="/account">
            <FaCircleUser className="cursor-pointer" />
          </Link>

          {/* LOG OUT */}

          <button
            className="
              border-none
              bg-transparent
              cursor-pointer
              text-[rgb(112,113,115)]
            "
            onClick={() => {
              alert("You have been logged out!");
              onLogout();
            }}
          >
            log out
          </button>

          {/* SETTINGS */}

          <FaGear className="cursor-pointer" />

          {/* NOTIFICATION */}

          <FaBell className="cursor-pointer" />

        </div>

      </header>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="flex-1 px-5 sm:px-8 lg:px-10 pb-10">

        {/* ===================================================
            MARKETPLACE TITLE
        ==================================================== */}

        <section className="mt-3">

          <h1
            className="
              text-xl
              sm:text-2xl
              font-semibold
              text-[#263b76]
              mb-7
            "
          >
            Search Marketplaces and order what you need
          </h1>


          {/* =================================================
              MARKETPLACE CARDS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-x-7
              gap-y-10
            "
          >

            {filteredCards.map((item) => (

              <div
                key={item.id}
                className="w-full min-w-0"
              >

                {/* FOOD IMAGE */}

                <div
                  className="
                    w-full
                    h-[145px]
                    sm:h-[135px]
                    lg:h-[145px]
                    overflow-hidden
                    rounded-[15px]
                  "
                >

                  <img
                    src={item.image}
                    alt={item.category}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                </div>


                {/* CATEGORY + PRICE */}

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mt-4
                  "
                >

                  <p className="text-[#555] text-sm">
                    {item.category}
                  </p>

                  <p className="text-[#65c3e5] text-lg">
                    {item.price}
                  </p>

                </div>


                {/* SERVICE */}

                <div className="flex items-center gap-2 mt-2">

                  <img
                    src={item.logo}
                    alt={item.service}
                    className="
                      w-[35px]
                      h-[35px]
                      object-contain
                      rounded-full
                    "
                  />

                  <h3
                    className="
                      text-[#263b76]
                      text-lg
                      font-medium
                    "
                  >
                    {item.service}
                  </h3>

                </div>


                {/* DESCRIPTION */}

                <p
                  className="
                    text-[#777]
                    text-sm
                    leading-6
                    mt-2
                    min-h-[65px]
                    line-clamp-3
                  "
                >
                  {item.description}
                </p>


                {/* BUY NOW */}

                <button
                  onClick={() =>
                    alert(`You selected ${item.service}`)
                  }
                  className="
                    mt-3
                    w-[112px]
                    py-2
                    rounded-[8px]
                    text-white
                    text-sm
                    font-semibold
                    bg-gradient-to-r
                    from-[#f20c9c]
                    to-[#7135e8]
                    hover:opacity-90
                    transition
                    cursor-pointer
                  "
                >
                  BUY NOW
                </button>

              </div>

            ))}

          </div>


          {/* =================================================
              NO RESULT
          ================================================== */}

          {filteredCards.length === 0 && (

            <p className="text-center text-[#777] mt-10">
              No marketplace found.
            </p>

          )}

        </section>


        {/* ===================================================
            TABLE
        ==================================================== */}

        <section className="mt-16">

          {/* TABLE TITLE */}

          <h2
            className="
              text-xl
              sm:text-2xl
              font-medium
              text-[#263b76]
              mb-6
            "
          >
            Other results for healthy diet search
          </h2>


          {/* TABLE CONTROLS */}

          <div
            className="
              flex
              justify-between
              items-center
              flex-wrap
              gap-5
              mb-5
            "
          >

            {/* ENTRIES */}

            <div className="flex items-center gap-2">

              <select
                value={entries}
                onChange={(e) =>
                  setEntries(Number(e.target.value))
                }
                className="
                  border
                  border-[#ddd]
                  rounded-[7px]
                  px-3
                  py-2
                  text-sm
                  outline-none
                  bg-white
                  cursor-pointer
                "
              >

                <option value={7}>7</option>
                <option value={5}>5</option>
                <option value={10}>10</option>

              </select>

              <span className="text-sm text-[#777]">
                entries per page
              </span>

            </div>


            {/* TABLE SEARCH */}

            <div className="relative w-[200px]">

              <input
                type="text"
                placeholder="Search"
                value={tableSearch}
                onChange={(e) =>
                  setTableSearch(e.target.value)
                }
                className="
                  w-full
                  border
                  border-[#ddd]
                  rounded-[7px]
                  py-2
                  px-3
                  text-sm
                  outline-none
                  focus:border-[#344675]
                "
              />

            </div>

          </div>


          {/* =================================================
              TABLE
          ================================================== */}

          <div className="w-full overflow-x-auto">

            <table
              className="
                w-full
                min-w-[850px]
                border-collapse
                text-left
              "
            >

              {/* TABLE HEADER */}

              <thead>

                <tr
                  className="
                    text-[10px]
                    sm:text-[11px]
                    text-[#999]
                    uppercase
                  "
                >

                  <th className="py-4 px-3 font-medium">
                    Name
                  </th>

                  <th className="py-4 px-3 font-medium">
                    Category
                  </th>

                  <th className="py-4 px-3 font-medium">
                    Service By
                  </th>

                  <th className="py-4 px-3 font-medium">
                    Discount
                  </th>

                  <th className="py-4 px-3 font-medium">
                    Price
                  </th>

                  <th className="py-4 px-3 font-medium">
                    ID
                  </th>

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody>

                {displayedData.map((item, index) => (

                  <tr
                    key={`${item.id}-${index}`}
                    className="
                      border-t
                      border-[#eeeeee]
                      hover:bg-[#fafafa]
                      transition
                    "
                  >

                    {/* NAME */}

                    <td className="py-3 px-3">

                      <div className="flex items-center gap-3">

                        <img
                          src={foodImg}
                          alt={item.name}
                          className="
                            w-[60px]
                            h-[40px]
                            object-cover
                            rounded-[5px]
                          "
                        />

                        <span className="text-sm text-[#344675]">
                          {item.name}
                        </span>

                      </div>

                    </td>


                    {/* CATEGORY */}

                    <td
                      className="
                        py-3
                        px-3
                        text-sm
                        text-[#555]
                      "
                    >
                      {item.category}
                    </td>


                    {/* SERVICE */}

                    <td className="py-3 px-3">

                      <div className="flex items-center gap-3">

                        <img
                          src={item.logo}
                          alt={item.service}
                          className="
                            w-[58px]
                            h-[30px]
                            object-contain
                          "
                        />

                        <span className="text-sm text-[#344675]">
                          {item.service}
                        </span>

                      </div>

                    </td>


                    {/* DISCOUNT */}

                    <td
                      className="
                        py-3
                        px-3
                        text-sm
                        text-[#555]
                      "
                    >
                      {item.discount}
                    </td>


                    {/* PRICE */}

                    <td
                      className="
                        py-3
                        px-3
                        text-sm
                        text-[#555]
                      "
                    >
                      {item.price}
                    </td>


                    {/* ID */}

                    <td
                      className="
                        py-3
                        px-3
                        text-sm
                        text-[#344675]
                      "
                    >
                      {item.id}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* =================================================
              NO TABLE RESULT
          ================================================== */}

          {displayedData.length === 0 && (

            <div className="text-center py-10 text-[#777]">
              No results found.
            </div>

          )}


          {/* =================================================
              SHOWING ENTRIES
          ================================================== */}

          <div className="mt-5 text-sm text-[#777]">

            Showing{" "}
            {displayedData.length === 0 ? 0 : 1}{" "}
            to{" "}
            {displayedData.length}{" "}
            of{" "}
            {filteredTableData.length}{" "}
            entries

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer
        className="
          px-5
          sm:px-8
          lg:px-10
          py-8
          mt-auto
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-5
          text-sm
          text-[#6875a0]
        "
      >

        {/* COPYRIGHT */}

        <p className="text-center sm:text-left">
          © 2026, made with ❤️ by MyPiHUB for a better web.
        </p>


        {/* FOOTER LINKS */}

        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-5
            sm:gap-7
          "
        >

          <Link
            to="/"
            className="hover:text-[#263b76] transition"
          >
            MyPatientHUB
          </Link>

          <Link
            to="/about"
            className="hover:text-[#263b76] transition"
          >
            About Us
          </Link>

          <Link
            to="/blog"
            className="hover:text-[#263b76] transition"
          >
            Blog
          </Link>

        </div>

      </footer>

    </div>
  );
}