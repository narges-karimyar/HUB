import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import Aside from "./Aside";

export default function Layout({ onLogout }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Aside open={open} />
      <div className="flex-1 min-w-0 p-6">
        <Outlet context={{ open, setOpen, onLogout }} />
      </div>
    </div>
  );
}
