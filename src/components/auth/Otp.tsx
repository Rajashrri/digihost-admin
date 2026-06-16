import { useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon } from "../../icons";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP:", otp.join(""));
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Verify OTP
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the 6-digit OTP sent to your email/mobile.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 text-center text-xl font-semibold border rounded-lg dark:bg-gray-900 dark:text-white text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              Verify OTP
            </button>
          </div>
        </form>

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Didn’t receive code?{" "}
            <button className="text-brand-500 hover:text-brand-600">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}