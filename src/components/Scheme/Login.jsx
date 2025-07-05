import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import "tailwindcss/tailwind.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://jankalyaan-backend.onrender.com/api/auth/login", loginData);
      localStorage.setItem("token", JSON.stringify(res.data.user));

      setUser(res.data.user); // ✅ set context after login success

      alert("✅ Login successful!");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";

      if (message === "User not found") {
        alert("❌ No account found with this email. Please sign up first.");
        navigate("/signup");
      } else if (message === "Invalid credentials") {
        alert("❌ Incorrect password. Please try again.");
      } else {
        alert("❌ " + message);
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-60"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white shadow-2xl rounded-2xl flex max-w-4xl w-full overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-blue-600 text-white p-10 hidden md:flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4 pb-10">JanKalyaan</h2>
          <p className="text-3xl font-serif">Welcome to a smarter way of accessing your benefits.</p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Login</h3>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center space-x-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded-full">Google</button>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-full">Facebook</button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-full">LinkedIn</button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
