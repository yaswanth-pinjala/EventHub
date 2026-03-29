import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import logo from "../assets/bec-logo.png";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  /* Fetch logged in admin */
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await API.get("/admin/me");
        setAdmin(res.data);

        localStorage.setItem("admin", JSON.stringify(res.data));
      } catch (err) {
        console.error("Admin fetch failed");
        navigate("/login/admin");
      }
    };

    fetchAdmin();
  }, [navigate]);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Sidebar Menu Item */
  const menuItem = (path, label) => (
    <li
      className={`px-3 py-2 rounded-lg cursor-pointer ${
        location.pathname.includes(`/admin/${path}`) ||
        (path === "dashboard" && location.pathname === "/admin")
          ? "bg-blue-50 text-blue-700 font-medium"
          : "hover:bg-gray-100"
      }`}
    >
      <Link to={path}>{label}</Link>
    </li>
  );

  if (!admin) return <div className="p-6">Loading...</div>;

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* LOGO */}
        <div className="flex items-center gap-3 px-4 py-4 border-b">
          <img src={logo} className="w-10 h-10" alt="BEC Logo" />

          <span className="font-semibold text-sm">
            {admin.role === "event"
              ? "Event Admin Panel"
              : "Project Admin Panel"}
          </span>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-2 py-4 text-sm">
          <p className="text-gray-500 uppercase text-xs mb-2 px-2">
            Admin Menu
          </p>

          <ul className="space-y-1">
            {menuItem("dashboard", "Dashboard")}

            {/* EVENT ADMIN MENU */}
            {admin.role === "event" && (
              <>
                {menuItem("events", "Events")}
                {menuItem("reports", "Event Reports")}
                {menuItem("certificates", "Event Certificates")}
              </>
            )}

            {/* PROJECT ADMIN MENU */}
            {admin.role === "project" && (
              <>
                {menuItem("projects", "Projects")}
              </>
            )}
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
              {admin.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold">{admin.name}</p>
              <p className="text-gray-500 text-xs">
                {admin.role === "event"
                  ? "Event Administrator"
                  : "Project Administrator"}
              </p>
            </div>
          </div>

          {/* DROPDOWN */}
          {profileOpen && (
            <div className="absolute bottom-14 left-4 w-48 bg-white border rounded-lg shadow-lg">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/admin/profile");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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

export default AdminLayout;