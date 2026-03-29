import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));

    if (!adminData) {
      navigate("/login/admin");
      return;
    }

    if (adminData.role === "event") {
      navigate("/admin/event-admin/profile");
    } 
    else if (adminData.role === "project") {
      navigate("/admin/project-admin/profile");
    } 
    else {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return null;
};

export default ProfileRedirect;