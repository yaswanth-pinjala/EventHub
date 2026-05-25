import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    navigate("/reset-password", { state: { email: state.email, otp: finalOtp } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((data, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-12 h-12 border text-center text-xl rounded-lg"
              />
            ))}
          </div>

          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;