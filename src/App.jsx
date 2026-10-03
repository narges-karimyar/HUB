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

export default function App() {
  const [logged, setLogged] = useState(false);
  if (logged === false) {
    return <Login onLogin={() => setLogged(true)} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout onLogout={() => setLogged(false)} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<h1>Appointments</h1>} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/find-clinic" element={<FindClinic />} />
          <Route path="/chat" element={<h1>Chat</h1>} />
          <Route path="/marketplace" element={<FindMarketplace />} />
          <Route path="/Pharmacy" element={<Findpharmacy />} />
          <Route path="/dependents" element={<MyDependents />} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
