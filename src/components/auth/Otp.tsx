import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { verifyOtp } from "../../api/authApi";
import { ChevronLeftIcon } from "../../icons";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    if (!email) {
      toast.error("Email not found. Please login again.");
      navigate("/signin");
      return;
    }

    if (otpCode.length !== 6) {
      toast.error("Please enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp({
        email,
        otp: otpCode,
      });

      toast.success(res.data.message || "OTP verified successfully");

      // Save auth data
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Back Button */}
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Login
        </Link>
      </div>

      {/* OTP Form */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
            Verify OTP
          </h1>

          <p className="text-sm text-gray-500">
            Enter the 6-digit OTP sent to:
          </p>

          <p className="mt-1 font-medium text-brand-500">
            {email || "No email found"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className="w-12 h-14 text-xl font-semibold text-center text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>

        {/* Resend OTP */}
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500">
            Didn’t receive code?{" "}
            <button
              type="button"
              className="font-medium text-brand-500 hover:text-brand-600"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}