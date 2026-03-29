import { useEffect, useState } from "react";
import API from "../services/api";

import EventAdminDashboard from "./Admin_dashboard";
import ProjectAdminDashboard from "./project_dashboard";

const AD_Dashboard = () => {

  const [admin, setAdmin] = useState(null);

  useEffect(() => {

    const fetchAdmin = async () => {
      const res = await API.get("/admin/me");
      setAdmin(res.data);
    };

    fetchAdmin();

  }, []);

  if (!admin) return <div className="p-6">Loading...</div>;

  if (admin.role === "event") {
    return <EventAdminDashboard />;
  }

  if (admin.role === "project") {
    return <ProjectAdminDashboard />;
  }

  return <div>Unauthorized</div>;
};

export default AD_Dashboard;