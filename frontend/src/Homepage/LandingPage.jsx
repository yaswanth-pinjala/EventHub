import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-illustration.png";
import logo from "../assets/bec-logo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HEADER */}
      <header className="flex items-center gap-3 px-12 py-6">
        <img src={logo} alt="BEC Logo" className="w-12 h-12" />
        <h1 className="text-sm font-semibold tracking-wide text-blue-900">
          BAPATLA ENGINEERING COLLEGE
        </h1>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-12 py-20">
          
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold text-blue-900 leading-tight">
              Welcome to <br />
              <span className="text-blue-600">EventHub</span>
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              A Unified Platform for Campus Activities
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate("/login/student")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Login as Student
              </button>

              <button
                onClick={() => navigate("/login/staff")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Login as Teacher
              </button>

              <button
                onClick={() => navigate("/login/admin")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Login as Admin
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden lg:block relative">
            <img
              src={heroImg}
              alt="EventHub Illustration"
              className="w-[520px] opacity-95"
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-12 py-16 border-t">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">
          About
        </h3>
        <p className="text-gray-600 max-w-3xl leading-relaxed">
          EventHub simplifies event management and project collaboration within
          the campus, providing an intuitive and efficient platform for
          students, teachers, and administrators.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="px-12 py-6 border-t flex justify-between text-sm text-gray-500">
        <span>© Bapatla Engineering College</span>

        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-600">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
