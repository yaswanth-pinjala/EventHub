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
import StaffLogin from "./Staff/staff_login";
import StaffLayout from "./layout/StaffLayout";
import StaffRegistration from "./Staff/staff_Register";
import StaffDashboard from "./Staff/staff_dashboard";
import TeacherUpcomingEvents from "./Staff/upcoming_events";
import Staff_Eventdetails from "./Staff/Staff_Eventdetails";
import EventsPage from "./Staff/staff_events";
import AdminLogin from "./Admin/AdminLogin";
import AdminLayout from "./layout/EventLayout";
import AdminDashboard from "./Admin/Admin_dashboard";
import EventsPageAdmin from "./Admin/EventsPage";
import CreateEvent from "./Admin/CreateEvent";
import ViewEvent from "./Admin/ViewEvent";
import EditEvent from "./Admin/EditEvent";
import EventReports from "./Admin/EventReports";
import EventCertificates from "./Admin/EventCertificates";
import UploadCertificates from "./Admin/UploadCertificates";
import AD_Dashboard from "./Admin/dashboard";
import ProjectAdminProjects from "./Admin/ProjectAdminProjects";
import UploadProject from "./Admin/UploadProject";
import EditProject from "./Admin/EditProject";
import ViewProject from "./Admin/ViewProject";
import ProfileRedirect from "./Admin/ProfileRedirect";
import EventAdminProfile from "./Admin/EventAdminProfile";
import ProjectAdminProfile from "./Admin/ProjectAdminProfile";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";
import StaffProfile from "./Staff/StaffProfile";
import StaffChangePassword from "./Staff/StaffChangePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/staff" element={<StaffLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/staff/register" element={<StaffRegistration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />
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

      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<StaffDashboard />} />
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="upcoming-events" element={<TeacherUpcomingEvents />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<Staff_Eventdetails />} />
        <Route path="projects" element={<Projects />} />
        <Route path="profile" element={<StaffProfile />} />
        <Route path="change-password" element={<StaffChangePassword />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AD_Dashboard />} />
        <Route path="dashboard" element={<AD_Dashboard />} />
        <Route path="events" element={<EventsPageAdmin />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="view-event/:id" element={<ViewEvent />} />
        <Route path="edit-event/:id" element={<EditEvent />} />
        <Route path="reports" element={<EventReports />} />
        <Route path="certificates" element={<EventCertificates />} />
        <Route path="certificates/:eventId" element={<UploadCertificates />} />
        <Route path="projects" element={<ProjectAdminProjects />} />
        <Route path="projects/upload" element={<UploadProject />} />
        <Route path="projects/view/:id" element={<ViewProject />} />
        <Route path="projects/edit/:id" element={<EditProject />} />
        <Route path="profile" element={<ProfileRedirect />} />
        <Route path="event-admin/profile" element={<EventAdminProfile />} />
        <Route path="project-admin/profile" element={<ProjectAdminProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
