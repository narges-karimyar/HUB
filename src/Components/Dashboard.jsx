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

export default function Dashboard() {
  const { open, setOpen, onLogout } = useOutletContext();
  return (
    <div className="contentTwo font-[Merriweather,serif] ">
      <header className="flex justify-between max-[600px]:flex-wrap p-5 gap-2.5 m-2.5">
        <FaHouse />
        <p>/ Dashbord</p>
        <div>
          <p>Dashboard</p>
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

      <div>
        <h1 className="text-[2em] font-bold my-[0.67em]">
          Welcome To MyPatietnHUB!
        </h1>

        <div className="gridpart grid grid-cols-2 gap-x-5 gap-y-2.5 max-lg:grid-cols-1">
          {/* first card */}
          <div
            id="cardpro1"
            className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[280px] w-full  max-lg:w-full max-lg:h-auto w-full overflow-hidden"
          >
            <div
              id="protitle"
              className="flex items-center justify-between mb-[15px]"
            >
              <p className="text-[#4b5563]">
                <i>Promotion by Clinics</i>
              </p>
              <FaCircleExclamation className="text-[rgb(112,113,115)]" />
            </div>

            <div
              id="procontent"
              className="flex gap-5 max-lg:flex-col max-lg:items-center"
            >
              {/* image */}
              <div
                id="probox"
                className="flex flex-col items-center w-[200px] "
              >
                <img
                  src={product[5].Image}
                  alt="Promotion"
                  className="w-250px] h-[130px] max-[600px]:w-[200px] max-[600px]:h-[90px] object-cover rounded-lg"
                />
                <button className="mt-2.5 px-2.5 py-2 border-none rounded-md bg-[#f1f1f1] text-[10px] cursor-pointer">
                  MORE DETAILS
                </button>
              </div>

              <div id="clinicbox" className="flex-1">
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[1].Image}
                    alt="Klinik Lee Healthcare"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Klinik Lee Healthcare
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    19%
                  </span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[2].Image}
                    alt="Klinik Bandar Baru Nilai"
                    className="w-3 h-3 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Klinik Bandar Baru Nilai
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">4%</span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[3].Image}
                    alt="Klinik Mediviron Giant Nilai"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Klinik Mediviron Giant Nilai
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    10%
                  </span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[4].Image}
                    alt="Klinik Nilai Impian"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Klinik Nilai Impian
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    21%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* second card */}

          <div
            id="cardpro1"
            className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[280px] w-full  max-lg:w-full max-lg:h-auto w-full overflow-hidden"
          >
            <div
              id="protitle"
              className="flex items-center justify-between mb-[15px]"
            >
              <p className="text-[#4b5563]">
                <i>Promotion by Pharmacies</i>
              </p>
              <FaCircleExclamation className="text-[rgb(112,113,115)]" />
            </div>

            <div
              id="procontent"
              className="flex gap-5 max-lg:flex-col max-lg:items-center"
            >
              {/* image */}
              <div id="probox" className="flex flex-col items-center w-[200px]">
                <img
                  src={product[6].Image}
                  alt="Promotion"
                  className="w-250px] h-[130px] max-[600px]:w-[200px] max-[600px]:h-[90px] object-cover rounded-lg"
                />
                <button className="mt-2.5 px-2.5 py-2 border-none rounded-md bg-[#f1f1f1] text-[10px] cursor-pointer">
                  MORE DETAILS
                </button>
              </div>

              <div id="clinicbox" className="flex-1">
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[1].Image}
                    alt="Klinik Lee Healthcare"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Klinik Lee Healthcare
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    19%
                  </span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[2].Image}
                    alt="Klinik Bandar Baru Nilai"
                    className="w-3 h-3 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Klinik Bandar Baru Nilai
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">4%</span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[3].Image}
                    alt="Klinik Mediviron Giant Nilai"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Klinik Mediviron Giant Nilai
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    10%
                  </span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[4].Image}
                    alt="Klinik Nilai Impian"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Klinik Nilai Impian
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    21%
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* third card */}
          <div
            id="cardpro1"
            className="bg-white p-[30px] max-[600px]:p-[15px] rounded-xl h-[280px] w-full  max-lg:w-full max-lg:h-auto w-full overflow-hidden"
          >
            <div
              id="protitle"
              className="flex items-center justify-between mb-[15px]"
            >
              <p className="text-[#4b5563]">
                <i>Smart Market Usage by app</i>
              </p>
              <FaCircleExclamation className="text-[rgb(112,113,115)]" />
            </div>

            <div
              id="procontent"
              className="flex gap-5 max-lg:flex-col max-lg:items-center"
            >
              {/* image */}
              <div id="probox" className="flex flex-col items-center w-[200px]">
                <img
                  src={product[7].Image}
                  alt="Promotion"
                  className="w-250px] h-[130px] max-[600px]:w-[200px] max-[600px]:h-[90px] object-cover rounded-lg"
                />
                <button className="mt-2.5 px-2.5 py-2 border-none rounded-md bg-[#f1f1f1] text-[10px] cursor-pointer">
                  See ALL Reeferrals
                </button>
              </div>

              <div id="clinicbox" className="flex-1">
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[1].Image}
                    alt="Klinik Lee Healthcare"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Food Panda
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    19%
                  </span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[2].Image}
                    alt="Klinik Bandar Baru Nilai"
                    className="w-3 h-3 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Grab Food
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">4%</span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[3].Image}
                    alt="Klinik Mediviron Giant Nilai"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Zomato
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    10%
                  </span>
                </div>
                <div className="card flex items-center h-[55px] gap-2.5 border-b border-[#eee]">
                  <img
                    src={product[4].Image}
                    alt="Klinik Nilai Impian"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="flex-1 text-xs max-[600px]:text-[11px] font-medium text-[#4b5563]">
                    Lazada
                  </p>
                  <span className="text-xs font-medium text-[#6b7280]">
                    21%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* fourth card */}

          <div
            id="cardpro1"
            className="bg-white p-[24px] max-[600px]:p-[15px] rounded-[24px] h-[280px] w-full overflow-hidden"
          >
            {/* Title */}
            <div className="mb-1">
              <p className="text-[#71809d] text-[20px] font-semibold">
                Health Index
              </p>

              <div className="flex items-center gap-2">
                <h2 className="text-[#344a70] text-[20px] font-bold leading-tight">
                  70%
                </h2>
                <span className="text-[#65c900] text-[20px] font-bold">
                  +3%
                </span>
              </div>
            </div>

            {/* Curved chart */}
            <div className="w-full h-[165px] mt-2">
              <svg
                viewBox="0 0 700 165"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient
                    id="healthGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#344a70" stopOpacity="0.10" />
                    <stop
                      offset="100%"
                      stopColor="#344a70"
                      stopOpacity="0.02"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M 0 130
           C 35 136, 65 153, 100 140
           S 155 102, 195 105
           S 250 125, 290 88
           S 345 45, 380 75
           S 430 110, 465 65
           S 515 18, 555 43
           S 610 65, 645 40
           S 680 12, 700 0
           L 700 165 L 0 165 Z"
                  fill="url(#healthGradient)"
                />

                <path
                  d="M 0 130
           C 35 136, 65 153, 100 140
           S 155 102, 195 105
           S 250 125, 290 88
           S 345 45, 380 75
           S 430 110, 465 65
           S 515 18, 555 43
           S 610 65, 645 40
           S 680 12, 700 0"
                  fill="none"
                  stroke="#344a70"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex flex-col gap-4 px-4 py-5 text-xs text-[#4b5563] sm:flex-row sm:justify-between sm:items-center sm:px-6 lg:px-10">
        <p className="text-center sm:text-left">
          © 2026, made with{" "}
          <FaHeart className="inline text-[rgb(112,113,115)]" />{" "}
          <b className="text-[rgb(25,62,125)]">MyPiHUB</b> for a better web.
        </p>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 items-center sm:justify-end">
          <p>MyPatientHUB</p>
          <p>About Us</p>
          <p>Blog</p>
        </div>
      </footer>
    </div>
  );
}
