import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../api/authApi";
import { toast } from "react-toastify";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ EMAIL VALIDATION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // ================= VALIDATION =================

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      toast.success(res.data.message || "OTP sent successfully");

      navigate("/verify-otp", { state: { email } });

    } catch (err) {
      const msg = err.response?.data?.message;

      // ================= SMART ERROR HANDLING =================
      if (msg?.toLowerCase().includes("email")) {
        toast.error("Email not found");
      } 
      else if (msg?.toLowerCase().includes("password")) {
        toast.error("Password not match");
      } 
      else if (msg?.toLowerCase().includes("invalid credentials")) {
        toast.error("Invalid email or password");
      } 
      else {
        toast.error(msg || "Login failed");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1">

      <div className="w-full max-w-md pt-10 mx-auto">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500">
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">

        <form onSubmit={handleLogin}>
          <div className="space-y-6">

            {/* EMAIL */}
            <div>
              <Label>Email *</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@gmail.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <Label>Password *</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </span>
              </div>
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Sign In"}
            </Button>

          </div>
        </form>

      </div>
    </div>
  );
}