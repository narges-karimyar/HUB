import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
import product from "./Data/Products";
import Login from "./Components/Account";
import FindDoctor from "./Components/Find";
import FindClinic from "./Components/Clinic";
import FindMarketplace from "./Components/FindMarketplace";
import Findpharmacy from "./Components/FindPharmacy";
import MyDependents from "./Components/MyDependents";
import Myaccount from "./Components/Myaccount";
import Settings from "./Components/Setting";
import Chat from "./Components/Chat";
import CircleChart from "./Components/CircleChart";
import SecondCircle from "./Components/SecondCircle";
import LineBarAreaChart from "./Components/LineBarAreaChart";
import SignUP from "./Components/SignUP";
import HighlightAndZoomLineChart from "./Components/HighlightAndZoomLineChart";
import SimpleBarChart from "./Components/SimpleBarChart";
export default function App() {
  const [logged, setLogged] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          logged ? (
            <Layout onLogout={() => setLogged(false)} />
          ) : (
            <Login onLogin={() => setLogged(true)} />
          )
        }
      >
        {/* Keep your existing dashboard routes here */}
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<h1>Appointment</h1>} />
        <Route path="find-doctor" element={<FindDoctor />} />
        <Route path="find-clinic" element={<FindClinic />} />
        <Route path="chat" element={<Chat />} />
        <Route path="marketplace" element={<FindMarketplace />} />
        <Route path="Pharmacy" element={<Findpharmacy />} />
        <Route path="dependents" element={<MyDependents />} />
        <Route path="account" element={<Myaccount />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="/SignUP"
        element={<SignUP onLogin={() => setLogged(true)} />}
      />
    </Routes>
  );
}
