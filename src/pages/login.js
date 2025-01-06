import Link from "next/link";
import React, { useState } from "react";
import { baseUrl } from "../components/utils/baseUrl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for fields
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    const response = await fetch(baseUrl + "api/userlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await response.json();
    console.log("json", json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("useremail", email);
      localStorage.setItem("isAdmin", await JSON.parse(json.isAdmin));
      console.log("json?.isAdmin", json.isAdmin);
      router.push("/");
      toast.success("Login successfully");
    } else {
      toast.error("please try again!!");
    }
    setError("");
    setEmail("");
    setPassword("");
    // // Simulate a login (Replace with actual login logic)
    // console.log("Logging in with:", { email, password });
    // alert("Login Successful!"); // Placeholder
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-col items-center justify-between space-y-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>

          <Link href="/signin">
            <button className="w-full bg-gray-100 text-blue-500 py-2 px-6 rounded-md border border-blue-500 shadow-lg hover:bg-blue-500 hover:text-white transition-all mt-2">
              New User
            </button>
          </Link>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
