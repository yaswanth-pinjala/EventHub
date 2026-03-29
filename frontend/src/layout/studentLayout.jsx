import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import logo from "../assets/bec-logo.png";

const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);

  // 🔹 FETCH LOGGED-IN USER (SINGLE SOURCE OF TRUTH)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/students/me");
        setUser(res.data);

        // 🔹 sync to localStorage
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("User fetch failed", err);
        navigate("/login/student");
      }
    };

    fetchUser();
  }, [navigate]);

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Sidebar menu item
  const menuItem = (path, label) => (
    <li
      className={`px-3 py-2 rounded-lg cursor-pointer ${
        location.pathname.includes(`/student/${path}`) ||
        (path === "dashboard" && location.pathname === "/student")
          ? "bg-blue-50 text-blue-700 font-medium"
          : "hover:bg-gray-100"
      }`}
    >
      <Link to={path}>{label}</Link>
    </li>
  );

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* LOGO */}
        <div className="flex items-center gap-3 px-4 py-4 border-b">
          <img src={logo} className="w-10 h-10" alt="BEC Logo" />
          <span className="font-semibold text-sm">
            Bapatla Engineering College
          </span>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-2 py-4 text-sm">
          <p className="text-gray-500 uppercase text-xs mb-2 px-2">
            Student Menu
          </p>

          <ul className="space-y-1">
            {menuItem("dashboard", "Dashboard")}
            {menuItem("events", "Events")}
            {menuItem("registered-events", "Registered Events")}
            {menuItem("notifications", "Notifications")}
            {menuItem("certificates", "Event Certificates")}
            {menuItem("projects", "AcademicProjects")}
          </ul>
        </nav>

        {/* PROFILE SECTION */}
        <div
          ref={profileRef}
          className="relative px-4 py-3 border-t text-xs text-gray-500"
        >
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="text-left">
              <p className="font-semibold">{user.regNo}</p>
              <p className="text-gray-500 text-xs">{user.name}</p>
            </div>
          </div>

          {/* DROPDOWN */}
          {profileOpen && (
            <div className="absolute bottom-14 left-4 w-48 bg-white border rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("profile");
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("change-password");
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Change Password
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
