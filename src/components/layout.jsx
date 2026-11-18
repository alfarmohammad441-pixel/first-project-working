import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

import "./layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [DarkPage, setDarkPage] = useState(
    () => localStorage.getItem("page-theme") === "dark"
  );

  function togglePageTheme() {
    setDarkPage((current) => {
      const next = !current;
      localStorage.setItem("page-theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <div className={`app-layout${DarkPage ? " page-dark" : ""}`}>
      <Navbar
        DarkPage={DarkPage}
        onToggleTheme={togglePageTheme}
      />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
