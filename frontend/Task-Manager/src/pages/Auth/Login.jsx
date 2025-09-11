import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Login API
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const data = response.data.data || response.data;

      const token = data.token || data?.user?.token;
      if (!token) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);

      // 2️⃣ Fetch full profile after login
      const profileRes = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = profileRes.data;

      // 3️⃣ Update context with full user data + token
      updateUser({ ...userData, token });

      // 4️⃣ Navigate based on role
      const normalizedRole = userData.role === "member" ? "user" : userData.role;
      if (normalizedRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm md:max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl px-6 py-6 md:py-8 flex flex-col items-center overflow-y-auto max-h-[90vh]">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-2 text-center">
            ZenTask
          </h2>
          <p className="text-gray-200 text-center mb-6 text-sm md:text-base">
            Organize your day, conquer your tasks. Login to continue.
          </p>

          {error && (
            <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-400 p-2 rounded-lg w-full text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-blue-400 hover:underline hover:text-blue-600"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-white py-3 rounded-2xl font-semibold shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="relative z-10">
                {loading ? "Logging in..." : "Login"}
              </span>
            </button>
          </form>

          <p className="text-gray-300 text-xs md:text-sm text-center mt-5">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-400 font-medium hover:underline hover:text-pink-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
