import { Routes, Route } from "react-router-dom";
import LandingPage from "./Homepage/LandingPage";
import StudentLogin from "./student/StudentLogin";
import StudentLayout from "./layout/studentLayout";
import Dashboard from "./student/dashboard";
import Events from "./student/events";
import RegisteredEvents from "./student/reg_events";
import NotificationPage from "./student/notificationsPage";
import Certificates from "./student/certificatePage";
import Projects from "./student/projectPage";
import Profile from "./student/Profile";
import ChangePassword from "./student/ChangePassword";
import StudentRegister from "./student/StudentRegister";
import EventDetails from "./student/EventDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      {/* STUDENT ROUTES */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="registered-events" element={<RegisteredEvents />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="projects" element={<Projects />} />
        <Route path="profile" element={<Profile />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}

export default App;
