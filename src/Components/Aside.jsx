import { Link } from "react-router-dom";
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
} from "react-icons/fa6";
import product from "../Data/Products";

export default function Aside({ open }) {
  const c = "rgb(30, 48, 80)";
  const link = `flex gap-3 ${open ? "my-8 mx-8" : "my-10 justify-center"}`;

  return (
    <aside
      className={`shrink-0 transition-all duration-300 m-2 h-screen sticky top-0 overflow-y-auto overflow-x-hidden max-lg:hidden ${
        open ? "w-64 " : "w-20 "
      }`}
    >
      <div className={`flex m-2 ${open ? "" : "justify-center"}`}>
        <img
          src={product[0].Image}
          alt={product[0].name}
          className="h-12 w-13"
        />
        {open && <p className="mt-3">MyPatientHUB</p>}
      </div>
      <hr className="text-gray-400" />
      <Link to="/" className={link}>
        <span className="span">
          {" "}
          <FaStore size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">Dashboard</p>}
      </Link>

      <Link to="/appointments" className={link}>
        <span className="span">
          {" "}
          <FaCreditCard size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">Appointments</p>}
      </Link>

      <Link to="/find-doctor" className={link}>
        <span className="span">
          {" "}
          <FaBuilding size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">Find Doctor</p>}
      </Link>

      <Link to="/find-clinic" className={link}>
        <span className="span">
          {" "}
          <FaStore size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">Find Clinic</p>}
      </Link>

      <Link to="/chat" className={link}>
        <span className="span">
          {" "}
          <FaComment size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">Chat</p>}
      </Link>

      <Link to="/marketplace" className={link}>
        <span className="span">
          {" "}
          <FaCartShopping size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">Find Marketplace</p>}
      </Link>

      <Link to="/pharmacy" className={link}>
        <span className="span">
          {" "}
          <FaRocket size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">Find Pharmacy</p>}
      </Link>

      <Link to="/dependents" className={link}>
        <span className="span">
          {" "}
          <FaFileLines size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">My Dependents</p>}
      </Link>

      <Link to="/account" className={link}>
        <span className="span">
          {" "}
          <FaScrewdriverWrench size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">My Account</p>}
      </Link>

      <Link to="/settings" className={link}>
        <span className="span">
          {" "}
          <FaGear size={12} color={c} />
        </span>
        {open && <p className="text-gray-400 text-sm">Settings</p>}
      </Link>

      <div
        className={`bg-linear-to-b from-[rgba(233,67,197,0.911)] to-[rgb(149,71,217)] rounded ${
          open ? "p-7 m-3" : "p-3 my-3 flex justify-center"
        }`}
      >
        <FaCircleQuestion className="text-white" />
        {open && (
          <>
            <h1 className="text-white">Download</h1>
            <p className="text-white">MyPIHUB Mobile App</p>
          </>
        )}
      </div>
    </aside>
  );
}
